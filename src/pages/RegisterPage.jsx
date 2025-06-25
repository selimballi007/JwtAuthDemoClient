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

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await api.post("/auth/register", form);
            alert("Registration is succesful. Please Login");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Registration failed. The recording may have been used before");
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: 10 }}>
                    <label>Username:</label>
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button style={{ marginTop: 15 }} type="submit">Submit</button>
            </form >
            {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
        </div>
    );
};

export default RegisterPage;