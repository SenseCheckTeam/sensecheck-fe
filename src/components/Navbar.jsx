import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const userName = localStorage.getItem('name');
  const isAdmin = localStorage.getItem('adminToken') !== null;
  const adminName = localStorage.getItem('adminName');

  const handleUserLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
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

        {isAdmin ? (
          <div className="user-menu">
            <span className="user-name">Admin: {adminName}</span>
            <Link
              to="/admin"
              className={location.pathname.startsWith('/admin') ? 'active' : ''}
            >
              Dashboard
            </Link>
            <button onClick={handleAdminLogout} className="logout-btn">Logout</button>
          </div>
        ) : isLoggedIn ? (
          <div className="user-menu">
            <span className="user-name">Hello, {userName}</span>
            <button onClick={handleUserLogout} className="logout-btn">Logout</button>
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

            <Link
              to="/admin/login"
              className={location.pathname === '/admin/login' ? 'active' : ''}
            >
              Admin
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
