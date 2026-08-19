import "./MyPurchasesPage.css";
import { useNavigate } from "react-router-dom";

function MyPurchasesPage() {
  const navigate = useNavigate();

  return (
    <div className="myPurchasesPage">

      {/* Header */}
      <header className="myPurchasesHeader">
        <div className="myPurchasesBrand">

          <img
            src="/logo-icon.png"
            alt="PartLink"
            className="myPurchasesLogoIcon"
          />

          <img
            src="/logo-name.png"
            alt="PartLink"
            className="myPurchasesLogoName"
          />

        </div>

        <button
          className="myPurchasesBackButton"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </header>

      {/* Main Content */}
      <main className="myPurchasesMain">

        {/* Page Heading */}
        <div className="myPurchasesHeading">

          <p className="myPurchasesSmallTitle">
            PARTLINK
          </p>

          <h1 className="myPurchasesTitle">
            My Purchases
          </h1>

          <p className="myPurchasesSubtitle">
            View and manage the car parts you have purchased.
          </p>

        </div>

        {/* Tabs */}
        <div className="myPurchasesTabs">

          <button className="myPurchasesActiveTab">
            All Purchases
          </button>

          <button className="myPurchasesTab">
            In Progress
          </button>

          <button className="myPurchasesTab">
            Delivered
          </button>

        </div>

        {/* Purchases */}
        <section className="myPurchasesList">

          {/* ================= PURCHASE 1 ================= */}
          <div className="myPurchasesCard">

            <div className="myPurchasesImage">
              <img
                src="/Clutch kit.png"
                alt="Clutch kit"
              />
            </div>

            <div className="myPurchasesInformation">

              <div className="myPurchasesTopRow">

                <span className="myPurchasesOrderNumber">
                  Order #PL-10452
                </span>

                <span className="myPurchasesDeliveredStatus">
                  Delivered
                </span>

              </div>

              <h2 className="myPurchasesPartName">
                Clutch Kit
              </h2>

              <p className="myPurchasesSeller">
                Seller: Auto Parts SA
              </p>

              <p className="myPurchasesDate">
                Purchased: 15 August 2026
              </p>

              <div className="myPurchasesBottomRow">

                <strong className="myPurchasesPrice">
                  R2,850.00
                </strong>

                <button
                  className="myPurchasesDetailsButton"
                  onClick={() => navigate("/checkout")}
                >
                  View Purchase
                </button>

              </div>

            </div>
          </div>

          {/* ================= PURCHASE 2 ================= */}
          <div className="myPurchasesCard">

            <div className="myPurchasesImage">
              <img
                src="/Air-intake-horse.png"
                alt="Air intake hose"
              />
            </div>

            <div className="myPurchasesInformation">

              <div className="myPurchasesTopRow">

                <span className="myPurchasesOrderNumber">
                  Order #PL-10431
                </span>

                <span className="myPurchasesProgressStatus">
                  In Progress
                </span>

              </div>

              <h2 className="myPurchasesPartName">
                Air Intake Hose
              </h2>

              <p className="myPurchasesSeller">
                Seller: Premium Auto Spares
              </p>

              <p className="myPurchasesDate">
                Purchased: 17 August 2026
              </p>

              <div className="myPurchasesBottomRow">

                <strong className="myPurchasesPrice">
                  R1,250.00
                </strong>

                <button
                  className="myPurchasesDetailsButton"
                  onClick={() => navigate("/checkout")}
                >
                  View Purchase
                </button>

              </div>

            </div>
          </div>

          {/* ================= PURCHASE 3 ================= */}
          <div className="myPurchasesCard">

            <div className="myPurchasesImage">
              <img
                src="/side-mirror.png"
                alt="Side mirror"
              />
            </div>

            <div className="myPurchasesInformation">

              <div className="myPurchasesTopRow">

                <span className="myPurchasesOrderNumber">
                  Order #PL-10398
                </span>

                <span className="myPurchasesDeliveredStatus">
                  Delivered
                </span>

              </div>

              <h2 className="myPurchasesPartName">
                Side Mirror
              </h2>

              <p className="myPurchasesSeller">
                Seller: Car Parts Direct
              </p>

              <p className="myPurchasesDate">
                Purchased: 10 August 2026
              </p>

              <div className="myPurchasesBottomRow">

                <strong className="myPurchasesPrice">
                  R1,800.00
                </strong>

                <button
                  className="myPurchasesDetailsButton"
                  onClick={() => navigate("/checkout")}
                >
                  View Purchase
                </button>

              </div>

            </div>
          </div>

          {/* ================= PURCHASE 4 ================= */}
          <div className="myPurchasesCard">

            <div className="myPurchasesImage">
              <img
                src="/Outer-tie-rod.png"
                alt="Outer tie rod"
              />
            </div>

            <div className="myPurchasesInformation">

              <div className="myPurchasesTopRow">

                <span className="myPurchasesOrderNumber">
                  Order #PL-10375
                </span>

                <span className="myPurchasesDeliveredStatus">
                  Delivered
                </span>

              </div>

              <h2 className="myPurchasesPartName">
                Outer Tie Rod
              </h2>

              <p className="myPurchasesSeller">
                Seller: Auto Parts SA
              </p>

              <p className="myPurchasesDate">
                Purchased: 8 August 2026
              </p>

              <div className="myPurchasesBottomRow">

                <strong className="myPurchasesPrice">
                  R950.00
                </strong>

                <button
                  className="myPurchasesDetailsButton"
                  onClick={() => navigate("/checkout")}
                >
                  View Purchase
                </button>

              </div>

            </div>
          </div>

        </section>

      </main>
    </div>
  );
}

export default MyPurchasesPage;