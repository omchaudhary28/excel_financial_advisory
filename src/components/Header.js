import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // ✅ SAFE user display helpers
  const displayName =
    user?.name ||
    (user?.email ? user.email.split("@")[0] : "");

  const avatarLetter =
    displayName ? displayName.charAt(0).toUpperCase() : "?";

  const confirmLogout = () => setShowLogoutConfirm(true);

  const proceedLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background-light dark:bg-background-dark shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/excel_financial.png"
            alt="Excel Financial Advisory"
            className="h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link to="/profile" className="hover:text-primary">
                Profile
              </Link>
              <Link to="/query" className="hover:text-primary">
                Raise Query
              </Link>

              <div className="flex items-center gap-3 ml-4 border-l pl-4">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center font-bold">
                  {avatarLetter}
                </div>

                <span className="text-sm hidden sm:block">
                  {displayName}
                </span>

                <button
                  onClick={confirmLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>

                <ThemeToggle />
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="bg-primary text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background-dark p-6 rounded-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={proceedLogout}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
