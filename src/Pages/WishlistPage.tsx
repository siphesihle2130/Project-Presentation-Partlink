import "./WishlistPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaBoxOpen,
  FaShoppingCart,
  FaEye,
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
  city: string;
  province: string;
  price: number | string;
  quantity: number;
  image_url: string;
  is_active: boolean;
  user_id: string | null;
};

type SavedRow = {
  id: string;
  product_id: number;
  created_at: string;
  product: CarPart | null;
};

function WishlistPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [addedMessage, setAddedMessage] = useState<number | null>(null);

  // ─────────────────────────────────────────────
  // Fetch saved items for the current user
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be signed in to view saved items.");
        setSaved([]);
        setLoading(false);
        return;
      }

      // Join SavedItems with CarParts so we get the full product data
      const { data, error: fetchError } = await supabase
        .from("SavedItems")
        .select(
          `
          id,
          product_id,
          created_at,
          product:CarParts (*)
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setSaved([]);
      } else {
        setSaved((data as unknown as SavedRow[]) || []);
      }
      setLoading(false);
    };

    fetchSaved();
  }, []);

  // ─────────────────────────────────────────────
  // Filter by search query (client-side)
  // ─────────────────────────────────────────────
  const filtered = saved.filter((row) => {
    if (!row.product) return false;
    if (!query.trim()) return true;

    const q = query.toLowerCase();
    return (
      row.product.name.toLowerCase().includes(q) ||
      row.product.brand?.toLowerCase().includes(q) ||
      row.product.model?.toLowerCase().includes(q) ||
      row.product.category?.toLowerCase().includes(q)
    );
  });

  // ─────────────────────────────────────────────
  // Unsave a product
  // ─────────────────────────────────────────────
  const handleUnsave = async (productId: number) => {
    setRemovingId(productId);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not signed in.");

      const { error: deleteError } = await supabase
        .from("SavedItems")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (deleteError) throw deleteError;

      setSaved((prev) => prev.filter((row) => row.product_id !== productId));
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to remove saved item."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ─────────────────────────────────────────────
  // Add saved item to cart
  // ─────────────────────────────────────────────
  const handleAddToCart = (product: CarPart) => {
    addToCart(
      {
        id: Number(product.id),
        name: product.name,
        price: String(product.price),
        image_url: product.image_url ?? "",
        maxQuantity: Number(product.quantity),
      },
      1
    );

    setAddedMessage(product.id);
    setTimeout(() => setAddedMessage(null), 2000);
  };

  return (
    <div className="savedItemsContainer">
      <NavigationBar />

      <section className="savedItemsMainSection">
        {/* ── Header ── */}
        <div className="savedItemsHeader">
          <div>
            <h1>Saved Items</h1>
            <p>Products you've bookmarked for later.</p>
          </div>

          {saved.length > 0 && (
            <span className="savedItemsCount">
              {saved.length} {saved.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* ── Search bar ── */}
        {saved.length > 0 && (
          <div className="savedItemsSearchBar">
            <FaSearch className="savedItemsSearchIcon" />
            <input
              type="text"
              placeholder="Search your saved items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        {/* ── Content ── */}
        {loading && (
          <p className="savedItemsStatus">Loading saved items…</p>
        )}

        {!loading && error && (
          <p className="savedItemsStatus savedItemsError">{error}</p>
        )}

        {!loading && !error && saved.length === 0 && (
          <div className="savedItemsEmpty">
            <FaRegHeart size={48} />
            <h2>No saved items yet</h2>
            <p>
              Tap the heart on any product to save it here for later.
            </p>
            <button
              className="savedItemsBrowseBtn"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        )}

        {!loading && !error && saved.length > 0 && filtered.length === 0 && (
          <p className="savedItemsStatus">
            No saved items match "{query}".
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="savedItemsGrid">
            {filtered.map((row) => {
              const product = row.product;
              if (!product) return null;

              const outOfStock = product.quantity <= 0;
              const unavailable = !product.is_active;

              return (
                <div key={row.id} className="savedCard">
                  {/* Image */}
                  <div
                    className="savedCardImageWrap"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="savedCardImage"
                      />
                    ) : (
                      <div className="savedCardNoImage">
                        <FaBoxOpen />
                      </div>
                    )}

                    {/* Unsave heart */}
                    <button
                      className="savedCardHeart"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnsave(product.id);
                      }}
                      disabled={removingId === product.id}
                      aria-label="Remove from saved"
                    >
                      <FaHeart />
                    </button>

                    {(outOfStock || unavailable) && (
                      <span className="savedCardBadge">
                        {outOfStock ? "Out of stock" : "Unavailable"}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="savedCardBody">
                    <h3
                      className="savedCardTitle"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    <p className="savedCardMeta">
                      {product.brand} · {product.model}
                    </p>
                    <p className="savedCardLocation">
                      {product.city}, {product.province}
                    </p>

                    <p className="savedCardPrice">R {product.price}</p>

                    {/* Actions */}
                    <div className="savedCardActions">
                      <button
                        className="savedCardBtn savedCardBtnView"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <FaEye /> View
                      </button>

                      <button
                        className="savedCardBtn savedCardBtnCart"
                        onClick={() => handleAddToCart(product)}
                        disabled={outOfStock || unavailable}
                      >
                        <FaShoppingCart />
                        {outOfStock ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>

                    {addedMessage === product.id && (
                      <div className="savedCardToast">
                        Added to cart
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default WishlistPage;