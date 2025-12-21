import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext, useState } from "react"; // Added useState
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"; // Added FiMenu, FiX

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

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
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const NavLinks = ({ isMobile = false }) => (
    <>
      <Link to="/" className="hover:text-primary-light transition-colors transform hover:-translate-y-1" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Home</Link>
      <Link to="/contact" className="hover:text-primary-light transition-colors transform hover:-translate-y-1" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Contact</Link>
      <Link to="/rating" className="hover:text-primary-light transition-colors transform hover:-translate-y-1" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Rating</Link>

      {user && <Link to="/profile" className="hover:text-primary-light transition-colors transform hover:-translate-y-1" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Profile</Link>}

      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="bg-primary text-text-inverted px-3 py-1 rounded hover:bg-primary-light transition-colors"
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          Admin
        </Link>
      )}

      {user && (
        <>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover transform transition-transform duration-200 hover:scale-115"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-text-inverted text-lg font-semibold transform transition-transform duration-200 hover:scale-115">
              {getInitials(user.name)}
            </div>
          )}
          <button onClick={handleLogoutConfirmation} className="text-danger hover:text-danger-light transition-colors transform hover:scale-105">
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-white dark:bg-background-dark shadow px-6 py-4 flex justify-between items-center relative z-50">
      <Link to="/" className="flex items-center transform transition-transform duration-200 hover:scale-110">
        <img src="/excel_financial.png" alt="Financial App Logo" className="w-32 h-auto mr-2" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-5 text-text dark:text-text-inverted">
        <NavLinks />
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-light dark:hover:bg-primary hover:text-text-inverted transition-all duration-200 transform hover:scale-115 shadow-md" aria-label="Toggle theme">
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-light dark:hover:bg-primary hover:text-text-inverted transition-all duration-200 transform hover:scale-115 shadow-md" aria-label="Toggle theme">
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text dark:text-text-inverted focus:outline-none" aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-background-dark z-40 flex flex-col items-center justify-center space-y-8 text-xl text-text dark:text-text-inverted transition-transform duration-300 ease-in-out">
          <NavLinks isMobile={true} />
        </div>
      )}
    </header>
  );
}

