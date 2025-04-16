import React, { useState } from 'react';
import logo from '../assets/react.svg';
import './Login.css';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, openRegisterModal } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="auth-card">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="auth-logo" />
      </div>
      
      <h2 className="auth-title">Login</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="auth-button">Login</button>
      </form>
      
      <div className="auth-links">
        <button onClick={openRegisterModal} className="auth-link">Register</button>
      </div>
    </div>
  );
}

export default Login;