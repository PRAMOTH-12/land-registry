import React, { useEffect, useState } from 'react';
import { fetchBlocks } from '../api/blockchain';  // Correct import

function BlockchainView() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBlockchain() {
      try {
        const data = await fetchBlocks();   // ✅ correct function
        setBlocks(data.chain || data); // handle both { chain: [] } or [] formats
      } catch (error) {
        console.error('Error fetching blockchain:', error);
      }
    }

    fetchBlockchain();
  }, []);

  return (
    <div>
      <h2>Blockchain View</h2>
      {blocks.map((block, index) => (
        <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <p><strong>Index:</strong> {block.index}</p>
          <p><strong>Timestamp:</strong> {block.timestamp}</p>
          <p><strong>Data:</strong> {JSON.stringify(block.data)}</p>
          <p><strong>Previous Hash:</strong> {block.previous_hash || block.previousHash}</p>
          <p><strong>Hash:</strong> {block.hash}</p>
        </div>
      ))}
    </div>
  );
}

export default BlockchainView;
