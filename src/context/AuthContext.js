import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

const login = async (email, password) => {
  try {
    const response = await api.post("/login.php", {
      email,
      password,
    });

    if (response.data.success) {
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      return { success: true };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Try again.",
    };
  }
};



  const register = (data) => api.post("/register.php", data);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
