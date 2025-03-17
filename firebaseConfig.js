// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0QYvUvSdu06_8qjbERtTY03D0CvqRVU4",
    authDomain: "financetracker-a68e8.firebaseapp.com",
    projectId: "financetracker-a68e8",
    storageBucket: "financetracker-a68e8.firebasestorage.app",
    messagingSenderId: "1010540093690",
    appId: "1:1010540093690:web:a7acc5868e34ffbf57e943",
    measurementId: "G-55F8M7YY8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);