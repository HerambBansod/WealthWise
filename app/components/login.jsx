import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0QYvUvSdu06_8qjbERtTY03D0CvqRVU4",
    authDomain: "financetracker-a68e8.firebaseapp.com",
    projectId: "financetracker-a68e8",
    storageBucket: "financetracker-a68e8.firebasestorage.app",
    messagingSenderId: "1010540093690",
    appId: "1:1010540093690:web:a7acc5868e34ffbf57e943",
    measurementId: "G-55F8M7YY8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [error, setError] = useState("");
    const router = useRouter(); // Initialize the router

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isLogin) {
                // Login user
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged in successfully!");
                router.push("/dashboard");

            } else {
                // Signup user
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created successfully!");
                setIsLogin(true);  
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Login/Signup Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                {/* Toggle between Login and Signup */}
                <p className="text-center mt-4">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </main>
    );
}