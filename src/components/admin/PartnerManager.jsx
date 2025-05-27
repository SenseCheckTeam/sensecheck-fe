import React, { useState } from 'react';

const API = import.meta.env.VITE_API_URL;

function PartnerManager({ data, onDataChange }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    photo: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        photo: file
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);

      const formDataObj = new FormData();
      formDataObj.append('photo', formData.photo);

      const adminToken = localStorage.getItem('adminToken');

      const response = await fetch(`${API}/admin/partner`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: formDataObj
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.message);
      }

      alert('Partner added successfully!');
      setShowForm(false);
      setFormData({ photo: null });
      setPreviewUrl('');
      onDataChange();
    } catch (err) {
      console.error('Error adding partner:', err);
      alert(`Failed to add partner: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (partnerId) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      setLoading(true);

      const adminToken = localStorage.getItem('adminToken');

      const response = await fetch(`${API}/admin/partner/${partnerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.message);
      }

      alert('Partner deleted successfully!');
      onDataChange();
    } catch (err) {
      console.error('Error deleting partner:', err);
      alert(`Failed to delete partner: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partner-manager">
      <div className="manager-header">
        <h2>Manage Partners</h2>
        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Partner'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>Add New Partner</h3>

          <div className="form-group">
            <label htmlFor="photo">Partner Logo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="file-input"
              required
            />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Partner'}
            </button>
          </div>
        </form>
      )}

      {data && data[0]?.partner && data[0].partner.length > 0 && (
        <div className="items-list">
          {data[0].partner.map(partner => (
            <div key={partner.id} className="item-card">
              <img src={partner.imageUrl} alt="Partner" className="item-image" />
              <div className="item-content">
                <h3>Partner ID: {partner.id}</h3>
                <p>Created: {new Date(partner.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleDelete(partner.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PartnerManager;