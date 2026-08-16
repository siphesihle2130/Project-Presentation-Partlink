import { useRef, useState } from "react";
import "./ImageUploader.css";

type UploadedImage = {
  id: string;
  file: File;
  preview: string;
};

function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [mainImage, setMainImage] = useState<string       | null>(null);

  // Open the device's file picker
  const handleAddPhotos = () => {
    fileInputRef.current?.click();
  };

  // Handle selected images
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) {
      return;
    }

    const files = Array.from(selectedFiles);

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setImages((previousImages) => {
      const updatedImages = [...previousImages, ...newImages];

      // Make the first image the main image
      if (previousImages.length === 0 && newImages.length > 0) {
        setMainImage(newImages[0].id);
      }

      return updatedImages;
    });

    // Allows the user to select the same file again later
    event.target.value = "";
  };

  // Delete an image
  const handleDelete = (id: string) => {
    const imageToDelete = images.find((image) => image.id === id);

    if (imageToDelete) {
      URL.revokeObjectURL(imageToDelete.preview);
    }

    const updatedImages = images.filter((image) => image.id !== id);

    setImages(updatedImages);

    // If the deleted image was the main image
    if (mainImage === id) {
      if (updatedImages.length > 0) {
        setMainImage(updatedImages[0].id);
      } else {
        setMainImage(null);
      }
    }
  };

  // Set an image as the main image
  const handleSetMain = (id: string) => {
    setMainImage(id);
  };

  return (
    <div className="image-uploader">

      <div className="upload-header">
        <div>
          {/* <h2 className="imagesTopic">Upload Images</h2> */}
          {/* <p>Add photos of the item you're selling</p> */}
        </div>

        <span>{images.length}/4</span>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {/* Image previews */}
      {images.length > 0 && (
        <div className="image-grid">

          {images.map((image) => (
            <div
              className={`image-card ${
                mainImage === image.id ? "main-image" : ""
              }`}
              key={image.id}
            >

              {/* Image */}
              <img
                src={image.preview}
                alt="Product preview"
              />

              {/* Main image badge */}
              {mainImage === image.id && (
                <span className="main-badge">
                  Main Image
                </span>
              )}

              {/* Delete button */}
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDelete(image.id)}
                aria-label="Delete image"
              >
                ×
              </button>

              {/* Set as main button */}
              {mainImage !== image.id && (
                <button
                  type="button"
                  className="set-main-button"
                  onClick={() => handleSetMain(image.id)}
                >
                  Set as Main
                </button>
              )}

            </div>
          ))}

        </div>
      )}
      {/* ============================================== */}
      {/* Add photos button */}
      <button
        type="button"
        className="add-photos-button"
        onClick={handleAddPhotos}
        disabled={images.length >= 4}
      >
        Add Images
      </button>

      {/* Instructions */}
      <p className="upload-info">
        You can upload up to 4 photos.
      </p>

    </div>
  );
}

export default ImageUploader;