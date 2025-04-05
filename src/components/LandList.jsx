import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandList = () => {
  const [lands, setLands] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('You must login first.');
      navigate('/login');
    } else {
      setUserId(storedUserId);
      loadLands(storedUserId);
    }
  }, [navigate]);

  const loadLands = (id) => {
    const allLands = JSON.parse(localStorage.getItem('lands')) || [];
    const userLands = allLands.filter(land => land.userId === id);
    setLands(userLands);
  };

  return (
    <div className="landlist-container">
      <h2 className="landlist-title">Your Registered Lands</h2>
      {lands.length === 0 ? (
        <p className="landlist-empty">No lands registered yet.</p>
      ) : (
        <div className="landlist-grid">
          {lands.map((land) => (
            <div key={land.landId} className="land-card">
              <h3 className="land-card-title">📍 {land.location}</h3>
              <p className="land-card-text">Size: {land.size}</p>
              <p className="land-card-text">Price: ₹{land.price}</p>
              <p className="land-card-id">Land ID: {land.landId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandList;
