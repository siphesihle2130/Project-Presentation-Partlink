import "./ProductDetailsPage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapPin,
  FaTag,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaCheck,
  FaBoxOpen,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../Context/CartContext";

type CarPart = {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  category: string;
  condition: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  price: number | string;
  quantity: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  user_id: string | null;
};

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<CarPart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // ─────────────────────────────────────────────
  // Fetch product + check saved + check owner
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      // 1. Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? null);

      // 2. Fetch the product
      const { data, error: fetchError } = await supabase
        .from("CarParts")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      const fetched = data as CarPart;
      setProduct(fetched);

      // 3. Is the current user the owner?
      if (user && fetched.user_id === user.id) {
        setIsOwner(true);
      }

      // 4. Is it already saved?
      if (user) {
        const { data: savedRow } = await supabase
          .from("SavedItems")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_id", fetched.id)
          .maybeSingle();

        setSaved(!!savedRow);
      }

      setLoading(false);
    };

    fetchAll();
  }, [id]);

  const handleBack = () => navigate(-1);

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  // ─────────────────────────────────────────────
  // Toggle save / unsave
  // ─────────────────────────────────────────────
  const handleToggleSave = async () => {
    if (!product) return;

    if (!currentUserId) {
      alert("Please sign in to save items.");
      return;
    }

    try {
      if (saved) {
        // Remove
        const { error: deleteError } = await supabase
          .from("SavedItems")
          .delete()
          .eq("user_id", currentUserId)
          .eq("product_id", product.id);

        if (deleteError) throw deleteError;
        setSaved(false);
      } else {
        // Add
        const { error: insertError } = await supabase
          .from("SavedItems")
          .insert({
            user_id: currentUserId,
            product_id: product.id,
          });

        if (insertError) throw insertError;
        setSaved(true);
      }
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to update saved items."
      );
    }
  };

  // ─────────────────────────────────────────────
  // Quantity controls
  // ─────────────────────────────────────────────
  const increaseQty = () => {
    if (!product) return;
    if (quantity < product.quantity) setQuantity((q) => q + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleQtyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!product) return;
    if (isNaN(val)) return setQuantity(1);
    setQuantity(Math.max(1, Math.min(val, product.quantity)));
  };

  // ─────────────────────────────────────────────
  // Add to cart
  // ─────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!product || isOwner) return;

    addToCart(
      {
        id: Number(product.id),
        name: product.name,
        price: String(product.price),
        image_url: product.image_url ?? "",
        maxQuantity: Number(product.quantity),
      },
      quantity
    );

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  // ─────────────────────────────────────────────
  // Render states
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="productDetailContainer">
        <NavigationBar />
        <section className="productDetailMain">
          <p className="productDetailStatus">Loading product…</p>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="productDetailContainer">
        <NavigationBar />
        <section className="productDetailMain">
          <div className="productDetailError">
            <FaBoxOpen size={48} />
            <h2>Product not found</h2>
            <p>{error || "This listing may have been removed."}</p>
            <button className="productDetailBackBtn" onClick={handleBack}>
              <FaArrowLeft /> Go Back
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const outOfStock = product.quantity <= 0;

  return (
    <div className="productDetailContainer">
      <NavigationBar />

      <section className="productDetailMain">
        <button className="productDetailBackBtn" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>

        <div className="productDetailGrid">
          <div className="productDetailImageCol">
            <div className="productDetailImage">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} />
              ) : (
                <div className="productDetailNoImage">No image available</div>
              )}
            </div>
          </div>

          <div className="productDetailInfoCol">
            <div className="productDetailHeader">
              <h1>{product.name}</h1>
              <div className="productDetailActions">
                <button
                  className={`productDetailIconBtn ${saved ? "saved" : ""}`}
                  onClick={handleToggleSave}
                  aria-label="Save"
                >
                  {saved ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button
                  className="productDetailIconBtn"
                  onClick={handleShare}
                  aria-label="Share"
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>

            <p className="productDetailPrice">R {product.price}</p>

            <div className="productDetailBadges">
              <span className="productBadge">{product.brand}</span>
              <span className="productBadge">{product.model}</span>
              <span className="productBadge">{product.category}</span>
              <span className="productBadge productBadgeCondition">
                {product.condition}
              </span>
            </div>

            <div className="productDetailSection">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="productDetailSection">
              <h3>Details</h3>
              <div className="productDetailMetaList">
                <div className="productDetailMetaRow">
                  <FaTag className="productDetailMetaIcon" />
                  <span>Quantity available</span>
                  <strong>{product.quantity}</strong>
                </div>
                <div className="productDetailMetaRow">
                  <FaMapPin className="productDetailMetaIcon" />
                  <span>Location</span>
                  <strong>
                    {product.city}, {product.province} {product.postal_code}
                  </strong>
                </div>
                <div className="productDetailMetaRow">
                  <FaCheck className="productDetailMetaIcon" />
                  <span>Status</span>
                  <strong>
                    {outOfStock
                      ? "Out of stock"
                      : product.is_active
                      ? "Available"
                      : "Unavailable"}
                  </strong>
                </div>
              </div>
            </div>

            {/* ── Owner view: Edit button ── */}
            {isOwner ? (
              <div className="productDetailOwnerNotice">
                <p>This is your listing. You can edit it from My Listings.</p>
                <button
                  className="productDetailEditBtn"
                  onClick={() =>
                    navigate(`/edit-listing/${product.id}`, {
                      state: product,
                    })
                  }
                >
                  <FaEdit /> Edit Listing
                </button>
              </div>
            ) : (
              /* ── Buyer view: Quantity + Add to Cart ── */
              <div className="productDetailCartRow">
                <div className="productDetailQtyBox">
                  <button
                    className="qtyBtn"
                    onClick={decreaseQty}
                    disabled={quantity <= 1 || outOfStock}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="qtyInput"
                    value={quantity}
                    onChange={handleQtyInput}
                    min={1}
                    max={product.quantity}
                    disabled={outOfStock}
                  />
                  <button
                    className="qtyBtn"
                    onClick={increaseQty}
                    disabled={quantity >= product.quantity || outOfStock}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  className="productDetailAddCartBtn"
                  onClick={handleAddToCart}
                  disabled={outOfStock}
                >
                  <FaShoppingCart />
                  {outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            )}

            {addedMessage && (
              <div className="productDetailToast">
                <FaCheck /> Added {quantity} to cart
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetailsPage;