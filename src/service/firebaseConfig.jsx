// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxL0yNqJ-JJtmAVqQRWqTCbYjiq7nXmd4",
  authDomain: "aitripplanner-2a6f1.firebaseapp.com",
  projectId: "aitripplanner-2a6f1",
  storageBucket: "aitripplanner-2a6f1.firebasestorage.app",
  messagingSenderId: "391505074121",
  appId: "1:391505074121:web:0b96fdbc03f75b23b3ba18",
  measurementId: "G-5LVQ5J0CY7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);