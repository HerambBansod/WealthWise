"use client";
import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // Import your Firebase app instance

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

const Dashboard = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expense");
    const [incomeInput, setIncomeInput] = useState("");
    const [initialIncome, setInitialIncome] = useState(0);
    const [budgetGoal, setBudgetGoal] = useState(0);
    const [goalInput, setGoalInput] = useState("");
    const [user, setUser] = useState(null); // Firebase user state

    // Initialize Firebase Auth
    const auth = getAuth(app);

    // Fetch the logged-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Set the user state
            } else {
                setUser(null); // No user is logged in
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

    // Calculate totals whenever transactions or initial income change
    useEffect(() => {
        const calculateTotal = () => {
            let income = initialIncome;
            let expenses = 0;

            transactions.forEach((transaction) => {
                if (transaction.type === "income") {
                    income += transaction.amount;
                } else {
                    expenses += transaction.amount;
                }
            });

            setTotalIncome(income);
            setTotalExpenses(expenses);
            setTotalSavings(income - expenses);
        };

        calculateTotal();
    }, [transactions, initialIncome]);

    // Set initial income
    const setInitialIncomeHandler = () => {
        if (incomeInput && !isNaN(incomeInput)) {
            setInitialIncome(parseFloat(incomeInput));
            setTotalIncome(parseFloat(incomeInput));
            setIncomeInput("");
        }
    };

    // Add a new transaction
    const addTransaction = () => {
        if (!newDescription || !newAmount || isNaN(newAmount)) return;

        const amount = parseFloat(newAmount);
        const newTransaction = {
            id: transactions.length + 1,
            description: newDescription,
            amount,
            type: transactionType,
            date: new Date().toLocaleDateString(),
        };
        setTransactions([...transactions, newTransaction]);
        setNewDescription("");
        setNewAmount("");
    };

    // Set budget goal
    const setBudgetGoalHandler = () => {
        if (goalInput && !isNaN(goalInput)) {
            setBudgetGoal(parseFloat(goalInput));
            setGoalInput("");
        }
    };

    // Data for the pie chart (income vs expenses)
    const pieChartData = {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                data: [totalIncome, totalExpenses],
                backgroundColor: ["#4CAF50", "#FF6384"],
                hoverBackgroundColor: ["#66BB6A", "#FF8282"],
            },
        ],
    };

    // Data for the line chart (savings over time)
    const lineChartData = {
        labels: transactions.map((t) => t.date),
        datasets: [
            {
                label: "Savings Over Time",
                data: transactions.map((t) =>
                    t.type === "income" ? totalSavings + t.amount : totalSavings - t.amount
                ),
                borderColor: "#36A2EB",
                fill: false,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Dashboard Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                    Welcome, {user ? user.displayName || user.email : "Guest"}!
                </h1>
                <p className="text-gray-600">Your financial overview</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Income</h2>
                    <p className="text-2xl text-green-600">${totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Expenses</h2>
                    <p className="text-2xl text-red-600">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total Savings</h2>
                    <p className="text-2xl text-blue-600">${totalSavings.toFixed(2)}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Income vs Expenses</h3>
                    <Pie data={pieChartData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Savings Over Time</h3>
                    <Line data={lineChartData} />
                </div>
            </div>

            {/* Budget Goal Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">Set Your Budget Goal</h3>
                <div className="flex gap-4">
                    <input
                        type="number"
                        placeholder="Enter your budget goal"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                        onClick={setBudgetGoalHandler}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Set Goal
                    </button>
                </div>
                {budgetGoal > 0 && (
                    <p className="mt-4 text-gray-700">
                        Your budget goal: ${budgetGoal.toFixed(2)} | Remaining: $
                        {(budgetGoal - totalExpenses).toFixed(2)}
                    </p>
                )}
            </div>

            {/* Transaction History Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Description</th>
                            <th className="p-2 text-left">Amount</th>
                            <th className="p-2 text-left">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                                <td className="p-2">{transaction.date}</td>
                                <td className="p-2">{transaction.description}</td>
                                <td className="p-2">${transaction.amount.toFixed(2)}</td>
                                <td className="p-2">{transaction.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Transaction Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                    />
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <button
                        onClick={addTransaction}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Add Transaction
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;