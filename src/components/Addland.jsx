import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper Functions
function createNewBlock(previousBlock, newData, chain) {
  const isDuplicate = chain.some(block =>
    block.data.location === newData.location &&
    block.data.size === newData.size &&
    block.data.price === newData.price
  );

  if (isDuplicate) {
    return null; // Duplicate land found
  }

  const newBlock = {
    index: previousBlock ? previousBlock.index + 1 : 0,
    timestamp: Date.now(),
    data: newData,
    previousHash: previousBlock ? previousBlock.hash : '0',
    hash: generateHash(newData, previousBlock ? previousBlock.hash : '0')
  };

  return newBlock;
}

function generateHash(data, previousHash) {
  return btoa(JSON.stringify(data) + previousHash + Date.now());
}

const AddLand = () => {
  const navigate = useNavigate();
  const [landDetails, setLandDetails] = useState({
    location: '',
    size: '',
    price: '',
  });
  const [userId, setUserId] = useState('');
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('You must login first.');
      navigate('/login');
    } else {
      setUserId(storedUserId);
    }

    const existingChain = JSON.parse(localStorage.getItem('blockchain')) || [];
    setChain(existingChain);
  }, [navigate]);

  const handleChange = (e) => {
    setLandDetails({
      ...landDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...landDetails,
      userId,
      landId: `LAND_${Date.now()}`
    };

    const previousBlock = chain.length > 0 ? chain[chain.length - 1] : null;

    const newBlock = createNewBlock(previousBlock, newData, chain);

    if (newBlock) {
      const updatedChain = [...chain, newBlock];
      setChain(updatedChain);

      // 👉 Save the updated chain to localStorage
      localStorage.setItem('blockchain', JSON.stringify(updatedChain));

      alert('✅ Land Registered Successfully!');
      navigate('/lands');
    } else {
      alert('❌ Duplicate Land Entry! Please provide unique property details.');
    }
  };

  return (
    <div className="add-land-container">
      <h2 className="add-land-title">Register New Land</h2>
      <form onSubmit={handleSubmit} className="add-land-form">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={landDetails.location}
          onChange={handleChange}
          required
          className="add-land-input"
        />
        <input
          type="text"
          name="size"
          placeholder="Size (e.g., 1000 sqft)"
          value={landDetails.size}
          onChange={handleChange}
          required
          className="add-land-input"
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g., 5,00,000)"
          value={landDetails.price}
          onChange={handleChange}
          required
          className="add-land-input"
        />
        <button
          type="submit"
          className="add-land-button"
        >
          Register Land
        </button>
      </form>
    </div>
  );
};

export default AddLand;
