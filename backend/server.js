const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const Transaction = require('./transaction');
const { generateWallet, signTransaction } = require('./wallet');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const blockchain = new Blockchain();

// Endpoint: Get entire blockchain
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
});

// Endpoint: Create a new transaction
app.post('/api/transaction', (req, res) => {
    const { senderPrivateKey, recipientAddress, amount } = req.body;

    // Create a transaction manually
    const transaction = new Transaction(
        senderPrivateKey, // fromAddress (we use public key normally, but assuming private key for simplicity)
        recipientAddress,
        amount
    );

    // Sign the transaction
    signTransaction(transaction, senderPrivateKey);

    // Add the transaction to blockchain
    blockchain.addTransaction(transaction);

    res.json({ message: 'Transaction added successfully.' });
});

// Endpoint: Mine pending transactions
app.get('/api/mine', (req, res) => {
    const { minerAddress } = req.query; // pass miner address as query param

    if (!minerAddress) {
        return res.status(400).json({ error: 'Miner address is required' });
    }

    blockchain.minePendingTransactions(minerAddress);
    res.json({ message: 'New Block mined successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Blockchain server running at http://localhost:${PORT}`);
});
