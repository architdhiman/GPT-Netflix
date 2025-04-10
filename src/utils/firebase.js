// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy41WSMnEVgrrCqVpiHXQp1fHvShl47t4",
  authDomain: "netflix-gpt-7fc05.firebaseapp.com",
  projectId: "netflix-gpt-7fc05",
  storageBucket: "netflix-gpt-7fc05.firebasestorage.app",
  messagingSenderId: "232600363209",
  appId: "1:232600363209:web:fc64955322922ece2f2d18",
  measurementId: "G-1GW7KX4ERF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()