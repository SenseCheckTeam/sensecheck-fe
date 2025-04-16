import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log('Login with:', userData);
    // In a real app, you would validate credentials with a backend
    setIsAuthenticated(true);
    setUser({ email: userData.email });
    setShowLoginModal(false);
  };

  const register = (userData) => {
    console.log('Register with:', userData);
    // In a real app, you would send this data to a backend
    setIsAuthenticated(true);
    setUser({ email: userData.email });
    setShowRegisterModal(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        showLoginModal,
        showRegisterModal,
        openLoginModal,
        openRegisterModal,
        closeModals
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}