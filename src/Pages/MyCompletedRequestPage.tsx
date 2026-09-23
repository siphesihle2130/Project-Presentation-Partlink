import "./MyCompletedRequestPage.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
import { FaCaretRight, FaCog } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";


function MyCompletedRequestPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const navigate = useNavigate();
  const handleTabChange = (tab: "active" | "completed", path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="MyCompletedRequestcontainer">

      <NavigationBar />

      {/* Main Content */}
      <main className="MyCompletedRequestmainContent">

        {/* Header */}
        <header className="MyCompletedRequesttopHeader">
          <div className="MyCompletedRequestpageTitle">
            <h1>My Requests</h1>
          </div>
          {/* <div className="MyCompletedRequestsettings" onClick={() => navigate("/profile")}> */}
            <FaCog className="MyCompletedRequestsettings" />
          {/* </div> */}
          <div className="MyCompletedRequestheaderActions" onClick={() => navigate("/profile")}>
            <FaCog className="MyCompletedRequestsettings" />
            <img src="Profile.png" alt="Profile" className="MyCompletedRequestprofilePic" />
          </div>
        </header>

        {/* Layout Grid */}
        <div className="MyCompletedRequestcontentGrid">

          {/*====================== Navigation Bar ======================*/}
          <div className="MyCompletedRequesttabs-wrapper">
            <div className="MyCompletedRequesttabs-container">
              <div className="MyCompletedRequesttabs-underline"></div>
              {/* Active Tab */}
              <button
                className={`MyCompletedRequesttab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => handleTabChange('active', "/active-requests")}
              >
                Active (4)
              </button>

              {/* Completed Tab */}
              <button
                className={`MyCompletedRequesttab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => handleTabChange('completed', "/completed-requests")}
              >
                Completed (1)
              </button>
            </div>
          </div>
        </div>

        {/* =========================================list============================= */}
        <div className="MyCompletedRequestlist">
          <div className="MyCompletedRequestcard1">
            <img src="/Wheel-decal-cap.png" alt="Clutch kit" className="MyCompletedRequestalt1" />
            <h4 className="MyCompletedRequestname1">Wheel decal cap</h4>
            <p className="MyCompletedRequestveh1">Vehicle: Volkswagen</p>
            <p className="MyCompletedRequestCompbudget1">Budget: R250 - R300</p>
            <p className="MyCompletedRequestresponses">Responses:</p>
            <p className="MyCompletedRequestresponse-text">50</p>
            <p className="MyCompletedRequestdate">30 June 2026</p>
            <FaCaretRight
              className="MyCompletedRequestcaret1"
              onClick={() => navigate("/completed-request-details", {
                state: {
                  id: 1,
                  name: "Wheel decal cap",
                  vehicle: "Volkswagen",
                  budget: "R250 - R300",
                  image: "/Wheel-decal-cap.png",
                  responses: 50, 
                  date: "30 June 2026",
                  description: "Genuine Volkswagen Wheel decal cap in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020"
                }
              })}
            />

          </div>

        </div>

        <button className="MyCompletedRequestbtnAdd"
          onClick={() => navigate("/create-request")}>
          Create New Request
        </button>

      </main>
    </div>
  );
};

export default MyCompletedRequestPage;