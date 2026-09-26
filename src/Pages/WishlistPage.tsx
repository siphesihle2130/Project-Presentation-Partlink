import { useState } from "react";
import "./WishlistPage.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

function WishlistPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"listings" | "requests">("listings");

  const savedListings: any[] = [];
  const savedRequests: any[] = [];

  return (
    <div className="wishlistContainer">
      <NavigationBar />

      <section className="wishlistMainCard">

        {/* ================= HEADING ================= */}
        <div className="wishlistHeading">
          <p className="wishlistSmallTitle">PARTLINK</p>
          <h1 className="wishlistTitle">My Wishlist</h1>
          <p className="wishlistSubtitle">
            Listings and requests you've saved for later.
          </p>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="wishlistSummary">
          <div className="wishlistSummaryCard">
            <span className="wishlistSummaryNumber">{savedListings.length}</span>
            <span className="wishlistSummaryLabel">Saved Listings</span>
          </div>

          <div className="wishlistSummaryCard">
            <span className="wishlistSummaryNumber">{savedRequests.length}</span>
            <span className="wishlistSummaryLabel">Saved Requests</span>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="wishlistTabs">
          <button
            className={`wishlistTab ${activeTab === "listings" ? "active" : ""}`}
            onClick={() => setActiveTab("listings")}
          >
            Saved Listings
          </button>
          <button
            className={`wishlistTab ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Saved Requests
          </button>
        </div>

        {/* ================= LISTINGS TAB ================= */}
        {activeTab === "listings" && (
          <div className="wishlistCards">
            {savedListings.length === 0 ? (
              <p className="wishlistEmpty">No saved listings yet.</p>
            ) : (
              savedListings.map((item) => (
                <div className="wishlistCard" key={item.id}>
                  <div className="wishlistCardImage">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="wishlistCardTop">
                    <span className="wishlistCardCategory">{item.category}</span>
                    <span className="wishlistSavedTag">♥ Saved</span>
                  </div>

                  <h3 className="wishlistCardTitle">{item.name}</h3>

                  <p className="wishlistCardDescription">{item.description}</p>

                  <div className="wishlistCardBottom">
                    <span className="wishlistCardPrice">{item.price}</span>

                    <button
                      className="wishlistViewButton"
                      onClick={() =>
                        navigate("/saved-items-details", { state: item })
                      }
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= REQUESTS TAB ================= */}
        {activeTab === "requests" && (
          <div className="wishlistCards">
            {savedRequests.length === 0 ? (
              <p className="wishlistEmpty">No saved requests yet.</p>
            ) : (
              savedRequests.map((item) => (
                <div className="wishlistCard" key={item.id}>
                  <div className="wishlistCardImage">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="wishlistCardTop">
                    <span className="wishlistCardCategory">{item.category}</span>
                    <span className="wishlistActiveStatus">{item.status}</span>
                  </div>

                  <h3 className="wishlistCardTitle">{item.name}</h3>

                  <p className="wishlistCardDescription">{item.description}</p>

                  <div className="wishlistCardBottom">
                    <span className="wishlistCardDate">Budget: {item.budget}</span>

                    <button
                      className="wishlistViewButton"
                      onClick={() =>
                        navigate("/active-requests-details", { state: item })
                      }
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}

export default WishlistPage;