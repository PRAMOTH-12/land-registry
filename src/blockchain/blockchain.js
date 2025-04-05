// src/utils/blockchain.js

import sha256 from "crypto-js/sha256";

class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
  }
}

// Corrected hash calculation (matching your old logic)
const calculateHash = (index, previousHash, timestamp, data) => {
  return sha256(index + timestamp + JSON.stringify(data) + previousHash).toString();
};

// Genesis block creation
const createGenesisBlock = () => {
  const data = {
    owner: "Genesis Owner",
    propertyId: "0",
    area: "0 sqft",
    location: "Genesis Land",
  };
  const timestamp = new Date().toISOString(); // Better readable timestamp
  const hash = calculateHash(0, "0", timestamp, data);
  return new Block(0, "0", timestamp, data, hash);
};

// Create new block
const createNewBlock = (previousBlock, data, chain) => {
  if (!previousBlock || !chain) {
    console.error("Previous block or chain is missing!");
    return null;
  }

  // Duplicate check
  const isDuplicate = chain.some(block => {
    const { owner, propertyId, area, location } = block.data || {};
    return (
      owner === data.owner &&
      propertyId === data.propertyId &&
      area === data.area &&
      location === data.location
    );
  });

  if (isDuplicate) {
    console.warn("❌ Duplicate block detected. Skipping addition.");
    return null;
  }

  const index = previousBlock.index + 1;
  const timestamp = new Date().toISOString(); // Again using ISO time for readability
  const hash = calculateHash(index, previousBlock.hash, timestamp, data);

  return new Block(index, previousBlock.hash, timestamp, data, hash);
};

export { Block, calculateHash, createGenesisBlock, createNewBlock };
