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
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  // LOGIN (form-urlencoded, no CORS preflight)
  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await api.post("/login.php", formData);

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    }

    return response.data;
  };

  // REGISTER (JSON is fine – backend allows it)
  const register = async (name, email, password, confirm_password, phone) => {
    return api.post("/register.php", {
      name,
      email,
      password,
      confirm_password,
      phone,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
