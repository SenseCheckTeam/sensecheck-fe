import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logoBaru.png';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

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

        <NavLink
          to="/signup"
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
      </div>
    </nav>
  );
}

export default Navbar;
