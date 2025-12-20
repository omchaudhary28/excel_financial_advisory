import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName =
    user?.name || (user?.email ? user.email.split("@")[0] : "");
  const avatarLetter = displayName ? displayName[0].toUpperCase() : "?";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <img src="/excel_financial.png" alt="Excel" className="h-14" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/rating">Rating</Link>

          {user && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/query">Raise Query</Link>

              {/* 🔐 ADMIN NAV LINK */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="font-bold text-primary"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 font-medium"
              >
                Logout
              </button>

              <ThemeToggle />
            </>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-primary rounded-full">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
