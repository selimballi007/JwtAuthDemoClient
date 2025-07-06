import { useNavigate }from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const LogoutButton = () => {
    const navigate = useNavigate();
    const {logout}=useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <button
            onClick={handleLogout}
            style={{
                marginTop: 20,
                background: "#e63946",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: 5,
                cursor: "pointer"
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;