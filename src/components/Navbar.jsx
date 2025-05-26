import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import '../App.css';
import logo from '../assets/logoBaru.png';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="SenseCheck Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          About
        </NavLink>

        {isAuthenticated ? (
          // Show user profile when logged in
          <div className="navbar-user">
            <button
              className="user-profile-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user?.name}</span>
            </button>
          </div>
        ) : (
          // Show login/signup when not logged in
          <>
            <NavLink
              to="/register"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Sign Up
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? "login-btn active" : "login-btn"}
            >
              Log In
            </NavLink>
          </>
        )}
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </nav>
  );
}

export default Navbar;
