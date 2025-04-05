// src/api/blockchain.js

// Dummy Blockchain Array
let blockchain = [];

// Dummy Transactions Array
let transactions = [];

// Fetch all blocks
export const fetchBlocks = () => {
  return blockchain;
};

// Add a new block
export const addBlock = (data) => {
  const newBlock = {
    id: blockchain.length + 1,
    timestamp: new Date().toISOString(),
    data: data,
  };
  blockchain.push(newBlock);
  return newBlock;
};

// 🆕 Mine a new block (simulate mining)
export const mineBlock = () => {
  const newBlock = {
    id: blockchain.length + 1,
    timestamp: new Date().toISOString(),
    data: "Mined Block",
    transactions: [...transactions], // Attach pending transactions
  };
  blockchain.push(newBlock);
  transactions = []; // Clear pending transactions after mining
  console.log("Block mined successfully 🚀", newBlock);
  return newBlock;
};

// 🆕 Create a new transaction (simulate transaction creation)
export const createTransaction = (from, to, amount) => {
  const transaction = {
    from,
    to,
    amount,
    timestamp: new Date().toISOString(),
  };
  transactions.push(transaction);
  console.log("Transaction created 📄", transaction);
  return transaction;
};
