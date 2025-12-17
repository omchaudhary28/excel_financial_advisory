import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get('/check_session.php');
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/login.php', { email, password });
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const register = async (name, email, password, confirm_password, phone) => {
    return await api.post('/register.php', { name, email, password, confirm_password, phone });
  };

  const logout = async () => {
    await api.post('/logout.php');
    setUser(null);
  };

  const value = {
    user,
    setUser, // Expose setUser
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
