// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAOqFiam_G_Couz47Z5K79ugakyAfQs4r0",
    authDomain: "land-registry-c40b5.firebaseapp.com",
    projectId: "land-registry-c40b5",
    storageBucket: "land-registry-c40b5.firebasestorage.app",
    messagingSenderId: "320698497791",
    appId: "1:320698497791:web:8220324d1edbb4d4816aca"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
