// CreateRequest.js
import "./CreateRequest.css";
import { useState, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";        // ← new

function CreateRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const listingData = location.state || {};

  const [formData, setFormData] = useState({
    id: listingData.id || Date.now(),
    name: listingData.name || "",
    vehicle: listingData.vehicle || "",
    budget: listingData.budget || "",
    image: listingData.image || "",
    responses: listingData.responses || 0,
    description: listingData.description || "",
    category: listingData.category || "",
    condition: listingData.condition || "",
    year: listingData.year || "",
    date:
      listingData.date ||
      new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    isActive: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);   // ← new
  const [formError, setFormError] = useState<string | null>(null); // ← fixed type

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEditing(true);
    if (formError) setFormError(null);                       // ← new
  };

  // ─────────────────────────────────────────────
  // Validate required fields
  // ─────────────────────────────────────────────
  const validateForm = () => {                               // ← new
    const missing = [];
    if (!formData.name.trim()) missing.push("Part Name");
    if (!formData.category) missing.push("Category");
    if (!formData.vehicle.trim()) missing.push("Vehicle Model");
    if (!formData.budget.toString().trim()) missing.push("Budget");
    if (!formData.condition) missing.push("Condition");
    return missing;
  };

  // ─────────────────────────────────────────────
  // Submit: insert into Requests table
  // ─────────────────────────────────────────────
  const handleSave = async () => {                           // ← now async
    const missing = validateForm();
    if (missing.length > 0) {
      setFormError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      // Get the current user (optional — only if using auth)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: inserted, error: insertError } = await supabase
        .from("Requests")                                    // ← your table
        .insert({
          name: formData.name,
          category: formData.category,
          vehicle: formData.vehicle,
          year: formData.year || null,
          budget: formData.budget,                           // text column
          condition: formData.condition,
          description: formData.description || null,
          responses: 0,
          is_active: true,
          user_id: user?.id ?? null,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      console.log("Request submitted:", inserted);
      setIsEditing(false);
      alert("Request submitted successfully!");
      navigate("/requests");                              // ← adjust to your route
    } catch (err) {
      console.error(err);
      setFormError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to cancel?"
        )
      ) {
        navigate("/requests");
      }
    } else {
      navigate("/requests");
    }
  };

  return (
    <div className="CreateRequestcontainer">
      <main className="CreateRequestmainContent">
        <header className="CreateRequesttopHeader">
          <div className="CreateRequestpageTitle">
            <FaArrowLeft className="CreateRequestbackBtn" onClick={handleCancel} />
            <h1>Product Request</h1>
          </div>
        </header>

        <div className="CreateRequesteditForm">
          <div className="CreateRequestformFields">
            <h2 className="CreateRequestGeneral-information">
              General Information
            </h2>

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

              <div className="CreateRequestformGroup">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="">Select Condition</option>
                  <option value="Any">Any condition</option>
                  <option value="Likely New">Likely new</option>
                  <option value="Used (fully functioning)">
                    Used (fully functioning)
                  </option>
                  <option value="Used (Minor problems)">
                    Used (Minor problems)
                  </option>
                  <option value="Refurbished">Refurbished</option>
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

        {/* Error message */}
        {formError && (                                        // ← new
          <div className="CreateRequestFormError">{formError}</div>
        )}

        <div className="CreateRequestactionButtons">
          <div className="CreateRequestrightActions">
            <button
              className="CreateRequestbtnCancel"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <FaTimes /> Cancel
            </button>
            <button
              className="CreateRequestbtnSubmit"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit Request"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateRequest;