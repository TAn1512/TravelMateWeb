// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsviiA5nNBW1S3vDuzDOCNGnDcosHWm1w",
  authDomain: "annt-project.firebaseapp.com",
  projectId: "annt-project",
  storageBucket: "annt-project.appspot.com",
  messagingSenderId: "1084892560444",
  appId: "1:1084892560444:web:20103a7535124778a85739",
  measurementId: "G-78P50H9Z6T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
