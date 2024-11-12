// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nextgen-auth-609eb.firebaseapp.com",
  projectId: "nextgen-auth-609eb",
  storageBucket: "nextgen-auth-609eb.firebasestorage.app",
  messagingSenderId: "769746946279",
  appId: "1:769746946279:web:1ef6c34410b8453487ba42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);