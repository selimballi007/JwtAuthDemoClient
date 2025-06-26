import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

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
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/profile");
        } catch (err) {
            console.error(err);
            setErrors({ api: "Email or password is incorrect." });
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
                    <p className="text-sm text-center mt-4">
                        <a href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot your password
                        </a>
                    </p>

                    {errors.api && (
                        <p className="text-red-600 text-sm mt-2 text-center">{errors.api}</p>
                    )}
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
