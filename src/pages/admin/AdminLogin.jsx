import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleAdminLogin } from '../../presenters/admin/adminLoginPresenter';
import '../../App.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { success, error: loginError } = await handleAdminLogin({
      email,
      password,
      setLoading,
      setError,
      navigate,
    });

    if (!success) {
      console.error('Login failed:', loginError);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p><Link to="/login">Back to User Login</Link></p>
        </div>

        <div className="debug-info" style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
          <p>API URL: {import.meta.env.VITE_API_URL || 'http://13.215.253.107:5000'}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
