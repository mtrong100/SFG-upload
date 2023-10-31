import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzbPlxvdL0zBNH03YvsQ609RtHZtX8eS0",
  authDomain: "sfg-upload.firebaseapp.com",
  projectId: "sfg-upload",
  storageBucket: "sfg-upload.appspot.com",
  messagingSenderId: "432329296734",
  appId: "1:432329296734:web:60a97184bef9ad8e5b5dcf",
  measurementId: "G-DJ0Z8FCWJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
