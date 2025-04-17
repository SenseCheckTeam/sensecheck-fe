import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const userName = localStorage.getItem('name');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    window.location.href = '/';
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HealthDiagnose</Link>
      </div>
      
      <div className="navbar-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        
        <Link 
          to="/articles" 
          className={location.pathname === '/articles' ? 'active' : ''}
        >
          Articles
        </Link>
        
        {isLoggedIn ? (
          <div className="user-menu">
            <span className="user-name">Hello, {userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <>
            <Link 
              to="/login" 
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Login
            </Link>
            
            <Link 
              to="/register" 
              className={location.pathname === '/register' ? 'active' : ''}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
