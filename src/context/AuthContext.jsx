import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log('Login with:', userData);
    // In a real app, you would validate credentials with a backend
    setIsAuthenticated(true);
    setUser({ email: userData.email });
  };

  const register = (userData) => {
    console.log('Register with:', userData);
    // In a real app, you would send this data to a backend
    setIsAuthenticated(true);
    setUser({ email: userData.email });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}