import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyACygenHztGKwhs21Sal47_dQbKXIJJATI",
    authDomain: "fir-project-adf35.firebaseapp.com",
    projectId: "fir-project-adf35",
    storageBucket: "fir-project-adf35.appspot.com",
    messagingSenderId: "137409242476",
    appId: "1:137409242476:web:db5ff7518ea5a80a8c3f49",
    measurementId: "G-EMPEYQYNHV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
