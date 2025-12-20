import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-background-dark shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        EXCEL
      </Link>

      <nav className="flex items-center gap-5">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/rating">Rating</Link>

        {user && <Link to="/profile">Profile</Link>}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-primary text-white px-3 py-1 rounded"
          >
            Admin
          </Link>
        )}

        {user && (
          <>
            <img
              src={user.avatar || "/avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        )}

        <button onClick={toggleTheme}>🌙</button>
      </nav>
    </header>
  );
}
