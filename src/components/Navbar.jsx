import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? "block text-white underline font-semibold"
      : "block text-white hover:underline";

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold">
          MyApp
        </NavLink>

        {/* Masaüstü Menüsü */}
        <div className="hidden md:flex space-x-4">
          {token ? (
            <>
              <NavLink to="/profile" className={linkClasses}>
                Profile
              </NavLink>
              <button onClick={handleLogout} className="hover:underline text-red-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClasses}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Hamburger Buton (Mobil) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              // Çarpı (X) ikonu
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger ikonu
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil Menü */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 space-y-2">
          {token ? (
            <>
              <NavLink to="/profile" className={linkClasses} onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-200 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClasses} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClasses} onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
