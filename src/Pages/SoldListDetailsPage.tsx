// SoldListDetailsPage.js
import "./SoldListDetailsPage.css";
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";

function SoldListDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const listingData = location.state || {};

  const [formData] = useState({
    id: listingData.id || 1,
    name: listingData.name || "",
    vehicle: listingData.vehicle || "",
    price: listingData.price || "",
    image: listingData.image || "",
    views: listingData.views || 0,
    likes: listingData.likes || 0,
    description: listingData.description || "",
    category: listingData.category || "",
    condition: listingData.condition || "",
    year: listingData.year || "",
    isActive: false
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

  // const handleSave = () => {
  //   // Here you would typically make an API call to save the changes
  //   console.log("Saving changes:", formData);
  //   setIsEditing(false);
  //   // Show success message or navigate back
  //   alert("Listing updated successfully!");
  //   navigate("/sold-list-details");
  // };

  // const handleDelete = () => {
  //   // Here you would typically make an API call to delete the listing
  //   console.log("Deleting listing:", formData.id);
  //   setShowDeleteConfirm(false);
  //   alert("Listing deleted successfully!");
  //   navigate("/my-sold-listing");
  // };

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/my-sold-listing");
      }
    } else {
      navigate("/my-sold-listing");
    }
  };

  return (
    <div className="soldDetailscontainer">

      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="soldDetailsmainContent">

        {/* Header */}
        <header className="soldDetailstopHeader">
          <div className="soldDetailspageTitle">
            <FaArrowLeft className="soldDetailsbackBtn" onClick={handleCancel} />
            <h1>Product Details</h1>
          </div>
          <div className="soldDetailsheaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="soldDetailsprofilePic" />
          </div>
        </header>

        {/* Edit Form */}
        <div className="soldDetailseditForm">

          {/* Image Upload Section */}
          <div className="soldDetailsimageSection">
            <div className="soldDetailsimagePreview">
              <img src={formData.image || "/placeholder.png"} alt={formData.name} />
              {/* <button className="changeImageBtn">Change Image</button> */}
            </div>
            <div className="soldDetailsimageStats">
              <div className="soldDetailsstat">
                <span className="soldDetailsstatLabel">Views</span>
                <span className="soldDetailsstatValue">{formData.views}</span>
              </div>
              <div className="soldDetailsstat">
                <span className="soldDetailsstatLabel">Likes</span>
                <span className="soldDetailsstatValue">{formData.likes}</span>
              </div>
              <div className="soldDetailsstat">
                <span className="soldDetailsstatLabel">Status</span>
                <span className={`soldDetailsstatValue ${formData.isActive ? 'active' : 'inactive'}`}>
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="soldDetailsformFields">

            <div className="soldDetailsformRow">
              <div className="soldDetailsformGroup">
                <label htmlFor="soldDetailsname">Part Name: {formData.name}</label>
              </div>
            </div>

            <div className="soldDetailsformRow">
              <div className="soldDetailsformGroup">
                <label htmlFor="category">Category: {formData.category}</label>
              </div>
            </div>

            <div className="soldDetailsformRow">
              <div className="soldDetailsformGroup">
                <label htmlFor="vehicle">Vehicle Model: <span className="soldDetailslbl">{formData.vehicle}</span></label>
              </div>
            </div>

            <div className="soldDetailsformRow">
              <div className="soldDetailsformGroup">
                <label htmlFor="year">Year: {formData.year}</label>
              </div>
            </div>

            <div className="soldDetailsformRow">
              <div className="soldDetailsformGroup">
                <label htmlFor="price">Price (R): {formData.price}</label>
              </div>
            </div>

            <div className="soldDetailsformGroup fullWidth">
              <label htmlFor="description">Description: {formData.description}</label>
            </div>

            {/* Action Buttons */}
            {/* <div className="actionButtons">
              <div className="leftActions">
                <button
                  className="btnDelete"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <FaTrash /> Delete Listing
                </button>
              </div>
              <div className="rightActions">
                <button className="btnCancel" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <button
                  className={`btnSave ${!isEditing ? 'disabled' : ''}`}
                  onClick={handleSave}
                  disabled={!isEditing}
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            </div> */}

          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {/* {showDeleteConfirm && (
          <div className="modalOverlay">
            <div className="modal">
              <h2>Delete Listing</h2>
              <p>Are you sure you want to delete "{formData.name}"? This action cannot be undone.</p>
              <div className="modalActions">
                <button className="btnCancel" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="btnDeleteConfirm" onClick={handleDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )} */}

      </main>
    </div>
  );
}

export default SoldListDetailsPage;