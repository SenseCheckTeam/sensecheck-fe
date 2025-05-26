import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import '../App.css';

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  // Update form data when user data changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        address: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save this to the backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: ''
    });
    setIsEditing(false);
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
              <p>User ID: {user?.id}</p>
            </div>
          </div>

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
                  />
                ) : (
                  <div className="form-display">{formData.email || 'Belum diisi'}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nomor Telepon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Masukkan nomor telepon"
                  />
                ) : (
                  <div className="form-display">{formData.phone || 'Belum diisi'}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Alamat</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                  />
                ) : (
                  <div className="form-display">{formData.address || 'Belum diisi'}</div>
                )}
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn-save">
                    Simpan
                  </button>
                  <button onClick={handleCancel} className="btn-cancel">
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
