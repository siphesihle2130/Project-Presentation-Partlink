// CartPage.tsx
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaShoppingCart } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import { useCart } from "../Context/CartContext";
import { parsePrice, formatCurrency } from "../utils/currency";

function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  const deliveryFee = items.length > 0 ? 99 : 0;
  const total = cartTotal + deliveryFee;

  const handleCheckout = () => {
    navigate("/checkout", { state: { items } });
  };

  return (
    <div className="CartContainer">
      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="CartMainContent">
        {/* Header */}
        <header className="CartTopHeader">
          <div className="CartPageTitle">
            <FaArrowLeft className="CartBackBtn" onClick={() => navigate(-1)} />
            <h1>My Cart</h1>
          </div>
          <div className="CartHeaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="CartProfilePic" />
          </div>
        </header>

        {items.length === 0 ? (
          <div className="CartEmptyState">
            <FaShoppingCart className="CartEmptyIcon" />
            <h2>Your cart is empty</h2>
            <p>Browse listings and add parts to your cart.</p>
            <button className="CartBtnBrowse" onClick={() => navigate("/home")}>
              Browse Listings
            </button>
          </div>
        ) : (
          <div className="CartLayout">
            {/* Item List */}
            <div className="CartCard">
              <h2 className="CartSectionTitle">Items ({items.length})</h2>

              {items.map((item) => (
                <div className="CartItemRow" key={item.id}>
                  <img src={item.image} alt={item.name} className="CartItemImage" />

                  <div className="CartItemInfo">
                    <p className="CartItemName">{item.name}</p>
                    {item.vehicle && (
                      <p className="CartItemVehicle">Vehicle: {item.vehicle}</p>
                    )}
                    <p className="CartItemUnitPrice">
                      {formatCurrency(parsePrice(item.price))} each
                    </p>
                  </div>

                  <div className="CartQuantityStepper">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="CartQuantityValue">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                    >
                      +
                    </button>
                  </div>

                  <p className="CartItemLineTotal">
                    {formatCurrency(parsePrice(item.price) * item.quantity)}
                  </p>

                  <FaTrash
                    className="CartRemoveBtn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  />
                </div>
              ))}
            </div>

            {/* Totals Sidebar */}
            <div className="CartSummarySidebar">
              <div className="CartCard">
                <h2 className="CartSectionTitle">Order Total</h2>

                <div className="CartTotalsRow">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="CartTotalsRow">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="CartTotalsRow CartGrandTotal">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <button className="CartBtnCheckout" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;
