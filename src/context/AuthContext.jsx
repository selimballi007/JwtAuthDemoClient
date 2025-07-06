import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = () => {    
        const token = localStorage.getItem("token");    
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.sub,
                    username: decoded.username,
                    role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? decoded.role ?? "",
                    isEmailConfirmed: decoded.isEmailConfirmed === "true",
                    token:token
                });
            } catch (err) {
                setUser(null);
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);