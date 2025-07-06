import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const {login} = useAuth();

    const validate = () => {
        const newErrors = {};

        if (!form.email.includes("@")) {
            newErrors.email = "Enter a valid email";
        }

        if (form.password.length < 6) {
            newErrors.password = "The password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await api.post("/auth/login", form);
            localStorage.setItem("token", response.data.token);
            login();
            navigate("/profile");            
        } catch (err) {
            setErrors({ api: err.response });
        }
    };

    const handleResendVerification = async () => {
        try {
            await api.get(`/auth/resend-verification?email=${encodeURIComponent(form.email)}`); // login input’tan gelen email
            toast.success("Verification email was sent.");
        } catch (err) {
            toast.error(err.response?.data || "Verification email delivery failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Login
                    </button>

                    {errors.api && (
                        <p className="text-red-600 text-sm mt-2 text-center">{errors.api}</p>
                    )}

                    {errors.api === "Please verify your email address first." && (
                        <div className="flex items-start gap-3 mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-md">
                            <svg
                                className="w-5 h-5 mt-1 text-yellow-500 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                                />
                            </svg>
                            <div className="text-sm text-yellow-800">
                                <p className="font-medium mb-1">You need to verify your email address.</p>
                                <button
                                    type="button"
                                    onClick={handleResendVerification}
                                    className="text-blue-600 underline hover:text-blue-800 transition"
                                >
                                    Resend verification email
                                </button>
                            </div>
                        </div>
                    )}
                    <p className="text-sm text-center mt-4">
                        <a href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot your password
                        </a>
                    </p>
                </form>
                <p className="text-sm text-gray-500 mt-6 text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
