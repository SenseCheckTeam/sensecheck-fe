import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL;

function SliderManager({ onDataChange }) {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    photo: null
  });
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Fetch sliders saat komponen dimount
  useEffect(() => {
    fetchSliders();
  }, []);

  // Fungsi untuk mengambil data slider dari API
  const fetchSliders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/sliders`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setSliders(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching sliders:', err);
      setError('Failed to load sliders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        photo: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      photo: null
    });
    setPreviewUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo && !editingId) {
      alert('Please upload an image');
      return;
    }

    try {
      setLoading(true);

      const formDataObj = new FormData();
      if (formData.photo) {
        formDataObj.append('photo', formData.photo);
      }

      const adminToken = localStorage.getItem('adminToken');

      let url = `${API}/admin/sliders`;
      let method = 'POST';

      if (editingId) {
        url = `${API}/admin/sliders/${editingId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: formDataObj
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      // Refresh sliders
      fetchSliders();
      resetForm();
      alert(editingId ? 'Slider updated successfully!' : 'Slider added successfully!');
      onDataChange();
    } catch (err) {
      console.error('Error saving slider:', err);
      alert(`Failed to save slider: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit slider
  const handleEdit = (slider) => {
    setFormData({
      photo: null
    });
    setEditingId(slider.id);
    setPreviewUrl(slider.imageUrl);
    setShowForm(true);
  };

  // Handle delete slider
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) {
      return;
    }

    try {
      setLoading(true);

      const adminToken = localStorage.getItem('adminToken');

      const response = await fetch(`${API}/admin/sliders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      // Refresh sliders
      fetchSliders();
      alert('Slider deleted successfully!');
      onDataChange();
    } catch (err) {
      console.error('Error deleting slider:', err);
      alert(`Failed to delete slider: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && sliders.length === 0) {
    return (
      <div className="admin-loading">
        <h2>Loading sliders...</h2>
      </div>
    );
  }

  if (error && sliders.length === 0) {
    return (
      <div className="admin-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchSliders}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="slider-manager">
      <div className="manager-header">
        <h2>Manage Sliders</h2>
        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Slider'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Slider' : 'Add New Slider'}</h3>

          <div className="form-group">
            <label htmlFor="photo">Slider Image</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="file-input"
              required={!editingId}
            />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={resetForm} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : (editingId ? 'Update Slider' : 'Add Slider')}
            </button>
          </div>
        </form>
      )}

      <div className="items-list">
        {sliders.length > 0 ? (
          sliders.map(slider => (
            <div key={slider.id} className="item-card">
              <img
                src={slider.imageUrl}
                alt={`Slider ${slider.id}`}
                className="item-image"
              />
              <div className="item-content">
                <h3>Slider ID: {slider.id}</h3>
                <p>Created: {new Date(slider.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(slider.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(slider)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(slider.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No sliders available. Add your first slider!</p>
        )}
      </div>
    </div>
  );
}

export default SliderManager;