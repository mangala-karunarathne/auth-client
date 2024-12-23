// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c077d.firebaseapp.com",
  projectId: "mern-auth-c077d",
  storageBucket: "mern-auth-c077d.firebasestorage.app",
  messagingSenderId: "271998295023",
  appId: "1:271998295023:web:90f50da03f46ab0204b41a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);