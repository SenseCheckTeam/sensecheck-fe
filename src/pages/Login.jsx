import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { handleLogin } from '../presenters/loginPresenter';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { login } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password, setLoading, setError, login, navigate, from });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Selamat Datang Kembali!</h1>
        <p className="signup-subtitle">Tolong masukkan data mu!</p>

        {error && <div className="signup-error">{error}</div>}

        <form className="signup-form" onSubmit={onSubmit}>
          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Lupa Password?</Link>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Masuk...' : 'Log In'}
          </button>
        </form>

        <div className="signup-links">
          <p>Belum punya Akun? <Link to="/register">Buat Akun</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
