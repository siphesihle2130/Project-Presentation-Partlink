// CreateRequest.js
import "./CreateRequest.css";
import {useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
import ImageUploader from "../Components/ImageUploader";
import NavigationBar from "../Components/NavigationBar";

function CreateRequest() {

  // const [productsOpen, setProductsOpen] = useState(false);
  // const [communityOpen, setCommunityOpen] = useState(false);
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
    location: listingData.location || "",
    gender: listingData.gender || "",
    quantity: listingData.quantity || "",
    isActive: true
  });

  const [isEditing, setIsEditing] = useState(false);

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
    <div className="CreateRequestcontainer">

      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="CreateRequestmainContent">

        {/* Header */}
        <header className="CreateRequesttopHeader">
          <div className="CreateRequestpageTitle">
            <FaArrowLeft className="CreateRequestbackBtn" onClick={handleCancel} />
            <h1>Product Request</h1>
          </div>
          <div className="CreateRequestheaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="CreateRequestprofilePic" />
          </div>
        </header>

        {/* ======================================================== picture form3======================================== */}

        <div className="CreateRequesteditForm3">
          <div>
            <h2 className="CreateRequestcreate-listing">Upload Images</h2>

            <ImageUploader />

          </div>
        </div>

        {/* =========================================================Edit Form================================================ */}
        <div className="CreateRequesteditForm">

          {/* Image Upload Section */}
          {/* <div className="imageSection">
          </div> */}

          {/* Form Fields */}
          <div className="CreateRequestformFields">
            <h2 className="CreateRequestGeneral-information">General Information</h2>

            <div className="CreateRequestformRow">
              <div className="CreateRequestformGroup">
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
              
              <div className="CreateRequestformGroup">
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

            <div className="CreateRequestformRow">
              <div className="CreateRequestformGroup">
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

              <div className="CreateRequestformGroup">
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

            <div className="CreateRequestformRow">
              <div className="CreateRequestformGroup">
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

              <div className="CreateRequestformGroup">
                <label htmlFor="condition">Condition *</label>
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

            <div className="CreateRequestformGroup fullWidth">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the product in detail..."
                rows={5}
              />
            </div>

          </div>
        </div>

        {/* ==============================form2======================================== */}
        

        <div className="CreateRequestactionButtons">
              <div className="CreateRequestrightActions">
                <button className="CreateRequestbtnCancel" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <button
                  className={`CreateRequestbtnSubmit ${!isEditing ? 'disabled' : ''}`}
                  onClick={handleSave}
                  disabled={!isEditing}
                >
                  Submit Request
                </button>
              </div>
            </div>

      </main>
    </div>
  );
}

export default CreateRequest;