import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBPpVFD53JUPk5kGqyFmoNkHiCmDfyodM",
  authDomain: "prepwise-5da7c.firebaseapp.com",
  projectId: "prepwise-5da7c",
  storageBucket: "prepwise-5da7c.firebasestorage.app",
  messagingSenderId: "629820107972",
  appId: "1:629820107972:web:2e768087d717e4e7c7ed91",
  measurementId: "G-3MGE7BRG0Z",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
