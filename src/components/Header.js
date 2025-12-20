import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white dark:bg-[#0F172A]
        border-b border-gray-200 dark:border-gray-800
        shadow-sm dark:shadow-lg
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/excel_financial.png"
            alt="Excel Financial Advisory"
            className="h-8"
          />
        </Link>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium transition"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium transition"
          >
            Contact
          </Link>

          <Link
            to="/rating"
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium transition"
          >
            Rating
          </Link>

          {user && (
            <Link
              to="/profile"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium transition"
            >
              Profile
            </Link>
          )}

          {user && (
            <Link
              to="/raise-query"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium transition"
            >
              Raise Query
            </Link>
          )}

          {/* ADMIN LINK — ONLY FOR ADMINS */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="
                px-4 py-2 rounded-lg font-semibold
                bg-primary dark:bg-primary-dark
                text-white
                hover:bg-primary-light dark:hover:bg-primary
                transition
              "
            >
              Admin
            </Link>
          )}

          {/* LOGOUT */}
          {user && (
            <button
              onClick={handleLogout}
              className="
                text-danger font-semibold
                hover:text-danger-light
                transition
              "
            >
              Logout
            </button>
          )}

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-full
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              transition
            "
            title="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
