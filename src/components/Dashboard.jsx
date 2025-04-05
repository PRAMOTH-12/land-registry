import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('Session expired. Please login again.');
      navigate('/login', { replace: true });
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert('Logged out successfully.');
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-userid">
          Welcome! Your User ID:
          <br />
          <span className="dashboard-userid-highlight">{userId}</span>
        </p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
