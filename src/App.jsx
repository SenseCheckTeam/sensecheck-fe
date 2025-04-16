import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Modal from './components/Modal'
import Login from './components/Login'
import Register from './components/Register'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
  const { showLoginModal, showRegisterModal, closeModals } = useAuth();

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<div>Articles Page</div>} />
      </Routes>

      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={closeModals}>
        <Login />
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={showRegisterModal} onClose={closeModals}>
        <Register />
      </Modal>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
