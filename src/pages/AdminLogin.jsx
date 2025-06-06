import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAdminLoginPresenter } from '../presenters/adminLoginPresenter';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { formData, handleInputChange, handleSubmit } = useAdminLoginPresenter(setLoading, setError);

  const onSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Masukkan Password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;