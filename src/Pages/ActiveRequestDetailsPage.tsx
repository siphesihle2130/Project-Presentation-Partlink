// ActiveRequestDetailsPage.js
import "./ActiveRequestDetailsPage.css";
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSave, FaTrash, FaCheck } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";

function ActiveRequestDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state || {};
  
  const [formData, setFormData] = useState({
    id: requestData.id || 1,
    name: requestData.name || "",
    vehicle: requestData.vehicle || "",
    budget: requestData.budget || "",
    image: requestData.image || "",
    responses: requestData.responses || 0,
    // likes: requestData.likes || 0,
    description: requestData.description || "",
    category: requestData.category || "",
    condition: requestData.condition || "",
    year: requestData.year || "",
    date: requestData.date || "",
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
    navigate("/active-requests");
  };

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/active-requests");
      }
    } else {
      navigate("/active-requests");
    }
  };

  return (
    <div className="ActiveRequestDetailscontainer">

      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="ActiveRequestDetailsmainContent">

        {/* Header */}
        <header className="ActiveRequestDetailstopHeader">
          <div className="ActiveRequestDetailspageTitle">
              <FaArrowLeft className="ActiveRequestDetailsbackBtn" onClick={handleCancel}/>
            <h1>Edit Request</h1>
          </div>
          <div className="ActiveRequestDetailsheaderActions" onClick={() => navigate("/profile")}>
           <img src="Profile.png" alt="Profile" className="ActiveRequestDetailsprofilePic" />
          </div>
        </header>

        {/* Edit Form */}
        <div className="ActiveRequestDetailseditForm">
          
          {/* Image Upload Section */}
          <div className="ActiveRequestDetailsimageSection">
            <div className="ActiveRequestDetailsimagePreview">
              <img src={formData.image || "/placeholder.png"} alt={formData.name} />
              <button className="ActiveRequestDetailschangeImageBtn">Change Image</button>
            </div>
            <div className="ActiveRequestDetailsimageStats">
              <div className="ActiveRequestDetailsstat">
                <span className="ActiveRequestDetailsstatLabel">Responses</span>
                <span className="ActiveRequestDetailsstatValue">{formData.responses}</span>
              </div>
              {/* <div className="stat">
                <span className="statLabel">Likes</span>
                <span className="statValue">{formData.likes}</span>
              </div> */}
              <div className="ActiveRequestDetailsstat">
                <span className="ActiveRequestDetailsstatLabel">Status</span>
                <span className={`ActiveRequestDetailsstatValue ${formData.isActive ? 'active' : 'inactive'}`}>
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="ActiveRequestDetailsformFields">
            
            <div className="ActiveRequestDetailsformRow">
              <div className="ActiveRequestDetailsformGroup">
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
              
              <div className="ActiveRequestDetailsformGroup">
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

            <div className="ActiveRequestDetailsformRow">
              <div className="ActiveRequestDetailsformGroup">
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
              
              <div className="ActiveRequestDetailsformGroup">
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

            <div className="ActiveRequestDetailsformRow">
              <div className="ActiveRequestDetailsformGroup">
                <label htmlFor="budget">Budget (R) *</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., R8,250"
                  required
                />
              </div>
              
              <div className="ActiveRequestDetailsformGroup">
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

            <div className="ActiveRequestDetailsformRow">
              <div className="ActiveRequestDetailsformGroup">
                <label htmlFor="vehicle">Date *</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 June 2026"
                  required
                />
              </div>
            </div>

            <div className="ActiveRequestDetailsformGroup fullWidth">
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
            <div className="ActiveRequestDetailsactionButtons">
              <div className="ActiveRequestDetailsleftActions">
                <button 
                  className="ActiveRequestDetailsbtnDelete" 
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <FaTrash /> Delete Request
                </button>
              </div>
              <div className="ActiveRequestDetailsrightActions">
                <button className="ActiveRequestDetailsbtnCancel1" onClick={handleCancel}>
                  <FaCheck /> Mark as complete
                </button>
                <button 
                  className={`ActiveRequestDetailsbtnSave1 ${!isEditing ? 'disabled' : ''}`} 
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
          <div className="ActiveRequestDetailsmodalOverlay">
            <div className="ActiveRequestDetailsmodal">
              <h2>Delete Request</h2>
              <p>Are you sure you want to delete "{formData.name}"? This action cannot be undone.</p>
              <div className="ActiveRequestDetailsmodalActions">
                <button className="ActiveRequestDetailsbtnCancel" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="ActiveRequestDetailsbtnDeleteConfirm" onClick={handleDelete}>
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

export default ActiveRequestDetailsPage;