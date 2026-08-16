import "./MyListingPage.css";
import NavigationBar from "../Components/NavigationBar";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";


function MyListingPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
  const navigate = useNavigate();
  const handleTabChange = (tab: "active" | "sold", path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="MyListingscontainer">

      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="MyListingsmainContent">

        {/* Header */}
        <header className="MyListingstopHeader">
          <div className="MyListingspageTitle">
            <h1>My Listings</h1>
          </div>
          <div className="MyListingsheaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="MyListingsprofilePic" />
          </div>
        </header>

        {/* Layout Grid */}
        <div className="MyListingscontentGrid">

          {/*====================== Navigation Bar ======================*/}
          <div className="MyListingstabs-wrapper">
            <div className="MyListingstabs-container">
              <div className="MyListingstabs-underline"></div>
              {/* Active Tab */}
              <button
                className={`MyListingstab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => handleTabChange('active', "/my-listing")}
              >
                Active (12)
              </button>

              {/* Sold Tab */}
              <button
                className={`MyListingstab-btn ${activeTab === 'sold' ? 'active' : ''}`}
                onClick={() => handleTabChange('sold', "/my-sold-listing")}
              >
                Sold (8)
              </button>
            </div>
          </div>
        </div>

        {/* =========================================list============================= */}
        <div className="MyListingslist">
          <div className="MyListingscard1">
            <img src="/alternator.png" alt="Alternator" className="MyListingsalt1" />
            <h4 className="MyListingsname1">Alternator</h4>
            <p className="MyListingsveh1">Vehicle: Toyota Corolla</p>
            <p className="MyListingsprice1">Price: R8, 250</p>
            <FaEye className="MyListingseye1" />
            <p className="MyListingseye1-text">50</p>
            <FaHeart className="MyListingsheart1" />
            <p className="MyListingsheart1-text">10</p>
            <FaCaretRight
              className="MyListingscaret1"
              onClick={() => navigate("/edit-listing", {
                state: {
                  id: 1,
                  name: "Alternator",
                  vehicle: "Toyota Corolla",
                  price: "R8,250",
                  image: "/alternator.png",
                  views: 50,
                  likes: 10,
                  description: "Genuine Toyota alternator in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

          <div className="MyListingscard2">
            <img src="/headlights.png" alt="Headlights" className="MyListingsalt2" />
            <h4 className="MyListingsname2">Headlights</h4>
            <p className="MyListingsveh2">Vehicle: BMW 3 Series</p>
            <p className="MyListingsprice2">Price: R5, 550</p>
            <FaEye className="MyListingseye2" />
            <p className="MyListingseye2-text">33</p>
            <FaHeart className="MyListingsheart2" />
            <p className="MyListingsheart2-text">7</p>
            <FaCaretRight
              className="MyListingscaret1"
              onClick={() => navigate("/edit-listing", {
                state: {
                  id: 2,
                  name: "Headlights",
                  vehicle: "BMW 3 Series",
                  price: "R5,550",
                  image: "/headlights.png",
                  views: 33,
                  likes: 7,
                  description: "Genuine BMW headlights in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

          <div className="MyListingscard3">
            <img src="/side-mirror.png" alt="Side Mirror" className="MyListingsalt3" />
            <h4 className="MyListingsname3">Side Mirror</h4>
            <p className="MyListingsveh3">Vehicle: Hyundai i20</p>
            <p className="MyListingsprice3">Price: R450</p>
            <FaEye className="MyListingseye3" />
            <p className="MyListingseye3-text">63</p>
            <FaHeart className="MyListingsheart3" />
            <p className="MyListingsheart3-text">17</p>
            <FaCaretRight
              className="MyListingscaret1"
              onClick={() => navigate("/edit-listing", {
                state: {
                  id: 3,
                  name: "Side Mirror",
                  vehicle: "Hyundai i20",
                  price: "R450",
                  image: "/side-mirror.png",
                  views: 63,
                  likes: 17,
                  description: "Genuine Hyundai side mirror in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

          <div className="MyListingscard4">
            <img src="/radiator.png" alt="Radiator" className="MyListingsalt4" />
            <h4 className="MyListingsname4">Radiator</h4>
            <p className="MyListingsveh4">Vehicle: VW Polo</p>
            <p className="MyListingsprice4">Price: R700</p>
            <FaEye className="MyListingseye4" />
            <p className="MyListingseye4-text">104</p>
            <FaHeart className="MyListingsheart4" />
            <p className="MyListingsheart4-text">48</p>
            <FaCaretRight
              className="MyListingscaret1"
              onClick={() => navigate("/edit-listing", {
                state: {
                  id: 4,
                  name: "Radiator",
                  vehicle: "VW Polo",
                  price: "R700",
                  image: "/radiator.png",
                  views: 104,
                  likes: 48,
                  description: "Genuine Toyota alternator in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

        </div>

        <button className="MyListingsbtnAdd"
          onClick={() => navigate("/create-listing")}>
          Add New Listing
        </button>

      </main>
    </div>
  );
};

export default MyListingPage;