import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlock } from "../api/blockchain";
import { encryptData } from "../utils/encryption"; // Your encryption logic
import "./Addproperty.css"; // Importing the CSS

function AddProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    owner: "",
    propertyId: "",
    area: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const secretKey = "your-secret-key"; // Replace with env-secured key in production
    const encryptedData = encryptData(formData, secretKey);

    try {
      await addBlock({ encryptedData });
      alert("Property added to blockchain!");
      navigate("/blockchain");
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="propertyId"
          placeholder="Property ID"
          value={formData.propertyId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Area (sqft)"
          value={formData.area}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
