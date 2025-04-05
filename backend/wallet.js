const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Function to generate a new wallet (key pair)
function generateWallet() {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    return {
        publicKey,
        privateKey
    };
}

// Function to sign a transaction
function signTransaction(transaction, privateKey) {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const hashTx = transaction.calculateHash();
    const signature = key.sign(hashTx, 'base64');
    transaction.signature = signature.toDER('hex');
}

module.exports = { generateWallet, signTransaction };
