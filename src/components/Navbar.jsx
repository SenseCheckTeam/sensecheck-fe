import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user, logout, openLoginModal } = useAuth();
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <div className="logo-box">HealthDiagnose</div>
        </Link>
      </div>
      
      <div className="nav-right">
        <div className="navbar-links">
          <Link to="/articles" className={`nav-button ${location.pathname === '/articles' ? 'active' : ''}`}>
            Artikel
          </Link>
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-email">{user.email}</span>
              <button onClick={logout} className="nav-button logout">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={openLoginModal} className="nav-button login">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;