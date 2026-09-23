// CheckoutPage.tsx
import "./CheckoutPage.css";
import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaUniversity } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import { useCart } from "../Context/CartContext";
import type { CartItem } from "../Context/CartContext";
import { parsePrice, formatCurrency } from "../utils/currency";

type PaymentMethod = "card" | "eft" | "cod";

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const state = location.state || {};

  // Supports two entry points:
  // 1. From the Cart page: { items: CartItem[] }
  // 2. "Buy Now" from a listing/request page: single item fields directly in state
  const [orderItems, setOrderItems] = useState<CartItem[]>(() => {
    if (Array.isArray(state.items) && state.items.length > 0) {
      return state.items;
    }

    if (state.id || state.name) {
      return [
        {
          id: state.id || 0,
          name: state.name || "Item",
          vehicle: state.vehicle || "",
          price: state.price || "R0",
          image: state.image || "/placeholder.png",
          quantity: state.quantity || 1,
        },
      ];
    }

    return [];
  });

  const [delivery, setDelivery] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const [payment, setPayment] = useState({
    method: "card" as PaymentMethod,
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
    [orderItems]
  );
  const deliveryFee = subtotal > 0 ? 99 : 0;
  const total = subtotal + deliveryFee;

  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDelivery((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (method: PaymentMethod) => {
    setPayment((prev) => ({ ...prev, method }));
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, 10)) } : item
      )
    );
  };

  const isFormValid = useMemo(() => {
    if (orderItems.length === 0) return false;

    const deliveryValid =
      delivery.fullName.trim() !== "" &&
      delivery.phone.trim() !== "" &&
      delivery.address.trim() !== "" &&
      delivery.city.trim() !== "" &&
      delivery.postalCode.trim() !== "";

    if (!deliveryValid) return false;

    if (payment.method === "card") {
      return (
        payment.cardName.trim() !== "" &&
        payment.cardNumber.trim() !== "" &&
        payment.expiry.trim() !== "" &&
        payment.cvv.trim() !== ""
      );
    }

    return true;
  }, [orderItems, delivery, payment]);

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel checkout?")) {
      navigate(-1);
    }
  };

  const handlePlaceOrder = () => {
    if (!isFormValid) return;

    setIsPlacingOrder(true);

    // Here you would typically make an API call to submit the order
    console.log("Placing order:", { orderItems, delivery, payment, total });

    setTimeout(() => {
      setIsPlacingOrder(false);
      setShowConfirmation(true);
      clearCart(); // empty the global cart now that the order has gone through
    }, 600);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/home");
  };

  return (
    <div className="CheckoutContainer">

      <NavigationBar />

      {/* Main Content */}
      <main className="CheckoutMainContent">
        {/* Header */}
        <header className="CheckoutTopHeader">
          <div className="CheckoutPageTitle">
            <FaArrowLeft className="CheckoutBackBtn" onClick={handleCancel} />
            <h1>Checkout</h1>
          </div>
          <div className="CheckoutHeaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="CheckoutProfilePic" />
          </div>
        </header>

        {orderItems.length === 0 ? (
          <div className="CheckoutCard">
            <h2 className="CheckoutSectionTitle">No items to check out</h2>
            <p style={{ color: "#555", textAlign: "left" }}>
              Your cart is empty. Add items to your cart before checking out.
            </p>
            <div className="CheckoutActionButtons" style={{ marginTop: "20px" }}>
              <button className="CheckoutBtnPlaceOrder" onClick={() => navigate("/cart")}>
                Go to Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="CheckoutLayout">
            {/* Left column: order + delivery + payment */}
            <div>
              {/* Order Summary */}
              <div className="CheckoutCard">
                <h2 className="CheckoutSectionTitle">Order Summary</h2>

                {orderItems.map((item) => (
                  <div key={item.id}>
                    <div className="CheckoutItemRow">
                      <img src={item.image} alt={item.name} className="CheckoutItemImage" />
                      <div>
                        <p className="CheckoutItemName">{item.name}</p>
                        {item.vehicle && (
                          <p className="CheckoutItemVehicle">Vehicle: {item.vehicle}</p>
                        )}
                      </div>
                      <p className="CheckoutItemPrice">
                        {formatCurrency(parsePrice(item.price) * item.quantity)}
                      </p>
                    </div>

                    <div className="CheckoutQuantityRow">
                      <span className="CheckoutQuantityLabel">Quantity</span>
                      <div className="CheckoutQuantityStepper">
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="CheckoutQuantityValue">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details */}
              <div className="CheckoutCard">
                <h2 className="CheckoutSectionTitle">Delivery Details</h2>

                <div className="CheckoutFormFields">
                  <div className="CheckoutFormRow">
                    <div className="CheckoutFormGroup">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={delivery.fullName}
                        onChange={handleDeliveryChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="CheckoutFormGroup">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={delivery.phone}
                        onChange={handleDeliveryChange}
                        placeholder="e.g., +27 738 828 828"
                        required
                      />
                    </div>
                  </div>

                  <div className="CheckoutFormGroup fullWidth">
                    <label htmlFor="address">Delivery Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={delivery.address}
                      onChange={handleDeliveryChange}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="CheckoutFormRow">
                    <div className="CheckoutFormGroup">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={delivery.city}
                        onChange={handleDeliveryChange}
                        placeholder="e.g., Cape Town"
                        required
                      />
                    </div>

                    <div className="CheckoutFormGroup">
                      <label htmlFor="postalCode">Postal Code *</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={delivery.postalCode}
                        onChange={handleDeliveryChange}
                        placeholder="e.g., 7806"
                        required
                      />
                    </div>
                  </div>

                  <div className="CheckoutFormGroup fullWidth">
                    <label htmlFor="notes">Delivery Notes (optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={delivery.notes}
                      onChange={handleDeliveryChange}
                      placeholder="Gate code, landmark, preferred time, etc."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="CheckoutCard">
                <h2 className="CheckoutSectionTitle">Payment Details</h2>

                <div className="CheckoutPaymentMethods">
                  <button
                    type="button"
                    className={`CheckoutPaymentMethodBtn ${payment.method === "card" ? "CheckoutActiveMethod" : ""}`}
                    onClick={() => handleMethodChange("card")}
                  >
                    <FaCreditCard /> Card
                  </button>
                  <button
                    type="button"
                    className={`CheckoutPaymentMethodBtn ${payment.method === "eft" ? "CheckoutActiveMethod" : ""}`}
                    onClick={() => handleMethodChange("eft")}
                  >
                    <FaUniversity /> EFT
                  </button>
                  <button
                    type="button"
                    className={`CheckoutPaymentMethodBtn ${payment.method === "cod" ? "CheckoutActiveMethod" : ""}`}
                    onClick={() => handleMethodChange("cod")}
                  >
                    <FaMoneyBillWave /> Cash on Collection
                  </button>
                </div>

                {payment.method === "card" && (
                  <div className="CheckoutFormFields">
                    <div className="CheckoutFormGroup fullWidth">
                      <label htmlFor="cardName">Name on Card *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={payment.cardName}
                        onChange={handlePaymentChange}
                        placeholder="Enter name as it appears on card"
                        required
                      />
                    </div>

                    <div className="CheckoutFormGroup fullWidth">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={payment.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="CheckoutFormRow">
                      <div className="CheckoutFormGroup">
                        <label htmlFor="expiry">Expiry Date *</label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={payment.expiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>

                      <div className="CheckoutFormGroup">
                        <label htmlFor="cvv">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={payment.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payment.method === "eft" && (
                  <p style={{ color: "#555", textAlign: "left", fontSize: "14px" }}>
                    Bank details will be sent to your email once you place the order.
                  </p>
                )}

                {payment.method === "cod" && (
                  <p style={{ color: "#555", textAlign: "left", fontSize: "14px" }}>
                    Pay in cash when you collect the item from the seller.
                  </p>
                )}
              </div>
            </div>

            {/* Right column: sticky totals summary */}
            <div className="CheckoutSummarySidebar">
              <div className="CheckoutCard">
                <h2 className="CheckoutSectionTitle">Total</h2>

                <div className="CheckoutTotalsRow">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="CheckoutTotalsRow">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="CheckoutTotalsRow CheckoutGrandTotal">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="CheckoutActionButtons">
                  <button
                    className="CheckoutBtnPlaceOrder"
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid || isPlacingOrder}
                  >
                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                  </button>
                </div>

                <div className="CheckoutActionButtons">
                  <button className="CheckoutBtnCancel" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <div className="CheckoutModalOverlay">
          <div className="CheckoutModal">
            <FaCheckCircle className="CheckoutModalIcon" />
            <h2>Order Placed!</h2>
            <p>
              Your order has been placed successfully. You'll receive a confirmation
              once the seller accepts it.
            </p>
            <button className="CheckoutBtnPlaceOrder" onClick={handleConfirmationClose}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
