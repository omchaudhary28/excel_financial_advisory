import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Restore auth from JWT on page refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN
  const login = async (email, password) => {
    const response = await api.post('/login.php', { email, password });

    if (response.data.success) {
      const { token, user } = response.data;

      // Store token & user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Attach token to all future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
    } else {
      setUser(null);
    }

    return response.data;
  };

  // 🔹 REGISTER (unchanged)
  const register = async (name, email, password, confirm_password, phone) => {
    return await api.post('/register.php', {
      name,
      email,
      password,
      confirm_password,
      phone
    });
  };

  // 🔹 LOGOUT (JWT-style)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    delete api.defaults.headers.common['Authorization'];

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
