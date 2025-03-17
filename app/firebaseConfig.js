
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC0QYvUvSdu06_8qjbERtTY03D0CvqRVU4",
    authDomain: "financetracker-a68e8.firebaseapp.com",
    projectId: "financetracker-a68e8",
    storageBucket: "financetracker-a68e8.appspot.com",
    messagingSenderId: "1010540093690",
    appId: "1:1010540093690:web:a7acc5868e34ffbf57e943",
    measurementId: "G-55F8M7YY8F", // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }; 