import "./MyListingSoldPage.css";
import NavigationBar from "../Components/NavigationBar";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";


function MyListingSoldPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
  const navigate = useNavigate();
  const handleTabChange = (tab: "active" | "sold", path: string) => {
  setActiveTab(tab);
  navigate(path);
};

  return (
    <div className="MyListingSoldcontainer">

      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="MyListingSoldmainContent">

        {/* Header */}
        <header className="MyListingSoldtopHeader">
          <div className="MyListingSoldpageTitle">
            <h1>My Listings</h1>
          </div>
          <div className="MyListingSoldheaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="MyListingSoldprofilePic" />
          </div>
        </header>

        {/* Layout Grid */}
        <div className="MyListingSoldcontentGrid">

          {/*====================== Navigation Bar ======================*/}
          <div className="MyListingSoldtabs-wrapper">
            <div className="MyListingSoldtabs-container">
              <div className="MyListingSoldtabs-underline"></div>
              {/* Active Tab */}
              <button
                className={`MyListingSoldtab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => handleTabChange('active', "/my-listing")}
              >
                Active (12)
              </button>

              {/* Sold Tab */}
              <button
                className={`MyListingSoldtab-btn ${activeTab === 'sold' ? 'active' : ''}`}
                onClick={() => handleTabChange('sold', "/my-sold-listing")}
              >
                Sold (8)
              </button>
            </div>
          </div>
        </div>

        {/* =========================================list============================= */}
        <div className="MyListingSoldlist">
          <div className="MyListingSoldcard1">
            <img src="/Idler-arm.png" alt="Idler-arm" className="MyListingSoldalt1" />
            <h4 className="MyListingSoldname1">Idler Arm</h4>
            <p className="MyListingSoldveh1">Vehicle: Mitsubisi Colt 2.4</p>
            <p className="MyListingSoldprice1">Price: R794</p>
            <FaEye className="MyListingSoldeye1" />
            <p className="MyListingSoldeye1-text">47</p>
            <FaHeart className="MyListingSoldheart1" />
            <p className="MyListingSoldheart1-text">14</p>
            <FaCaretRight
              className="MyListingSoldcaret1"
              onClick={() => navigate("/sold-list-details", {
                state: {
                  id: 1,
                  name: "Idler Arm",
                  vehicle: "Mitsubisi Colt 2.4",
                  price: "R794",
                  image: "/Idler-arm.png",
                  views: 47,
                  likes: 14,
                  description: "Genuine Mitsubisi Colt Idler Arm in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

          <div className="MyListingSoldcard2">
            <img src="/Front-wheel-bearing-kit.png" alt="Front Wheel Bearing Kit" className="MyListingSoldalt2" />
            <h4 className="MyListingSoldname2">Front Wheel Bearing Kit</h4>
            <p className="MyListingSoldveh2">Vehicle: Suzuki Auto</p>
            <p className="MyListingSoldprice2">Price: R445</p>
            <FaEye className="MyListingSoldeye2" />
            <p className="MyListingSoldeye2-text">83</p>
            <FaHeart className="MyListingSoldheart2" />
            <p className="MyListingSoldheart2-text">47</p>
            <FaCaretRight
              className="MyListingSoldcaret1"
              onClick={() => navigate("/sold-list-details", {
                state: {
                  id: 1,
                  name: "Front Wheel Bearing Kit",
                  vehicle: "Suzuki Auto",
                  price: "R445",
                  image: "/Front-wheel-bearing-kit.png",
                  views: 83,
                  likes: 47,
                  description: "Genuine Suzuki Front Wheel Bearing Kit in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

          <div className="MyListingSoldcard3">
            <img src="/Center-bearing.png" alt="Center Bearing" className="MyListingSoldalt3" />
            <h4 className="MyListingSoldname3">Center Bearing</h4>
            <p className="MyListingSoldveh3">Vehicle: Chevrolet Spark</p>
            <p className="MyListingSoldprice3">Price: R854</p>
            <FaEye className="MyListingSoldeye3" />
            <p className="MyListingSoldeye3-text">63</p>
            <FaHeart className="MyListingSoldheart3" />
            <p className="MyListingSoldheart3-text">21</p>
            <FaCaretRight
              className="MyListingSoldcaret1"
              onClick={() => navigate("/sold-list-details", {
                state: {
                  id: 1,
                  name: "Center Bearing",
                  vehicle: "Chevrolet Spark",
                  price: "R854",
                  image: "/Center-bearing.png",
                  views: 63,
                  likes: 21,
                  description: "Genuine Chevrolet Center Bearing in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

          <div className="MyListingSoldcard4">
            <img src="/Clutch-slave-cylinder.png" alt="Clutch Slave Cylinder" className="MyListingSoldalt4" />
            <h4 className="MyListingSoldname4">Clutch Slave Cylinder</h4>
            <p className="MyListingSoldveh4">Vehicle: Fiati Punto & Uno</p>
            <p className="MyListingSoldprice4">Price: R674</p>
            <FaEye className="MyListingSoldeye4" />
            <p className="MyListingSoldeye4-text">114</p>
            <FaHeart className="MyListingSoldheart4" />
            <p className="MyListingSoldheart4-text">48</p>
            <FaCaretRight
              className="MyListingSoldcaret1"
              onClick={() => navigate("/sold-list-details", {
                state: {
                  id: 1,
                  name: "Clutch Slave Cylinder",
                  vehicle: "Fiati Punto & Uno",
                  price: "R674",
                  image: "/Clutch-slave-cylinder.png",
                  views: 114,
                  likes: 48,
                  description: "Genuine Fiat Clutch Slave Cylinder in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

        </div>

        <button className="MyListingSoldbtnAdd"
            onClick={() => navigate("/create-listing")}>
            Add New Listing
          </button>

      </main>
    </div>
  );
};

export default MyListingSoldPage;