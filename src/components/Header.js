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

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background-dark shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/excel_financial.png"
            alt="Excel Financial Advisory"
            className="h-12 dark:invert"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-text dark:text-text-inverted font-medium">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About Us</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <Link to="/rating" className="hover:text-primary">Rating</Link>

          {user && (
            <>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
              <Link to="/query" className="hover:text-primary">Raise Query</Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded-lg bg-primary text-text-inverted font-semibold"
                >
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4 text-text dark:text-text-inverted">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-danger font-semibold hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="btn-primary rounded-full">
                Register
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-text dark:text-text-inverted"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background-dark border-t border-accent dark:border-accent-dark">
          <div className="px-4 py-4 space-y-2 text-text dark:text-text-inverted">
            <Link className="block py-2" to="/">Home</Link>
            <Link className="block py-2" to="/about">About Us</Link>
            <Link className="block py-2" to="/contact">Contact</Link>
            <Link className="block py-2" to="/rating">Rating</Link>

            {user && (
              <>
                <Link className="block py-2" to="/profile">Profile</Link>
                <Link className="block py-2" to="/query">Raise Query</Link>

                {user.role === "admin" && (
                  <Link
                    className="block py-2 font-semibold text-primary"
                    to="/admin"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

            <div className="pt-3 border-t border-accent dark:border-accent-dark">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-danger font-semibold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link className="block py-2" to="/login">Login</Link>
                  <Link className="block py-2 text-primary" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
