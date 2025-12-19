import React, { createContext } from 'react';
import useDarkMode from '../../useDarkMode'; // Adjust path if necessary

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(colorTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: colorTheme === 'light' ? 'dark' : 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};