import React, { useState} from "react";
import api from "../services/api";
import { useNavigate} from "react-router-dom";

const LoginPage=()=>{
    const navigate =useNavigate();

    const [form,setForm]=useState({
        email:"",
        password:""
    });

    const [error,setError]=useState("");
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });           
    }  
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");

        try{
            const response= await api.post("/auth/login",form);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/profile");
        } catch(err){
            console.error(err);
            setError("Email veya şifre hatalı");
        }
    };

    return(
        <div style={{maxWidth: 400, margin: "2rem auto"}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginTop:10}}>
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button style={{ marginTop: 15}} type="submit">
                    Login
                </button>
            </form>
            {error && <p style={{ color:"red", marginTop: 10}}>{error}</p>}
        </div>
    );
};

export default LoginPage;