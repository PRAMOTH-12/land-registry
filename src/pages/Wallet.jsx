import React, { useState } from 'react';
import axios from 'axios';

const Wallet = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example wallet data
      const senderWallet = {
        address: "your-wallet-address",
        privateKey: "your-private-key"
      };

      await axios.post('http://localhost:5000/api/transaction', {
        senderWallet,
        recipient,
        amount: parseFloat(amount)
      });

      alert('Transaction created successfully!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleMine = async () => {
    try {
      await axios.get('http://localhost:5000/api/mine');
      alert('Block mined successfully!');
    } catch (error) {
      console.error('Error mining block:', error);
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Send Transaction</button>
      </form>
      <br />
      <button onClick={handleMine}>Mine Transactions</button>
    </div>
  );
};

export default Wallet;
