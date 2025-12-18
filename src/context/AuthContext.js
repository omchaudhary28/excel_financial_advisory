import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Restore auth from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN (NO JSON → NO CORS PREFLIGHT)
  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await api.post("/login.php", formData);

    if (response.data.success) {
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
    } else {
      setUser(null);
    }

    return response.data;
  };

  // 🔹 REGISTER (still JSON is OK if backend allows)
  const register = async (name, email, password, confirm_password, phone) => {
    return await api.post("/register.php", {
      name,
      email,
      password,
      confirm_password,
      phone,
    });
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
