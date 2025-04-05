// AddProperty.jsx
import React, { useState } from "react";
import { addBlock } from "../api/blockchain";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../utils/encryption";  // Import encryption function

function AddProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    owner: "",
    propertyId: "",
    area: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define a secret key for encryption (it can be stored securely in environment variables)
    const secretKey = "your-secret-key";  // Make sure to keep this secret

    // Encrypt the form data before adding it to the blockchain
    const encryptedData = encryptData(formData, secretKey);

    try {
      // Send the encrypted data to the blockchain
      await addBlock({ encryptedData });
      alert("Property added to blockchain!");
      navigate("/blockchain");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div>
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
        <br />
        <input
          type="text"
          name="propertyId"
          placeholder="Property ID"
          value={formData.propertyId}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="area"
          placeholder="Area (sqft)"
          value={formData.area}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
