import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  // LOGIN (JSON → PHP reads php://input)
  const login = async (email, password) => {
    try {
      const res = await api.post("/login.php", { email, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        api.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.token}`;
        setUser(res.data.user);
      }

      return res.data;
    } catch (err) {
      return {
        success: false,
        message: "Server error",
      };
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    const res = await api.post("/register.php", {
      name,
      email,
      password,
    });
    return res.data;
  };

  const logout = () => {
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
