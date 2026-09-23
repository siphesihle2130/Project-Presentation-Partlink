// ProductDetailsPage.tsx
import "./ProductDetailsPage.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCartPlus, FaBolt, FaCheckCircle } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import { useCart } from "../Context/CartContext";

function ProductDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const productData = location.state || {};

  const product = {
    id: productData.id || 0,
    name: productData.name || "Item",
    vehicle: productData.vehicle || "",
    price: productData.price || "R0",
    image: productData.image || "/placeholder.png",
    category: productData.category || "",
    condition: productData.condition || "",
    year: productData.year || "",
    description: productData.description || "No description provided.",
  };

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const increaseQuantity = () => setQuantity((q) => Math.min(q + 1, 10));
  const decreaseQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        vehicle: product.vehicle,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        id: product.id,
        name: product.name,
        vehicle: product.vehicle,
        price: product.price,
        image: product.image,
        quantity,
      },
    });
  };

  return (
    <div className="ProductDetailsContainer">

      <NavigationBar />

      {/* Main Content */}
      <main className="ProductDetailsMainContent">
        {/* Header */}
        <header className="ProductDetailsTopHeader">
          <div className="ProductDetailsPageTitle">
            <FaArrowLeft className="ProductDetailsBackBtn" onClick={() => navigate(-1)} />
            <h1>Product Details</h1>
          </div>
          <div className="ProductDetailsHeaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="ProductDetailsProfilePic" />
          </div>
        </header>

        <div className="ProductDetailsCard">
          <div className="ProductDetailsLayout">
            {/* Image */}
            <div className="ProductDetailsImageWrapper">
              <img src={product.image} alt={product.name} className="ProductDetailsImage" />
            </div>

            {/* Info */}
            <div className="ProductDetailsInfo">
              {product.category && (
                <span className="ProductDetailsCategoryBadge">{product.category}</span>
              )}

              <h2 className="ProductDetailsName">{product.name}</h2>
              {product.vehicle && (
                <p className="ProductDetailsVehicle">Fits: {product.vehicle}</p>
              )}

              <p className="ProductDetailsPrice">{product.price}</p>

              <div className="ProductDetailsMeta">
                {product.condition && (
                  <div className="ProductDetailsMetaItem">
                    <span className="ProductDetailsMetaLabel">Condition</span>
                    <span className="ProductDetailsMetaValue">{product.condition}</span>
                  </div>
                )}
                {product.year && (
                  <div className="ProductDetailsMetaItem">
                    <span className="ProductDetailsMetaLabel">Year</span>
                    <span className="ProductDetailsMetaValue">{product.year}</span>
                  </div>
                )}
              </div>

              <div className="ProductDetailsDescriptionBlock">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Quantity */}
              <div className="ProductDetailsQuantityRow">
                <span className="ProductDetailsQuantityLabel">Quantity</span>
                <div className="ProductDetailsQuantityStepper">
                  <button type="button" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    −
                  </button>
                  <span className="ProductDetailsQuantityValue">{quantity}</span>
                  <button type="button" onClick={increaseQuantity} disabled={quantity >= 10}>
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="ProductDetailsActions">
                <button className="ProductDetailsBtnAddToCart" onClick={handleAddToCart}>
                  <FaCartPlus /> Add to Cart
                </button>
                <button className="ProductDetailsBtnBuyNow" onClick={handleBuyNow}>
                  <FaBolt /> Buy Now
                </button>
              </div>

              {addedMessage && (
                <p className="ProductDetailsAddedMessage">
                  <FaCheckCircle /> Added to cart
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailsPage;
