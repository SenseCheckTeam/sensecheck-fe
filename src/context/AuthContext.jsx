import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');

      if (token && userId && name) {
        setIsAuthenticated(true);
        setUser({
          id: userId,
          name: name,
          email: email,
          token: token
        });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (loginData) => {
    // Save to localStorage
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('userId', loginData.userId);
    localStorage.setItem('name', loginData.name);
    localStorage.setItem('email', loginData.email);

    // Update state
    setIsAuthenticated(true);
    setUser({
      id: loginData.userId,
      name: loginData.name,
      email: loginData.email,
      token: loginData.token
    });
  };

  const logout = () => {
    // Clear localStorage
    authAPI.logout();

    // Update state
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}