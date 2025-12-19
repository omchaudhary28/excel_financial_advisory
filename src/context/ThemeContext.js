import React, { createContext } from 'react';
import useDarkMode from '../hooks/useDarkMode';

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