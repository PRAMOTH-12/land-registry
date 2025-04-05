// Blockchain.jsx
import React, { useEffect, useState } from 'react';
import { fetchBlocks } from '../api/blockchain';
import { decryptData } from "../utils/encryption";  // Import the decryptData function
import { Link } from 'react-router-dom';

function Blockchain() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBlockchain() {
      try {
        const data = await fetchBlocks();  // Fetch blockchain data (encrypted data)
        setBlocks(data.chain || data);
      } catch (error) {
        console.error('Error fetching blockchain:', error);
      }
    }
    fetchBlockchain();
  }, []);

  // Secret Key for decryption
  const secretKey = 'my-strong-secret-key';  // The same key used for encryption

  return (
    <div>
      <h2>Blockchain View</h2>
      <Link to="/add-property"><button>Add New Property</button></Link>
      {blocks.map((block, index) => {
        // Decrypt the data using the secret key
        const decryptedData = decryptData(block.encryptedData, secretKey);  // Decrypt the data

        return (
          <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <p><strong>Index:</strong> {block.index}</p>
            <p><strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}</p>
            <p><strong>Data:</strong> {JSON.stringify(decryptedData)}</p>  {/* Display Decrypted Data */}
            <p><strong>Previous Hash:</strong> {block.previousHash}</p>
            <p><strong>Hash:</strong> {block.hash}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Blockchain;
