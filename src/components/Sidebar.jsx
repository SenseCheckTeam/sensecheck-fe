import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="sidebar-overlay" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Profile</h3>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="sidebar-content">
          {/* User Profile Section */}
          <div className="sidebar-profile">
            <div className="profile-avatar">
              <span>{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="profile-info">
              <h4>{user?.name}</h4>
              <p>User ID: {user?.id}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="sidebar-menu">
            <Link to="/history" className="sidebar-menu-item" onClick={onClose}>
              <span className="menu-icon">📋</span>
              <span>History Diagnosis</span>
            </Link>
            
            <Link to="/profile" className="sidebar-menu-item" onClick={onClose}>
              <span className="menu-icon">👤</span>
              <span>Edit Profile</span>
            </Link>
            
            <button className="sidebar-menu-item logout-btn" onClick={handleLogout}>
              <span className="menu-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
