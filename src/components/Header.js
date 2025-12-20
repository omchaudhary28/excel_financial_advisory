import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi"; // Added import

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

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
  };

  return (
    <header className="bg-white dark:bg-background-dark shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center transform transition-transform duration-200 hover:scale-110">
        <img src="/excel_financial.png" alt="Financial App Logo" className="w-32 h-auto mr-2" />
      </Link>

      <nav className="flex items-center gap-5">
        <Link to="/" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-1">Home</Link>
        <Link to="/contact" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-1">Contact</Link>
        <Link to="/rating" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-1">Rating</Link>

        {user && <Link to="/profile" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-1">Profile</Link>}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-primary text-text-inverted px-3 py-1 rounded hover:bg-primary-light transition-colors"
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

        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-light dark:hover:bg-primary hover:text-text-inverted transition-all duration-200 transform hover:scale-115 shadow-md" aria-label="Toggle theme">
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
      </nav>
    </header>
  );
}
