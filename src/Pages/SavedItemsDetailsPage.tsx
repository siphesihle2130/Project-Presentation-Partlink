import "./SavedItemsDetailsPage.css";
import { useNavigate } from "react-router-dom";

function SavedItemsDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="savedItemsDetailsPage">

      {/* ================= HEADER ================= */}
      <header className="savedItemsDetailsHeader">

        <div className="savedItemsDetailsBrand">

          <img
            src="/logo-icon.png"
            alt="PartLink"
            className="savedItemsDetailsLogoIcon"
          />

          <img
            src="/logo-name.png"
            alt="PartLink"
            className="savedItemsDetailsLogoName"
          />

        </div>

        <button
          className="savedItemsDetailsBackButton"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </header>

      {/* ================= MAIN ================= */}
      <main className="savedItemsDetailsMain">

        {/* Breadcrumb */}
        <div className="savedItemsDetailsBreadcrumb">
          Saved Items / Clutch Kit
        </div>

        {/* ================= ITEM CARD ================= */}
        <section className="savedItemsDetailsCard">

          {/* ================= IMAGE ================= */}
          <div className="savedItemsDetailsImageSection">

            <div className="savedItemsDetailsImageContainer">

              <img
                src="/Clutch kit.png"
                alt="Clutch Kit"
                className="savedItemsDetailsProductImage"
              />

            </div>

          </div>

          {/* ================= INFORMATION ================= */}
          <div className="savedItemsDetailsInformation">

            <span className="savedItemsDetailsSavedLabel">
              ♥ Saved Item
            </span>

            <h1 className="savedItemsDetailsTitle">
              Clutch Kit
            </h1>

            <p className="savedItemsDetailsCondition">
              Used • Good Condition
            </p>

            <div className="savedItemsDetailsPrice">
              R2,850.00
            </div>

            <div className="savedItemsDetailsDivider"></div>

            {/* Description */}
            <h2 className="savedItemsDetailsSectionTitle">
              Item Description
            </h2>

            <p className="savedItemsDetailsDescription">
              Quality clutch kit suitable for selected
              Toyota Corolla models. The part is in good
              working condition and has been inspected
              by the seller.
            </p>

            {/* ================= DETAILS ================= */}
            <div className="savedItemsDetailsInfoGrid">

              <div className="savedItemsDetailsInfoItem">
                <span>Category</span>
                <strong>Engine Parts</strong>
              </div>

              <div className="savedItemsDetailsInfoItem">
                <span>Condition</span>
                <strong>Used</strong>
              </div>

              <div className="savedItemsDetailsInfoItem">
                <span>Location</span>
                <strong>Johannesburg</strong>
              </div>

              <div className="savedItemsDetailsInfoItem">
                <span>Seller</span>
                <strong>Auto Parts SA</strong>
              </div>

            </div>

            {/* ================= ACTIONS ================= */}
            <div className="savedItemsDetailsActions">

              <button
                className="savedItemsDetailsPurchaseButton"
                onClick={() => navigate("/checkout")}
              >
                Buy Now
              </button>

              <button
                className="savedItemsDetailsRemoveButton"
                onClick={() =>
                  alert("Item removed from saved items")
                }
              >
                Remove from Saved
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SavedItemsDetailsPage;