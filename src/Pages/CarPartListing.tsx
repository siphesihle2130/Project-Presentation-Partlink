// CarPartListing.js
import "./CarPartListing.css";
import { useRef, useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import ImageUploader from "../Components/ImageUploader";
import NavigationBar from "../Components/NavigationBar";
import { supabase } from "../lib/supabaseClient";       // ← new import

function CarPartListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const listingData = location.state || {};

  // ─────────────────────────────────────────────
  // FIX 1: useState instead of useRef
  // ─────────────────────────────────────────────
  const [formData, setFormData] = useState({
    id: listingData.id || 1,
    name: listingData.name || "",
    description: listingData.description || "",
    brand: listingData.brand || "",
    model: listingData.model || "",
    category: listingData.category || "",
    condition: listingData.condition || "",
    street: listingData.street || "",
    city: listingData.city || "",
    province: listingData.province || "",
    postalCode: listingData.postalCode || "",
    price: listingData.price || "",
    quantity: listingData.quantity || "",
    image: listingData.image || "",
    views: listingData.views || 0,
    likes: listingData.likes || 0,
    location: listingData.location || "",
    gender: listingData.gender || "",
    isActive: true,
  });

  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [stepError, setStepError] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);   // ← new

  // Hold the actual File object for upload
  const imageFileRef = useRef<File | null>(null);           // ← new

  const steps = [
    { id: 1, label: "General Information" },
    { id: 2, label: "Address" },
    { id: 3, label: "Pricing & Stock" },
    { id: 4, label: "Image" },
  ];

  // ─────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────
  const validateStep = (step: number) => {
    const missing = [];
    const fields = [];

    if (step === 1) {
      if (!formData.name?.trim()) { missing.push("Product Name"); fields.push("name"); }
      if (!formData.description?.trim()) { missing.push("Description"); fields.push("description"); }
      if (!formData.brand) { missing.push("Car Brand"); fields.push("brand"); }
      if (!formData.model) { missing.push("Model"); fields.push("model"); }
      if (!formData.category) { missing.push("Category"); fields.push("category"); }
      if (!formData.condition) { missing.push("Condition"); fields.push("condition"); }
    }

    if (step === 2) {
      if (!formData.street?.trim()) { missing.push("Street"); fields.push("street"); }
      if (!formData.city?.trim()) { missing.push("City"); fields.push("city"); }
      if (!formData.province) { missing.push("Province"); fields.push("province"); }
      if (!formData.postalCode?.trim()) { missing.push("Postal Code"); fields.push("postalCode"); }
    }

    if (step === 3) {
      if (!formData.price) { missing.push("Price"); fields.push("price"); }
      if (!formData.quantity) { missing.push("Quantity"); fields.push("quantity"); }
    }

    if (step === 4) {
      if (!imageFileRef.current) { missing.push("Product Image"); fields.push("image"); }
    }

    return { valid: missing.length === 0, missing, fields };
  };

  // Auto-mark steps complete whenever formData changes
  useEffect(() => {
    [1, 2, 3, 4].forEach((step) => {
      const { valid } = validateStep(step);
      if (valid) {
        setCompletedSteps((prev) => {
          if (prev.has(step)) return prev;
          const next = new Set(prev);
          next.add(step);
          return next;
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // ─────────────────────────────────────────────
  // Input handling
  // ─────────────────────────────────────────────
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsEditing(true);

    setInvalidFields((prev) => {
      if (!prev.has(name)) return prev;
      const next = new Set(prev);
      next.delete(name);
      return next;
    });

    if (stepError) setStepError(null);
  };

  // Store the File in the ref, and a preview string in formData
  const handleImageUpload = (file: File | null) => {
    imageFileRef.current = file;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
      setIsEditing(true);

      setCompletedSteps((prev) => {
        if (prev.has(4)) return prev;
        const next = new Set(prev);
        next.add(4);
        return next;
      });
      setInvalidFields((prev) => {
        if (!prev.has("image")) return prev;
        const next = new Set(prev);
        next.delete("image");
        return next;
      });
    } else {
      // Image cleared
      setFormData((prev) => ({ ...prev, image: "" }));
      setCompletedSteps((prev) => {
        if (!prev.has(4)) return prev;
        const next = new Set(prev);
        next.delete(4);
        return next;
      });
    }
  };

  const markComplete = (step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  };

  const goToStep = (step: number) => {
    if (completedSteps.has(step)) {
      setActiveStep(step);
      return;
    }
    const nextAllowed = Math.max(...Array.from(completedSteps, (step) => Number(step)), 0) + 1;
    if (step === nextAllowed) setActiveStep(step);
  };

  const handleNext = () => {
    const { valid, missing, fields } = validateStep(activeStep);
    if (!valid) {
      setStepError(`Please fill in: ${missing.join(", ")}`);
      setInvalidFields(new Set(fields));
      return;
    }
    setStepError(null);
    setInvalidFields(new Set());
    markComplete(activeStep);
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      setStepError(null);
      setInvalidFields(new Set());
    }
  };

  // ─────────────────────────────────────────────
  // Publish: upload image → insert row
  // ─────────────────────────────────────────────
  const handleSave = async () => {
    // Full validation across all steps
    const allMissing: string[] = [];
    [1, 2, 3, 4].forEach((step) => {
      const { missing } = validateStep(step);
      allMissing.push(...missing);
    });

    if (allMissing.length > 0) {
      setStepError(`Cannot list yet. Missing: ${allMissing.join(", ")}`);
      return;
    }

    if (!imageFileRef.current) {
      setStepError("Please upload a product image.");
      return;
    }

    setIsSubmitting(true);
    setStepError(null);

    try {
      // ── 1. Upload image to Supabase Storage ──
      const file = imageFileRef.current;
      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      // ── 2. Get public URL ──
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const publicImageUrl = urlData.publicUrl;

      // ── 3. Get current user (optional, if using auth) ──
      const { data: { user } } = await supabase.auth.getUser();

      // ── 4. Insert product row ──
      const { data: inserted, error: insertError } = await supabase
        .from("car_parts")             // ← your table name
        .insert({
          name: formData.name,
          description: formData.description,
          brand: formData.brand,
          model: formData.model,
          category: formData.category,
          condition: formData.condition,
          street: formData.street,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postalCode,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          image_url: publicImageUrl,
          user_id: user?.id ?? null,
          is_active: true,
        })
        .select()
        .single();

      if (insertError) throw new Error(`Database insert failed: ${insertError.message}`);

      console.log("Product listed:", inserted);
      setIsEditing(false);
      alert("Listing published successfully!");
      navigate("/my-listing");
    } catch (err) {
      console.error(err);
      setStepError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavedDraft = () => {
    if (isEditing) {
      if (window.confirm("This product will be saved in drafts. Are you sure you want to continue?")) {
        navigate("/car-partlisting");
      }
    } else {
      navigate("/my-listing");
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/car-partlisting");
      }
    } else {
      navigate("/my-listing");
    }
  };

  const allStepsComplete = completedSteps.size === 4;

  return (
    <div className="CarPartListingContainer">
      <NavigationBar />

      <section className="listing-main-content">
        <h1>Product listing</h1>
        <p>Please enter the product details</p>

        <div className="listing-form-grid">
          <div className="listing-form-column">
            <div className="listing-card">
              <div className="listing-progress-bar">
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.has(step.id);
                  const isActive = activeStep === step.id;
                  const nextAllowed = Math.max(...completedSteps, 0) + 1;
                  const isClickable = isCompleted || step.id === nextAllowed;

                  return (
                    <div
                      key={step.id}
                      className={`listing-progress-step
                        ${isCompleted ? "completed" : ""}
                        ${isActive ? "active" : ""}
                        ${isClickable ? "clickable" : "locked"}`}
                      onClick={() => isClickable && goToStep(step.id)}
                    >
                      <div className="listing-step-circle">
                        {isCompleted ? <FaCheck /> : step.id}
                      </div>
                      <span className="listing-step-label">{step.label}</span>

                      {index < steps.length - 1 && (
                        <div
                          className={`listing-step-line
                            ${completedSteps.has(step.id) ? "filled" : ""}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {activeStep === 1 && (
                <div className="listing-step-content">
                  <h3 className="listing-card-title">General Information</h3>

                  <div className="productListingRow">
                    <div className="listing-form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        name="name"
                        className={`listing-form-input ${
                          invalidFields.has("name") ? "input-error" : ""
                        }`}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="listing-form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        name="description"
                        className={`listing-form-input ${
                          invalidFields.has("description") ? "input-error" : ""
                        }`}
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="productListingRow">
                    <div className="listing-form-group">
                      <label>Car brand</label>
                      <select
                        name="brand"
                        className={`listing-form-select ${
                          invalidFields.has("brand") ? "input-error" : ""
                        }`}
                        value={formData.brand}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Brand</option>
                        <option>Audi</option>
                        <option>Toyota</option>
                        <option>BMW</option>
                        <option>Mercedes</option>
                        <option>Volkswagen</option>
                        <option>Ford</option>
                        <option>Hyundai</option>
                        <option>Suzuki</option>
                        <option>Renault</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="listing-form-group">
                      <label>Model</label>
                      <select
                        name="model"
                        className={`listing-form-select ${
                          invalidFields.has("model") ? "input-error" : ""
                        }`}
                        value={formData.model}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Model</option>
                        <option>Corolla</option>
                        <option>Hilux</option>
                        <option>3 Series</option>
                        <option>C-Class</option>
                        <option>Polo</option>
                        <option>Ranger</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="productListingRow">
                    <div className="listing-form-group">
                      <label>Category</label>
                      <select
                        name="category"
                        className={`listing-form-select ${
                          invalidFields.has("category") ? "input-error" : ""
                        }`}
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        <option>Engine</option>
                        <option>Brakes</option>
                        <option>Suspension</option>
                        <option>Electrical</option>
                        <option>Body & Exterior</option>
                        <option>Interior</option>
                        <option>Fluid system</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="listing-form-group">
                      <label>Condition</label>
                      <select
                        name="condition"
                        className={`listing-form-select ${
                          invalidFields.has("condition") ? "input-error" : ""
                        }`}
                        value={formData.condition}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Condition</option>
                        <option>Likely New</option>
                        <option>Used (fully functioning)</option>
                        <option>Used (minor problems)</option>
                        <option>Refurbished</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="listing-step-content">
                  <h3 className="listing-card-title">Address</h3>

                  <div className="productListingRow">
                    <div className="listing-form-group">
                      <label>Street</label>
                      <input
                        type="text"
                        name="street"
                        className={`listing-form-input ${
                          invalidFields.has("street") ? "input-error" : ""
                        }`}
                        value={formData.street}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="listing-form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        className={`listing-form-input ${
                          invalidFields.has("city") ? "input-error" : ""
                        }`}
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="productListingRow">
                    <div className="listing-form-group">
                      <label>Province</label>
                      <select
                        name="province"
                        className={`listing-form-select ${
                          invalidFields.has("province") ? "input-error" : ""
                        }`}
                        value={formData.province}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Province</option>
                        <option>Western Cape</option>
                        <option>Gauteng</option>
                        <option>KwaZulu-Natal</option>
                        <option>Eastern Cape</option>
                        <option>Free State</option>
                        <option>Limpopo</option>
                        <option>Mpumalanga</option>
                        <option>North West</option>
                        <option>Northern Cape</option>
                      </select>
                    </div>
                    <div className="listing-form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        className={`listing-form-input ${
                          invalidFields.has("postalCode") ? "input-error" : ""
                        }`}
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="listing-step-content">
                  <h3 className="listing-card-title">Pricing & Stock</h3>

                  <div className="productListingRow">
                    <div className="listing-form-group">
                      <label>Price (R)</label>
                      <input
                        type="number"
                        name="price"
                        className={`listing-form-input ${
                          invalidFields.has("price") ? "input-error" : ""
                        }`}
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="listing-form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        className={`listing-form-input ${
                          invalidFields.has("quantity") ? "input-error" : ""
                        }`}
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="listing-step-content">
                  <h3 className="listing-card-title">Upload Image</h3>
                  <p style={{ color: "#c0c8d8" }}>
                    Use the uploader on the right to add your product photo.
                    Once an image is uploaded, this step will be marked complete.
                  </p>

                  {formData.image ? (
                    <div className="listing-image-confirm">
                      <FaCheck /> Image uploaded
                    </div>
                  ) : (
                    <div className="listing-image-pending">
                      <FaExclamationCircle /> No image uploaded yet
                    </div>
                  )}
                </div>
              )}

              {stepError && (
                <div className="listing-step-error">
                  <FaExclamationCircle /> {stepError}
                </div>
              )}

              <div className="listing-step-nav">
                <button
                  className="listing-btn-draft1"
                  onClick={handleBack}
                  disabled={activeStep === 1}
                >
                  Back
                </button>

                {activeStep < 4 ? (
                  <button className="listing-btn-list" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button
                    className="listing-btn-list"
                    onClick={handleSave}
                    disabled={!allStepsComplete || isSubmitting}
                  >
                    {isSubmitting ? "Publishing..." : "List Product"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="listing-image-column">
            <div
              className={`listing-card-upload-card ${
                activeStep === 4 ? "highlight" : ""
              }`}
            >
              <ImageUploader onUpload={handleImageUpload} />
            </div>

            <div className="listing-action-bar">
              <button className="listing-btn-draft" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="listing-btn-list"
                onClick={handleSavedDraft}
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarPartListing;