import { useState } from "react";
import styles from "./AddProduct.module.css";

const AddProduct = ({ type }) => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    released: "",
    memory: "",
    os: "",
    display: "",
    resolution: "",
    camera: "",
    photoandvideo: "",
    ram: "",
    chipset: "",
    battery: "",
    charging: "",
    watt: "",
    img: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [error, setError] = useState(""); // ✅ Error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading
    setError(""); // Reset error

    let uploadedImageUrl = formData.img;

    if (imageFile) {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      try {
        const uploadResponse = await fetch(
          "https://phone-api-portfolio.onrender.com/api/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadResult = await uploadResponse.json();
        if (uploadResponse.ok) {
          uploadedImageUrl = uploadResult.imageUrl;
        } else {
          setError(uploadResult.message || "Image upload failed");
          setLoading(false);
          return;
        }
      } catch (error) {
        setError("Image upload failed");
        setLoading(false);
        return;
      }
    }

    const apiUrl =
      type === "phone"
        ? "https://phone-api-portfolio.onrender.com/api/phones"
        : "https://phone-api-portfolio.onrender.com/api/tablets";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, img: uploadedImageUrl, type }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          company: "",
          name: "",
          released: "",
          memory: "",
          os: "",
          display: "",
          resolution: "",
          camera: "",
          photoandvideo: "",
          ram: "",
          chipset: "",
          battery: "",
          charging: "",
          watt: "",
          img: "",
          price: "",
        });
        setImageFile(null);
      } else {
        setError(result.message || "Error adding product");
      }
    } catch (error) {
      setError("Failed to add product");
    }

    setLoading(false); // ✅ Stop loading
  };

  return (
    <div className={styles.order}>
      <div className={styles.orderContainer}>
        <div className={styles.orderBox}>
          <h2 className={styles.title}>
            Add a New {type === "phone" ? "Phone" : "Tablet"}
          </h2>
          {error && <p className={styles.error}>{error}</p>}{" "}
          {/* ✅ Show error */}
          <form
            className={styles.card}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="released"
                placeholder="Release Date"
                value={formData.released}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="memory"
                placeholder="Memory"
                value={formData.memory}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="os"
                placeholder="OS"
                value={formData.os}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="display"
                placeholder="Display"
                value={formData.display}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="resolution"
                placeholder="Resolution"
                value={formData.resolution}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="camera"
                placeholder="Camera"
                value={formData.camera}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="photoandvideo"
                placeholder="Photo & Video"
                value={formData.photoandvideo}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="ram"
                placeholder="RAM"
                value={formData.ram}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="chipset"
                placeholder="Chipset"
                value={formData.chipset}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="battery"
                placeholder="Battery"
                value={formData.battery}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="charging"
                placeholder="Charging"
                value={formData.charging}
                onChange={handleChange}
              />
              <input
                className={styles.input}
                type="text"
                name="watt"
                placeholder="Watt"
                value={formData.watt}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <input
                className={styles.input}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {/* ✅ Show "Loading..." while submitting */}
            <button className="buttonFill" type="submit" disabled={loading}>
              {loading
                ? "Adding..."
                : `Add ${type === "phone" ? "Phone" : "Tablet"}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
