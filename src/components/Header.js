import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);

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

  return (
    <header className="bg-white dark:bg-background-dark shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center transform transition-transform duration-200 hover:scale-105">
        <img src="/excel_financial.png" alt="Financial App Logo" className="w-32 h-auto mr-2" />
      </Link>

      <nav className="flex items-center gap-5">
        <Link to="/" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-0.5">Home</Link>
        <Link to="/contact" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-0.5">Contact</Link>
        <Link to="/rating" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-0.5">Rating</Link>

        {user && <Link to="/profile" className="text-text hover:text-primary-light transition-colors transform hover:-translate-y-0.5">Profile</Link>}

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
                className="w-12 h-12 rounded-full object-cover transform transition-transform duration-200 hover:scale-110"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-text-inverted text-lg font-semibold transform transition-transform duration-200 hover:scale-110">
                {getInitials(user.name)}
              </div>
            )}
            <button onClick={logout} className="text-danger hover:text-danger-light transition-colors">
              Logout
            </button>
          </>
        )}

        <button onClick={toggleTheme} className="text-2xl hover:text-primary-light dark:hover:text-primary transition-colors transform hover:scale-110">🌙</button>
      </nav>
    </header>
  );
}
