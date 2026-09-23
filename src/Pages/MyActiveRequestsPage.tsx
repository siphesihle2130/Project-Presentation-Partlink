import "./MyActiveRequestsPage.css";
import NavigationBar from "../Components/NavigationBar";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";


function MyActiveRequestPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const navigate = useNavigate();
  const handleTabChange = (tab: "active" | "completed", path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="MyActiveRequestscontainer">

      <NavigationBar />

      {/* Main Content */}
      <main className="MyActiveRequestsmainContent">

        {/* Header */}
        <header className="MyActiveRequeststopHeader">
          <div className="MyActiveRequestspageTitle">
            <h1>My Requests</h1>
          </div>
          <div className="MyActiveRequestsheaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="MyActiveRequestsprofilePic" />
          </div>
        </header>

        {/* Layout Grid */}
        <div className="MyActiveRequestscontentGrid">

          {/*====================== Navigation Bar ======================*/}
          <div className="MyActiveRequeststabs-wrapper">
            <div className="MyActiveRequeststabs-container">
              <div className="MyActiveRequeststabs-underline"></div>
              {/* Active Tab */}
              <button
                className={`MyActiveRequeststab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => handleTabChange('active', "/active-requests")}
              >
                Active (4)
              </button>

              {/* Completed Tab */}
              <button
                className={`MyActiveRequeststab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => handleTabChange('completed', "/completed-requests")}
              >
                Completed (1)
              </button>
            </div>
          </div>
        </div>

        {/* =========================================list============================= */}
        <div className="MyActiveRequestslist">
          <div className="MyActiveRequestscard1">
            <img src="/Clutch kit.png" alt="Clutch kit" className="MyActiveRequestsalt1" />
            <h4 className="MyActiveRequestsname1">Clutch kit</h4>
            <p className="MyActiveRequestsveh1">Vehicle: Toyota Corolla</p>
            <p className="MyActiveRequestsBudget">Budget: R2, 250 - R3, 000</p>
            <p className="MyActiveRequestsresponse">Responses:</p>
            <p className="MyActiveRequestsresponse-text">50</p>
            <p className="MyActiveRequestsdate">10 June 1026</p>
            <FaCaretRight
              className="MyActiveRequestscaret1"
              onClick={() => navigate("/active-requests-details", {
                state: {
                  id: 1,
                  name: "Clutch kit",
                  vehicle: "Toyota Corolla",
                  budget: "R2,250 - R3,000",
                  responses: 50,
                  image: "/Clutch kit.png",
                  description: "Genuine Toyota clutch kit in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020",
                  date: "10 June 2026"
                }
              })}
            />

          </div>

          <div className="MyActiveRequestscard2">
            <img src="/Air-intake-horse.png" alt="Air intake" className="MyActiveRequestsalt2" />
            <h4 className="MyActiveRequestsname2">Air intake horse</h4>
            <p className="MyActiveRequestsveh2">Vehicle: Corsa B 13i0</p>
            <p className="MyActiveRequestsBudget">Budget: R5, 550 - R6, 000</p>
            <p className="MyActiveRequestsresponse">Responses:</p>
            <p className="MyActiveRequestsresponse-text">33</p>
            <p className="MyActiveRequestsdate">7 July 2026</p>
            <FaCaretRight
              className="MyActiveRequestscaret1"
              onClick={() => navigate("/active-requests-details", {
                state: {
                  id: 2,
                  name: "Air intake horse",
                  vehicle: "Corsa B 13i0",
                  budget: "R5,550 - R6,000",
                  responses: 33,
                  image: "/Air-intake-horse.png",
                  description: "Genuine BMW headlights in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020",
                  date: "7 July 2026"
                }
              })}
            />

          </div>

          <div className="MyActiveRequestscard3">
            <img src="/side-mirror.png" alt="Side Mirror" className="MyActiveRequestsalt3" />
            <h4 className="MyActiveRequestsname3">Side Mirror</h4>
            <p className="MyActiveRequestsveh3">Vehicle: Hyundai i20</p>
            <p className="MyActiveRequestsBudget">Budget: R450 - R500</p>
            <p className="MyActiveRequestsresponse">Responses:</p>
            <p className="MyActiveRequestsresponse-text">63</p>
            <p className="MyActiveRequestsdate">17 July 2026</p>
            <FaCaretRight
              className="MyActiveRequestscaret1"
              onClick={() => navigate("/active-requests-details", {
                state: {
                  id: 3,
                  name: "Side Mirror",
                  vehicle: "Hyundai i20",
                  budget: "R450 - R500",
                  responses: 63,
                  image: "/side-mirror.png",
                  description: "Genuine Hyundai side mirror in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020",
                  date: "17 July 2026"
                }
              })}
            />

          </div>

          <div className="MyActiveRequestscard4">
            <img src="/Outer-tie-rod.png" alt="Outer Tie Rod" className="MyActiveRequestsalt4" />
            <h4 className="MyActiveRequestsname4">Outer Tie Rod</h4>
            <p className="MyActiveRequestsveh4">Vehicle: Auodi TT 2023</p>
            <p className="MyActiveRequestsBudget">Budget: R700 - R1 000</p>
            <p className="MyActiveRequestsresponse">Responses:</p>
            <p className="MyActiveRequestsresponse-text">104</p>
            <p className="MyActiveRequestsdate">8 July 2026</p>
            <FaCaretRight
              className="MyActiveRequestscaret1"
              onClick={() => navigate("/active-requests-details", {
                state: {
                  id: 4,
                  name: "Outer Tie Rod",
                  vehicle: "Audi TT 2023",
                  budget: "R700 - R1,000",
                  responses: 104,
                  image: "/Outer-tie-rod.png",
                  description: "Genuine Audi outer tie rod in excellent condition. 100% working.",
                  category: "Electrical",
                  condition: "Good",
                  year: "2020",
                  date: "8 July 2026"
                }
              })}
            />

          </div>

        </div>

        <button className="MyActiveRequestsbtnAdd"
          onClick={() => navigate("/create-request")}>
          Create New Request
        </button>

      </main>
    </div>
  );
};

export default MyActiveRequestPage;