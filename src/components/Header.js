import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-background-dark shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img src="/logo.svg" alt="Financial App Logo" className="w-32 h-auto mr-2" />
      </Link>

      <nav className="flex items-center gap-5">
        <Link to="/" className="text-text hover:text-primary-light transition-colors">Home</Link>
        <Link to="/contact" className="text-text hover:text-primary-light transition-colors">Contact</Link>
        <Link to="/rating" className="text-text hover:text-primary-light transition-colors">Rating</Link>

        {user && <Link to="/profile" className="text-text hover:text-primary-light transition-colors">Profile</Link>}

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
            <img
              src={user.avatar || "/avatar.png"}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <button onClick={logout} className="text-danger hover:text-danger-light transition-colors">
              Logout
            </button>
          </>
        )}

        <button onClick={toggleTheme} className="text-2xl hover:text-primary-light dark:hover:text-primary transition-colors">🌙</button>
      </nav>
    </header>
  );
}
