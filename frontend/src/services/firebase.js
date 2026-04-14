// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCna8VXejmiJhFTy7CWB2TI4xeDHxZYEII",
  authDomain: "task-manager-eb24d.firebaseapp.com",
  projectId: "task-manager-eb24d",
  storageBucket: "task-manager-eb24d.firebasestorage.app",
  messagingSenderId: "465649142423",
  appId: "1:465649142423:web:3b8925badedc960f4ef7d2",
  measurementId: "G-TKLBL6P3Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);