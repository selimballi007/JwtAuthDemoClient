import React, { useState } from "react";
import api from "../services/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.post("/auth/forgot-password", { email });
      setStatus("reset-link-sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registered Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
          >
            Send Password Reset Link
          </button>
        </form>

        {status === "reset-link-sent" && (
          <p className="text-green-600 text-sm mt-4 text-center">
            Email has been sent! Please check your inbox.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm mt-4 text-center">
            An error occurred. Is the email correct?
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
