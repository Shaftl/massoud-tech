import React, { useState, useEffect } from "react";

const UpdateItemForm = ({ itemType, itemId }) => {
  const [formData, setFormData] = useState({
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
    price: "",
    img: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fetch current item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `https://phone-api-portfolio.onrender.com/api/${itemType}/${itemId}`
        );
        const data = await response.json();
        setFormData({
          ...data,
          img: data.img || "",
        });

        setPreview(`https://phone-api-portfolio.onrender.com/${data.img}`);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [itemType, itemId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview of new image
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (image) formDataToSend.append("image", image); // Append new image if selected

    try {
      const response = await fetch(
        `https://phone-api-portfolio.onrender.com/api/phones/${itemId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item. Please check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        type="text"
        name="company"
        value={formData.company || ""}
        onChange={handleChange}
        placeholder="Company"
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="released"
        placeholder="Release Date"
        value={formData.released}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="memory"
        placeholder="Memory"
        value={formData.memory}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="os"
        placeholder="OS"
        value={formData.os}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="display"
        placeholder="Display Size"
        value={formData.display}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="resolution"
        placeholder="Resolution"
        value={formData.resolution}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="camera"
        placeholder="Camera"
        value={formData.camera}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="photoandvideo"
        placeholder="Photo & Video"
        value={formData.photoandvideo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="ram"
        placeholder="RAM"
        value={formData.ram}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="chipset"
        placeholder="Chipset"
        value={formData.chipset}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="battery"
        placeholder="Battery"
        value={formData.battery}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="charging"
        placeholder="Charging Speed"
        value={formData.charging}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="watt"
        placeholder="Watt"
        value={formData.watt}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      {preview && <img src={preview} alt="Preview" width="100" />}

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Update {itemType}</button>
    </form>
  );
};

export default UpdateItemForm;
