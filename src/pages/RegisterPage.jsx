import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!form.email.includes("@")) {
            newErrors.email = "Enter a valid email.";
        }

        if (!form.username.trim()) {
            newErrors.username = "The username cannot be empty.";
        }

        if (form.password.length < 6) {
            newErrors.password = "The password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Instant Error Clearing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await api.post("/auth/register", form);
            alert("Registration successful! Please confirm your account.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setErrors({ api: "Registration unsuccesful. Email may already be in use." });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
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
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.username && (
                            <p className="text-sm text-red-600 mt-1">{errors.username}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Şifre</label>
                        <input
                            type="password"
                            name="password"
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Register
                    </button>

                    {errors.api && (
                        <p className="text-red-600 text-sm mt-3 text-center">{errors.api}</p>
                    )}
                </form>
                <p className="text-sm text-gray-500 mt-6 text-center">
                    Do you already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
