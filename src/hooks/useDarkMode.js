import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme || "light");

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
}