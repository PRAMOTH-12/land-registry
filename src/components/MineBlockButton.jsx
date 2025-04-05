import React from 'react';
import { mineBlock } from '../api/blockchain';

function MineBlockButton() {
  const handleMine = async () => {
    try {
      await mineBlock();
      alert('New block mined successfully!');
    } catch (error) {
      console.error('Error mining block:', error);
      alert('Failed to mine block.');
    }
  };

  return (
    <button onClick={handleMine}>
      ⛏️ Mine New Block
    </button>
  );
}

export default MineBlockButton;
