import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <img src="/excel_financial.png" alt="Excel" className="h-14" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/rating">Rating</Link>

          {user && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/query">Raise Query</Link>

              {user.role === "admin" && (
                <Link to="/admin" className="font-bold text-primary">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-primary rounded-full">
                Register
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button onClick={toggleMenu} className="ml-4">
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/rating" className="block px-3 py-2 rounded-md text-base font-medium">Rating</Link>

            {user && (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <Link to="/query" className="block px-3 py-2 rounded-md text-base font-medium">Raise Query</Link>

                {user.role === "admin" && (
                  <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-primary">Admin</Link>
                )}
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="px-5">
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 space-y-2">
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" className="block btn-primary rounded-full px-3 py-2 text-base font-medium">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
