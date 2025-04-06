import React, { useEffect, useState } from 'react';
import { fetchBlocks } from '../api/blockchain';
import { decryptData } from '../utils/encryption';
import { Link } from 'react-router-dom';
import './Blockchain.css'; // Import your CSS styles

function Blockchain() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBlockchain() {
      try {
        const data = await fetchBlocks();
        setBlocks(data.chain || data); // Fallback for array or { chain: [...] }
      } catch (error) {
        console.error('Error fetching blockchain:', error);
      }
    }
    fetchBlockchain();
  }, []);

  const secretKey = 'my-strong-secret-key';

  return (
    <div className="blockchain-container">
      <div className="blockchain-header">
        <h2>Blockchain View</h2>
        <Link to="/add-property">
          <button className="add-btn">Add New Property</button>
        </Link>
      </div>

      {blocks.map((block, index) => {
        const encrypted = block.encryptedData || block.data?.encryptedData || '';
        const decryptedData = decryptData(encrypted, secretKey);

        return (
          <div key={index} className="block-card">
            <p><strong>Index:</strong> {block.index ?? 'N/A'}</p>
            <p><strong>Timestamp:</strong> {block.timestamp ? new Date(block.timestamp).toLocaleString() : 'N/A'}</p>
            <p><strong>Data:</strong> {decryptedData ? JSON.stringify(decryptedData) : 'N/A'}</p>
            <p><strong>Previous Hash:</strong> {block.previousHash ?? block.previous_hash ?? 'N/A'}</p>
            <p><strong>Hash:</strong> {block.hash ?? block.block_hash ?? 'N/A'}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Blockchain;
