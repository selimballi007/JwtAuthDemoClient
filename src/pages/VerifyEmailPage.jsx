import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Invalid confirmation link.");
                return;
            }

            try {
                const res = await api.get(`/auth/verify-email?token=${token}`);
                console.log(token);
                setStatus("success");
                setMessage(res.data || "Email successfully confirmed.");
                setTimeout(() => navigate("/login"), 3000);
            } catch (err) {
                console.error("Verification error:", err);

                let errorMessage = "Validation failed. The connection may have expired.";

                if (err?.response?.data) {
                    if (typeof err.response.data === "string") {
                        errorMessage = err.response.data;
                    } else if (typeof err.response.data.message === "string") {
                        errorMessage = err.response.data.message;
                    }
                } else if (err?.message) {
                    errorMessage = err.message;
                }

                setStatus("error");
                setMessage(errorMessage);
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" >
            <div className="bg-white shadow p-6 rounded max-w-md w-full text-center" >
                {status === "loading" && <p>Verification is underway...</p>
                }

                {
                    status === "success" && (
                        <div>
                            <h2 className="text-green-600 text-xl font-bold mb-2" > Success ✅</h2>
                            < p > {message} </p>
                            < p className="text-sm text-gray-500 mt-2" > You are redirected to the login page...</p>
                        </div>
                    )
                }

                {
                    status === "error" && (
                        <div>
                            <h2 className="text-red-600 text-xl font-bold mb-2" > Error ❌</h2>
                            < p > {message} </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default VerifyEmailPage;