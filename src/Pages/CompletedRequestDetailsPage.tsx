// CompletedRequestDetailsPage.js
import "./CompletedRequestDetailsPage.css";
import NavigationBar from "../Components/NavigationBar";
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";

function CompletedRequestDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const listingData = location.state || {};

  const [formData] = useState({
    id: listingData.id || 1,
    name: listingData.name || "",
    vehicle: listingData.vehicle || "",
    budget: listingData.budget || "",
    image: listingData.image || "",
    responses: listingData.responses || 0,
    date: listingData.date || "",
    description: listingData.description || "",
    category: listingData.category || "",
    condition: listingData.condition || "",
    year: listingData.year || "",
    isActive: false, // Assuming completed requests are not active
    isCompleted: true, // Assuming completed requests are not active
  });

  const [isEditing] = useState(false);
  // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  //   setIsEditing(true);
  // };

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/completed-requests");
      }
    } else {
      navigate("/completed-requests");
    }
  };

  return (
    <div className="CompletedRequestDetailscontainer">

      <NavigationBar />

      {/* Main Content */}
      <main className="CompletedRequestDetailsmainContent">

        {/* Header */}
        <header className="CompletedRequestDetailstopHeader">
          <div className="CompletedRequestDetailspageTitle">
            <FaArrowLeft className="CompletedRequestDetailsbackBtn" onClick={handleCancel} />
            <h1>Product Details</h1>
          </div>
          <div className="CompletedRequestDetailsheaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="CompletedRequestDetailsprofilePic" />
          </div>
        </header>

        {/* Edit Form */}
        <div className="CompletedRequestDetailseditForm">

          {/* Image Upload Section */}
          <div className="CompletedRequestDetailsimageSection">
            <div className="CompletedRequestDetailsimagePreview">
              <img src={formData.image || "/placeholder.png"} alt={formData.name} />
              {/* <button className="changeImageBtn">Change Image</button> */}
            </div>
            <div className="CompletedRequestDetailsimageStats">
              <div className="CompletedRequestDetailsstat">
                <span className="CompletedRequestDetailsstatLabel">Responses</span>
                <span className="CompletedRequestDetailsstatValue">{formData.responses}</span>
              </div>
              <div className="CompletedRequestDetailsstat">
                <span className="CompletedRequestDetailsstatLabel">Status</span>
                <span className={`CompletedRequestDetailsstatValue ${formData.isCompleted ? 'completed' : 'not-completed'}`}>
                  {formData.isCompleted ? 'Completed' : 'Not Completed'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="CompletedRequestDetailsformFields">

            <div className="CompletedRequestDetailsformRow">
              <div className="CompletedRequestDetailsformGroup">
                <label htmlFor="name">Part Name: <span className="CompletedRequestDetailslbl">{formData.name}</span></label>
              </div>
            </div>

            <div className="CompletedRequestDetailsformRow">
              <div className="CompletedRequestDetailsformGroup">
                <label htmlFor="category">Category: <span className="CompletedRequestDetailslbl">{formData.category}</span></label>
              </div>
            </div>

            <div className="CompletedRequestDetailsformRow">
              <div className="CompletedRequestDetailsformGroup">
                <label htmlFor="vehicle">Vehicle Model: <span className="CompletedRequestDetailslbl">{formData.vehicle}</span></label>
              </div>
            </div>

            <div className="CompletedRequestDetailsformRow">
              <div className="CompletedRequestDetailsformGroup">
                <label htmlFor="year">Year: <span className="CompletedRequestDetailslbl">{formData.year}</span></label>
              </div>
            </div>

             <div className="CompletedRequestDetailsformRow">
              <div className="CompletedRequestDetailsformGroup">
                <label htmlFor="date">Date: <span className="CompletedRequestDetailslbl">{formData.date}</span></label>
              </div>
            </div>

            <div className="CompletedRequestDetailsformRow">
              <div className="CompletedRequestDetailsformGroup">
                <label htmlFor="budget">Budget (R): <span className="CompletedRequestDetailslbl">{formData.budget}</span></label>
              </div>
            </div>

            <div className="CompletedRequestDetailsformGroup fullWidth">
              <label htmlFor="description">Description: <span className="CompletedRequestDetailslbl">{formData.description}</span></label>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default CompletedRequestDetailsPage;