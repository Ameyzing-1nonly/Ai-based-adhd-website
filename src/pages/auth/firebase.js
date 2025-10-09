// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSFHjdMcYuCtQs779QVJStzx3kred_T4",
  authDomain: "ai-adhd-project.firebaseapp.com",
  projectId: "ai-adhd-project",
  storageBucket: "ai-adhd-project.firebasestorage.app",
  messagingSenderId: "484148252717",
  appId: "1:484148252717:web:c148a4f1918146867268a4",
  measurementId: "G-G095YL4RL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app,auth };