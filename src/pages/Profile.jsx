import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import '../App.css';
import { updateProfile } from '../presenters/profilePresenter';

function Profile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    const result = await updateProfile(formData, user, login, setLoading);
    if (result.success) {
      setSuccess(result.message);
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: '' }));
    } else {
      setError(result.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>

        <h1 className="profile-title">Profile Saya</h1>
        <p className="profile-subtitle">Kelola informasi profil Anda</p>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info-main">
              <h2>{user?.name}</h2>
              <p>User ID: {user?.userId}</p>
            </div>
          </div>

          {error && <div className="profile-error">{error}</div>}
          {success && <div className="profile-success">{success}</div>}

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nama Lengkap</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={loading}
                    required
                  />
                ) : (
                  <div className="form-display">{formData.name}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={loading}
                    required
                  />
                ) : (
                  <div className="form-display">{formData.email || 'Belum diisi'}</div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Masukkan password baru"
                    disabled={loading}
                    required
                    minLength={8}
                  />
                  <small className="form-help">Minimal 8 karakter</small>
                </div>
              </div>
            )}

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn-save" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button onClick={handleCancel} className="btn-cancel" disabled={loading}>
                    Batal
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn-edit">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
