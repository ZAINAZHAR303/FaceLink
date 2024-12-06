// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi6NMfOGCimKBU_StWjNLI8IHvHj6AQag",
  authDomain: "facelink-77c7d.firebaseapp.com",
  projectId: "facelink-77c7d",
  storageBucket: "facelink-77c7d.firebasestorage.app",
  messagingSenderId: "201026193953",
  appId: "1:201026193953:web:40735eca5c944bbf6ab160",
  measurementId: "G-20EP3WVKM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);