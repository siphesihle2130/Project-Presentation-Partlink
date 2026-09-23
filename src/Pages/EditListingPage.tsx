// EditListingPage.js
import "./EditListingPage.css";
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSave, FaTrash, FaTimes } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";


function EditListingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const listingData = location.state || {};
  
  const [formData, setFormData] = useState({
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
    isActive: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    console.log("Saving changes:", formData);
    setIsEditing(false);
    // Show success message or navigate back
    alert("Listing updated successfully!");
    navigate("/my-listing");
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the listing
    console.log("Deleting listing:", formData.id);
    setShowDeleteConfirm(false);
    alert("Listing deleted successfully!");
    navigate("/my-listing");
  };

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/my-listing");
      }
    } else {
      navigate("/my-listing");
    }
  };

  return (
    <div className="container">

      <NavigationBar />
      

      {/* Main Content */}
      <main className="mainContent">

        {/* Header */}
        <header className="topHeader">
          <div className="pageTitle">
              <FaArrowLeft className="backBtn" onClick={handleCancel}/>
            <h1>Edit Listing</h1>
          </div>
          <div className="headerActions">
           <img src="Profile.png" alt="Profile" className="profilePic" />
          </div>
        </header>

        {/* Edit Form */}
        <div className="editForm">
          
          {/* Image Upload Section */}
          <div className="imageSection">
            <div className="imagePreview">
              <img src={formData.image || "/placeholder.png"} alt={formData.name} />
              <button className="changeImageBtn">Change Image</button>
            </div>
            <div className="imageStats">
              <div className="stat">
                <span className="statLabel">Views</span>
                <span className="statValue">{formData.views}</span>
              </div>
              <div className="stat">
                <span className="statLabel">Likes</span>
                <span className="statValue">{formData.likes}</span>
              </div>
              <div className="stat">
                <span className="statLabel">Status</span>
                <span className={`statValue ${formData.isActive ? 'active' : 'inactive'}`}>
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="formFields">
            
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="name">Part Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter part name"
                  required
                />
              </div>
              
              <div className="formGroup">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Engine">Engine</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Body">Body</option>
                  <option value="Interior">Interior</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Brakes">Brakes</option>
                  <option value="Transmission">Transmission</option>
                  <option value="Exhaust">Exhaust</option>
                </select>
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="vehicle">Vehicle Model *</label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota Corolla"
                  required
                />
              </div>
              
              <div className="formGroup">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="price">Price (R) *</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., R8,250"
                  required
                />
              </div>
              
              <div className="formGroup">
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>

            <div className="formGroup fullWidth">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the part in detail..."
                rows={5}
              />
            </div>

            {/* Action Buttons */}
            <div className="actionButtons">
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
            </div>

          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
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
        )}

      </main>
    </div>
  );
}

export default EditListingPage;