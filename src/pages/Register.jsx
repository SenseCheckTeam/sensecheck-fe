import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleRegister } from '../presenters/registerPresenter';
import '../App.css';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(form, setLoading, setError, navigate);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Selamat Datang!</h1>
        <p className="signup-subtitle">Tolong masukkan data mu untuk membuat akun</p>

        {error && <div className="signup-error">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Youremail@gmail.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Mendaftar...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-links">
          <p>Sudah punya Akun? <Link to="/login">Masuk</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
