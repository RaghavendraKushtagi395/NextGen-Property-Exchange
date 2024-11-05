// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nextgen-property-exchange.firebaseapp.com",
  projectId: "nextgen-property-exchange",
  storageBucket: "nextgen-property-exchange.firebasestorage.app",
  messagingSenderId: "1012799452013",
  appId: "1:1012799452013:web:7d50f7baa952f15cbfe064"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);