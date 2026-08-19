import "./RequestsPage.css";
import { useNavigate } from "react-router-dom";

function RequestsPage() {
  const navigate = useNavigate();

  return (
    <div className="requestsPage">

      {/* ================= HEADER ================= */}
      <header className="requestsHeader">

        <div className="requestsBrand">

          <img
            src="/logo-icon.png"
            alt="PartLink"
            className="requestsLogoIcon"
          />

          <img
            src="/logo-name.png"
            alt="PartLink"
            className="requestsLogoName"
          />

        </div>

        <button
          className="requestsBackButton"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </header>

      {/* ================= MAIN ================= */}
      <main className="requestsMain">

        {/* ================= HEADING ================= */}
        <div className="requestsHeading">

          <div>

            <p className="requestsSmallTitle">
              PARTLINK
            </p>

            <h1 className="requestsTitle">
              My Requests
            </h1>

            <p className="requestsSubtitle">
              Find the car parts you need and manage your requests.
            </p>

          </div>

          <button
            className="requestsCreateButton"
            onClick={() => navigate("/create-request")}
          >
            + Create Request
          </button>

        </div>

        {/* ================= SUMMARY ================= */}
        <section className="requestsSummary">

          <div className="requestsSummaryCard">
            <span className="requestsSummaryNumber">
              3
            </span>

            <span className="requestsSummaryLabel">
              Active Requests
            </span>
          </div>

          <div className="requestsSummaryCard">
            <span className="requestsSummaryNumber">
              5
            </span>

            <span className="requestsSummaryLabel">
              Completed
            </span>
          </div>

          <div className="requestsSummaryCard">
            <span className="requestsSummaryNumber">
              2
            </span>

            <span className="requestsSummaryLabel">
              Responses
            </span>
          </div>

        </section>

        {/* ================= REQUEST OVERVIEW ================= */}
        <section className="requestsContent">

          <h2 className="requestsSectionTitle">
            Request Overview
          </h2>

          <div className="requestsCards">

            {/* ================= REQUEST 1 ================= */}
            <div className="requestsCard">

              <div className="requestsCardImage">
                <img
                  src="/Clutch kit.png"
                  alt="Clutch kit"
                />
              </div>

              <div className="requestsCardTop">

                <span className="requestsCardCategory">
                  Engine Parts
                </span>

                <span className="requestsActiveStatus">
                  Active
                </span>

              </div>

              <h3 className="requestsCardTitle">
                Clutch Kit
              </h3>

              <p className="requestsCardDescription">
                Looking for a good quality clutch kit for a
                Toyota Corolla.
              </p>

              <div className="requestsCardBottom">

                <span className="requestsCardDate">
                  Posted: 18 Aug 2026
                </span>

                <button
                  className="requestsViewButton"
                  onClick={() =>
                    navigate("/active-requests-details", {
                      state: {
                        id: 1,
                        name: "Clutch Kit",
                        vehicle: "Toyota Corolla",
                        budget: "R2,250 - R3,000",
                        responses: 50,
                        image: "/Clutch kit.png",
                        description:
                          "Genuine Toyota clutch kit in excellent condition.",
                        category: "Engine Parts",
                        condition: "Good",
                        year: "2020",
                        date: "18 August 2026",
                      },
                    })
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

            {/* ================= REQUEST 2 ================= */}
            <div className="requestsCard">

              <div className="requestsCardImage">
                <img
                  src="/Air-intake-horse.png"
                  alt="Air intake hose"
                />
              </div>

              <div className="requestsCardTop">

                <span className="requestsCardCategory">
                  Engine Parts
                </span>

                <span className="requestsActiveStatus">
                  Active
                </span>

              </div>

              <h3 className="requestsCardTitle">
                Air Intake Hose
              </h3>

              <p className="requestsCardDescription">
                Need a good quality air intake hose for a
                Corsa B.
              </p>

              <div className="requestsCardBottom">

                <span className="requestsCardDate">
                  Posted: 16 Aug 2026
                </span>

                <button
                  className="requestsViewButton"
                  onClick={() =>
                    navigate("/active-requests-details", {
                      state: {
                        id: 2,
                        name: "Air Intake Hose",
                        vehicle: "Corsa B 1.3",
                        budget: "R5,550 - R6,000",
                        responses: 33,
                        image: "/Air-intake-horse.png",
                        description:
                          "Quality air intake hose in good working condition.",
                        category: "Engine Parts",
                        condition: "Good",
                        year: "2020",
                        date: "16 August 2026",
                      },
                    })
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

            {/* ================= REQUEST 3 ================= */}
            <div className="requestsCard">

              <div className="requestsCardImage">
                <img
                  src="/side-mirror.png"
                  alt="Side mirror"
                />
              </div>

              <div className="requestsCardTop">

                <span className="requestsCardCategory">
                  Exterior Parts
                </span>

                <span className="requestsCompletedStatus">
                  Completed
                </span>

              </div>

              <h3 className="requestsCardTitle">
                Side Mirror
              </h3>

              <p className="requestsCardDescription">
                Request for a good quality side mirror for
                a Hyundai i20.
              </p>

              <div className="requestsCardBottom">

                <span className="requestsCardDate">
                  Completed: 12 Aug 2026
                </span>

                <button
                  className="requestsViewButton"
                  onClick={() =>
                    navigate("/completed-request-details", {
                      state: {
                        id: 3,
                        name: "Side Mirror",
                        vehicle: "Hyundai i20",
                        budget: "R450 - R500",
                        responses: 63,
                        image: "/side-mirror.png",
                        description:
                          "Genuine Hyundai side mirror in good condition.",
                        category: "Exterior Parts",
                        condition: "Good",
                        year: "2020",
                        date: "12 August 2026",
                      },
                    })
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

            {/* ================= REQUEST 4 ================= */}
            <div className="requestsCard">

              <div className="requestsCardImage">
                <img
                  src="/Outer-tie-rod.png"
                  alt="Outer tie rod"
                />
              </div>

              <div className="requestsCardTop">

                <span className="requestsCardCategory">
                  Suspension
                </span>

                <span className="requestsActiveStatus">
                  Active
                </span>

              </div>

              <h3 className="requestsCardTitle">
                Outer Tie Rod
              </h3>

              <p className="requestsCardDescription">
                Looking for an outer tie rod for an
                Audi TT 2023.
              </p>

              <div className="requestsCardBottom">

                <span className="requestsCardDate">
                  Posted: 8 Aug 2026
                </span>

                <button
                  className="requestsViewButton"
                  onClick={() =>
                    navigate("/active-requests-details", {
                      state: {
                        id: 4,
                        name: "Outer Tie Rod",
                        vehicle: "Audi TT 2023",
                        budget: "R700 - R1,000",
                        responses: 104,
                        image: "/Outer-tie-rod.png",
                        description:
                          "Genuine Audi outer tie rod in good condition.",
                        category: "Suspension",
                        condition: "Good",
                        year: "2023",
                        date: "8 August 2026",
                      },
                    })
                  }
                >
                  View Details →
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default RequestsPage;