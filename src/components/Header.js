import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle'; // Import ThemeToggle

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // New state for logout confirmation

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const proceedLogout = async () => {
    setShowLogoutConfirm(false); // Close modal
    await logout();
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Close modal
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false); // Close menu
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background-light dark:bg-background-dark text-text dark:text-text-inverted shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
          <img src="/excel_financial.png" alt="Excel Financial Advisory Logo" className="h-10 w-auto rounded-md" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1 items-center">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.path}
              to={navLink.path}
              className="relative px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-all duration-300 group"
            >
              {navLink.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/profile"
                className="relative px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-all duration-300 group"
              >
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/query"
                className="relative px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-all duration-300 group"
              >
                Raise Query
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark group-hover:w-full transition-all duration-300"></span>
              </Link>
              {user.role === 'admin' && (
                <Link
                to="/admin"
                className="relative px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-all duration-300 group"
                >
                  Admin
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
              <div className="ml-4 flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-sm font-bold animate-pulse-glow">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-text dark:text-text-inverted hidden sm:inline">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={confirmLogout} // Call confirmLogout instead of direct logout
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover-lift"
                >
                  Logout
                </button>
              
                        {/* Theme Toggle for Desktop */}
                        <ThemeToggle />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-all duration-300 ml-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover-lift shadow-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav id="mobile-menu" className="md:hidden bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 animate-fade-in-down">
          <div className="container mx-auto px-6 py-4 space-y-3">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.path}
                to={navLink.path}
                className="block px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-300"
                onClick={handleMobileLinkClick}
              >
                {navLink.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-300"
                  onClick={handleMobileLinkClick}
                >
                  Profile
                </Link>
                <Link
                  to="/query"
                  className="block px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-300"
                  onClick={handleMobileLinkClick}
                >
                  Raise Query
                </Link>
              </>
            )}
            {/* Theme Toggle for Mobile */}
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-300"
                  onClick={handleMobileLinkClick}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    confirmLogout(); // Call confirmLogout instead of direct logout
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-300"
                  onClick={handleMobileLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-all duration-300 text-center"
                  onClick={handleMobileLinkClick}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-background-dark bg-opacity-50 dark:bg-background-dark dark:bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
          <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-scale-in">
            <h3 id="logout-modal-title" className="text-xl font-semibold text-text dark:text-text-inverted mb-4">Confirm Logout</h3>
            <p className="text-text dark:text-text-inverted mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-text dark:text-text-inverted rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={proceedLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
