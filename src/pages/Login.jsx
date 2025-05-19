import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api/api';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Mohon masukkan email dan password');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authAPI.login({ email, password });

      // Save token to localStorage
      localStorage.setItem('token', response.loginResult.token);
      localStorage.setItem('userId', response.loginResult.userId);
      localStorage.setItem('name', response.loginResult.name);

      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan periksa kredensial Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Selamat Datang Kembali!</h1>
        <p className="signup-subtitle">Tolong masukkan data mu!</p>

        {error && <div className="signup-error">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            {loading ? 'Masuk...' : 'Log In'}
          </button>
        </form>

        <div className="signup-links">
          <p>Belum punya Akun? <Link to="/signup">Buat Akun</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
