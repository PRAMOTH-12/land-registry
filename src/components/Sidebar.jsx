import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLandmark, FaWallet, FaCubes, FaPlusCircle, FaUserShield } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🌟 Dashboard</h2>
      <ul>
        <li><Link to="/dashboard"><FaHome /> Home</Link></li>
        <li><Link to="/add-land"><FaPlusCircle /> Add Land</Link></li>
        <li><Link to="/lands"><FaLandmark /> Land List</Link></li>
        <li><Link to="/blockchain"><FaCubes /> Blockchain View</Link></li>
        <li><Link to="/send-transaction"><FaCubes /> Send Transaction</Link></li>
        <li><Link to="/mine-block"><FaCubes /> Mine Block</Link></li>
        <li><Link to="/wallet"><FaWallet /> Wallet</Link></li>
        <li><Link to="/blockchain-explorer"><FaCubes /> Blockchain Explorer</Link></li>
        <li><Link to="/add-property"><FaPlusCircle /> Add Property</Link></li>
        <li><Link to="/login"><FaUserShield /> Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
