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
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
          <img
            src="/excel_financial.png"
            alt="Excel Financial Advisory"
            className="h-16"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">
                Profile
              </Link>
              <Link to="/query" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">
                Raise Query
              </Link>
              <div className="relative ml-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {avatarLetter}
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{displayName}</div>
                    <button
                      onClick={confirmLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <ThemeToggle />
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">Login</Link>
              <Link
                to="/register"
                className="btn-primary rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black absolute top-full left-0 w-full shadow-lg">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 text-center font-medium"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 text-center font-medium">
                  Profile
                </Link>
                <Link to="/query" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 text-center font-medium">
                  Raise Query
                </Link>
                <div className="flex flex-col items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                      {avatarLetter}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{displayName}</span>
                  </div>
                  <button
                    onClick={confirmLogout}
                    className="btn-danger w-full"
                  >
                    Logout
                  </button>
                  <div className="mt-4">
                    <ThemeToggle />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/login" onClick={handleLinkClick} className="py-2 text-center text-gray-600 dark:text-gray-300 font-medium">Login</Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="btn-primary rounded-full"
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={proceedLogout}
                className="btn-danger"
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