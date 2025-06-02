import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import '../App.css';

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

  // Update form data when user data changes
  React.useEffect(() => {
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
    // Clear messages when user starts typing
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email tidak boleh kosong');
      return;
    }

    if (!formData.password.trim()) {
      setError('Password tidak boleh kosong');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password harus minimal 8 karakter');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        return;
      }

      const updatePayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      console.log('Updating profile:', updatePayload);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Update failed: ${response.status}`);
      }

      console.log('Profile updated successfully:', data);

      // Update AuthContext with new user data
      login({
        token: token,
        userId: user.userId,
        name: formData.name,
        email: formData.email
      });

      setSuccess('Profile berhasil diperbarui!');
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: '' })); // Clear password field

    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Terjadi kesalahan saat memperbarui profile');
    } finally {
      setLoading(false);
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
                  <button 
                    onClick={handleSave} 
                    className="btn-save"
                    disabled={loading}
                  >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button 
                    onClick={handleCancel} 
                    className="btn-cancel"
                    disabled={loading}
                  >
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
