import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "underline font-semibold" : "hover:underline"
        }>
          MyApp
        </NavLink>
        <div className="space-x-4">
          {token ? (
            <>
              <NavLink to="/profile" className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
