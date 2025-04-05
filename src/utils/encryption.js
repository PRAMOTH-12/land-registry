import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key';  // Use the same secret key for both encryption and decryption

// Encryption function
export const encryptData = (data) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // Generate random salt
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey + salt.toString()).toString();
  return { encryptedData: encrypted, salt: salt.toString() };
};

// Decryption function
export const decryptData = (encryptedData, salt) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey + salt);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
