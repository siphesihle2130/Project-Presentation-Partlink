// PaymentMethodsPage.tsx
import "./PaymentMethodsPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCreditCard,
  FaCcVisa,
  FaCcMastercard,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";

type CardBrand = "Visa" | "Mastercard" | "Card";

type PaymentCard = {
  id: number;
  brand: CardBrand;
  holderName: string;
  last4: string;
  expiry: string; // MM/YY
  isDefault: boolean;
};

// Very rough brand detection from the first digit - good enough for a mock/demo flow
function detectBrand(cardNumber: string): CardBrand {
  const firstDigit = cardNumber.trim().charAt(0);
  if (firstDigit === "4") return "Visa";
  if (firstDigit === "5") return "Mastercard";
  return "Card";
}

function brandIcon(brand: CardBrand) {
  if (brand === "Visa") return <FaCcVisa />;
  if (brand === "Mastercard") return <FaCcMastercard />;
  return <FaCreditCard />;
}

const INITIAL_CARDS: PaymentCard[] = [
  {
    id: 1,
    brand: "Visa",
    holderName: "Inacio Miguel",
    last4: "4242",
    expiry: "09/28",
    isDefault: true,
  },
  {
    id: 2,
    brand: "Mastercard",
    holderName: "Inacio Miguel",
    last4: "8831",
    expiry: "03/27",
    isDefault: false,
  },
];

function PaymentMethodsPage() {
  const navigate = useNavigate();

  const [cards, setCards] = useState<PaymentCard[]>(INITIAL_CARDS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PaymentCard | null>(null);

  const [form, setForm] = useState({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [formError, setFormError] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ holderName: "", cardNumber: "", expiry: "", cvv: "" });
    setFormError("");
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleSaveCard = () => {
    const digitsOnly = form.cardNumber.replace(/\D/g, "");

    if (
      form.holderName.trim() === "" ||
      digitsOnly.length < 12 ||
      form.expiry.trim() === "" ||
      form.cvv.trim().length < 3
    ) {
      setFormError("Please fill in all fields correctly.");
      return;
    }

    const newCard: PaymentCard = {
      id: Date.now(),
      brand: detectBrand(digitsOnly),
      holderName: form.holderName.trim(),
      last4: digitsOnly.slice(-4),
      expiry: form.expiry.trim(),
      isDefault: cards.length === 0,
    };

    setCards((prev) => [...prev, newCard]);
    setShowAddModal(false);
    resetForm();
  };

  const handleSetDefault = (id: number) => {
    setCards((prev) =>
      prev.map((card) => ({ ...card, isDefault: card.id === id }))
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    setCards((prev) => {
      const remaining = prev.filter((card) => card.id !== deleteTarget.id);

      // If we deleted the default card, promote the next one automatically
      if (deleteTarget.isDefault && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }

      return remaining;
    });

    setDeleteTarget(null);
  };

  return (
    <div className="PaymentMethodsContainer">
      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="PaymentMethodsMainContent">
        {/* Header */}
        <header className="PaymentMethodsTopHeader">
          <div className="PaymentMethodsPageTitle">
            <FaArrowLeft className="PaymentMethodsBackBtn" onClick={() => navigate("/profile")} />
            <h1>Payment Methods</h1>
          </div>
          <div className="PaymentMethodsHeaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="PaymentMethodsProfilePic" />
          </div>
        </header>

        {/* Card List */}
        {cards.length === 0 ? (
          <div className="PaymentMethodsEmptyState">
            <FaCreditCard className="PaymentMethodsEmptyIcon" />
            <h2>No payment methods yet</h2>
            <p>Add a card to make checkout faster next time.</p>
          </div>
        ) : (
          <div className="PaymentMethodsList">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`PaymentMethodsCard ${card.isDefault ? "PaymentMethodsDefaultCard" : ""}`}
              >
                <div className="PaymentMethodsCardIcon">{brandIcon(card.brand)}</div>

                <div className="PaymentMethodsCardInfo">
                  <div className="PaymentMethodsCardBrandRow">
                    <span className="PaymentMethodsCardBrand">{card.brand}</span>
                    {card.isDefault && (
                      <span className="PaymentMethodsDefaultBadge">Default</span>
                    )}
                  </div>
                  <p className="PaymentMethodsCardNumber">•••• •••• •••• {card.last4}</p>
                  <p className="PaymentMethodsCardExpiry">
                    {card.holderName} · Expires {card.expiry}
                  </p>
                </div>

                <div className="PaymentMethodsCardActions">
                  {!card.isDefault && (
                    <button
                      className="PaymentMethodsSetDefaultBtn"
                      onClick={() => handleSetDefault(card.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <FaTrash
                    className="PaymentMethodsDeleteIcon"
                    title="Remove card"
                    onClick={() => setDeleteTarget(card)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Card Button */}
        <button className="PaymentMethodsBtnAdd" onClick={handleOpenAddModal}>
          <FaPlus /> Add Payment Method
        </button>
      </main>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="PaymentMethodsModalOverlay">
          <div className="PaymentMethodsModal">
            <h2>Add Payment Method</h2>

            <div className="PaymentMethodsFormFields">
              <div className="PaymentMethodsFormGroup fullWidth">
                <label htmlFor="holderName">Name on Card *</label>
                <input
                  type="text"
                  id="holderName"
                  name="holderName"
                  value={form.holderName}
                  onChange={handleFormChange}
                  placeholder="Enter name as it appears on card"
                />
              </div>

              <div className="PaymentMethodsFormGroup fullWidth">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleFormChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="PaymentMethodsFormRow">
                <div className="PaymentMethodsFormGroup">
                  <label htmlFor="expiry">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleFormChange}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>

                <div className="PaymentMethodsFormGroup">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleFormChange}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              {formError && <p className="PaymentMethodsFieldError">{formError}</p>}
            </div>

            <div className="PaymentMethodsModalActions">
              <button className="PaymentMethodsBtnCancel" onClick={handleCloseAddModal}>
                Cancel
              </button>
              <button className="PaymentMethodsBtnSave" onClick={handleSaveCard}>
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="PaymentMethodsModalOverlay">
          <div className="PaymentMethodsModal PaymentMethodsDeleteModal">
            <h2>Remove Card</h2>
            <p>
              Are you sure you want to remove the {deleteTarget.brand} card ending in{" "}
              {deleteTarget.last4}? This action cannot be undone.
            </p>
            <div className="PaymentMethodsModalActions">
              <button className="PaymentMethodsBtnCancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="PaymentMethodsBtnDeleteConfirm" onClick={handleConfirmDelete}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethodsPage;
