import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can render a spinner or a loading message here
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Logged in but not an admin, redirect to home page
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
