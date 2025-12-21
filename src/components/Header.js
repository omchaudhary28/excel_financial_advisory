import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ripple, setRipple] = useState(null); // State for ripple effect

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  const handleLogoutConfirmation = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = (event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    setRipple({
      size: diameter,
      x: event.clientX - button.getBoundingClientRect().left - radius,
      y: event.clientY - button.getBoundingClientRect().top - radius,
    });

    toggleTheme();
  };

  const NavLinks = ({ isMobile = false }) => (
    <>
      <Link to="/" className={`link-underline-grow text-text dark:text-text hover:text-primary-light transition-colors transform ${isMobile ? 'text-xl py-3' : 'hover:-translate-y-1'}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Home</Link>
      <Link to="/contact" className={`link-underline-grow text-text dark:text-text hover:text-primary-light transition-colors transform ${isMobile ? 'text-xl py-3' : 'hover:-translate-y-1'}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Contact</Link>
      <Link to="/rating" className={`link-underline-grow text-text dark:text-text hover:text-primary-light transition-colors transform ${isMobile ? 'text-xl py-3' : 'hover:-translate-y-1'}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Rating</Link>

      {user && <Link to="/profile" className={`link-underline-grow text-text dark:text-text hover:text-primary-light transition-colors transform ${isMobile ? 'text-xl py-3' : 'hover:-translate-y-1'}`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Profile</Link>}

      {user?.role === "admin" && (
        <Link
          to="/admin"
          className={`btn-primary ${isMobile ? 'w-auto' : ''}`} // Apply btn-primary for consistent look
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          Admin
        </Link>
      )}

      {user && (
        <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className={`w-10 h-10 rounded-full object-cover transform transition-transform duration-200 ${isMobile ? 'w-16 h-16' : 'hover:scale-115'}`}
            />
          ) : (
            <div className={`w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 text-lg font-semibold transform transition-transform duration-200 ${isMobile ? 'w-16 h-16 text-2xl' : 'hover:scale-115'}`}>
              {getInitials(user.name)}
            </div>
          )}
          <button onClick={handleLogoutConfirmation} className={`text-danger hover:text-danger-light transition-colors transform ${isMobile ? 'text-xl py-3' : 'hover:scale-105'}`}>
            Logout
          </button>
        </div>
      )}
    </>
  );

  return (
    <header className="bg-white dark:bg-background-dark shadow-md px-4 sm:px-6 py-4 flex justify-between items-center relative z-50">
      <Link to="/" className="flex items-center transform transition-transform duration-200 hover:scale-110">
        <img src="/excel_financial.png" alt="Financial App Logo" className="w-28 sm:w-32 h-auto mr-2" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-text dark:text-text">
        <NavLinks />
        <button onClick={handleThemeToggle} className="theme-toggle-button p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-light dark:hover:bg-primary hover:text-text-inverted transition-all duration-200 transform hover:scale-115 shadow-md" aria-label="Toggle theme">
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          {ripple && (
            <span
              className="theme-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              onAnimationEnd={() => setRipple(null)}
            />
          )}
        </button>
      </nav>

      {/* Mobile Menu Button and Theme Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={handleThemeToggle} className="theme-toggle-button p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-light dark:hover:bg-primary hover:text-text-inverted transition-all duration-200 transform hover:scale-115 shadow-md" aria-label="Toggle theme">
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          {ripple && (
            <span
              className="theme-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              onAnimationEnd={() => setRipple(null)}
            />
          )}
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text dark:text-text-inverted focus:outline-none" aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-background-dark z-40 flex flex-col items-center justify-center text-text dark:text-text transition-transform duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-6 p-8"> {/* Increased padding and spacing */}
            <NavLinks isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
}




