import React,{useState,useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";


const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Invalid connection");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setError("The password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await api.post("/auth/reset-password", {
                token,
                newPassword: password
            });
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000)
        } catch (err) {
            console.log(err);
            setError("The token is invalid or expired.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Şifreyi Sıfırla</h2>

                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                {success ? (
                    <p className="text-green-600 text-center">
                        Your password has been successfully reset. You're redirected to the login page...
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password (Again)</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Update Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;