import React, { useState } from 'react';
import { createTransaction } from '../api/blockchain';

function TransactionForm() {
  const [transaction, setTransaction] = useState({
    fromAddress: '',
    toAddress: '',
    amount: ''
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(transaction);
      alert('Transaction submitted successfully!');
      setTransaction({ fromAddress: '', toAddress: '', amount: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting transaction:', error);
      alert('Failed to submit transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Transaction</h2>
      <input
        name="fromAddress"
        placeholder="From Address"
        value={transaction.fromAddress}
        onChange={handleChange}
        required
      />
      <input
        name="toAddress"
        placeholder="To Address"
        value={transaction.toAddress}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={transaction.amount}
        onChange={handleChange}
        required
      />
      <button type="submit">Send Transaction</button>
    </form>
  );
}

export default TransactionForm;
