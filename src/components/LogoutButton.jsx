import { useNavigate }from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
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