import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const displayName =
    user?.name || (user?.email ? user.email.split("@")[0] : "");

  const avatarLetter = displayName ? displayName.charAt(0).toUpperCase() : "?";

  const confirmLogout = () => {
    setIsMenuOpen(false);
    setShowLogoutConfirm(true);
  };

  const proceedLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background-light dark:bg-background-dark shadow-lg">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
          <img
            src="/excel_financial.png"
            alt="Excel Financial Advisory"
            className="h-14"
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
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center font-bold">
                  {avatarLetter}
                </div>
                <span className="text-sm hidden sm:block">{displayName}</span>
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
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark pb-4">
          <div className="container mx-auto px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className="hover:text-primary transition py-2 text-center"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" onClick={handleLinkClick} className="hover:text-primary transition py-2 text-center">
                  Profile
                </Link>
                <Link to="/query" onClick={handleLinkClick} className="hover:text-primary transition py-2 text-center">
                  Raise Query
                </Link>
                <div className="flex flex-col items-center gap-4 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center font-bold">
                      {avatarLetter}
                    </div>
                    <span>{displayName}</span>
                  </div>
                  <button
                    onClick={confirmLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Logout
                  </button>
                  <ThemeToggle />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t">
                <Link to="/login" onClick={handleLinkClick} className="py-2 text-center">Login</Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="bg-primary text-white px-5 py-2 rounded-lg text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

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
