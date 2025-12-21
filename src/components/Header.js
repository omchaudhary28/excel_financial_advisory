import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${
          scrolled || !isHome
            ? "bg-white dark:bg-gray-900 shadow"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">EXCEL</span>
          <span className="text-gray-800 dark:text-white">
            Financial Advisory
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {["/", "/contact", "/rating"].map((path, i) => {
            const label = ["Home", "Contact", "Rating"][i];
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`
                  font-medium transition-colors
                  ${
                    scrolled || !isHome
                      ? "text-gray-700 dark:text-gray-200 hover:text-primary"
                      : "text-white hover:text-primary"
                  }
                  ${active ? "text-primary" : ""}
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
