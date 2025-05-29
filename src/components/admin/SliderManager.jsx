import React, { useState, useEffect } from 'react';
import { sliderPresenter } from '../../presenters/sliderPresenter';

function SliderManager({ onDataChange }) {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ photo: null });
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    sliderPresenter.load(setSliders, setLoading, setError);
  }, []);

  const resetForm = () => {
    setFormData({ photo: null });
    setPreviewUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ photo: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo && !editingId) {
      alert('Please upload an image');
      return;
    }

    const success = await sliderPresenter.submit({
      formData,
      editingId,
      resetForm,
      setLoading,
      onDataChange,
      reload: () => sliderPresenter.load(setSliders, setLoading, setError),
    });

    if (success) resetForm();
  };

  const handleEdit = (slider) => {
    setFormData({ photo: null });
    setEditingId(slider.id);
    setPreviewUrl(slider.imageUrl);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    sliderPresenter.delete({
      id,
      setLoading,
      onDataChange,
      reload: () => sliderPresenter.load(setSliders, setLoading, setError),
    });
  };

  if (loading && sliders.length === 0) {
    return <div className="admin-loading"><h2>Loading sliders...</h2></div>;
  }

  if (error && sliders.length === 0) {
    return (
      <div className="admin-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => sliderPresenter.load(setSliders, setLoading, setError)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="slider-manager">
      <div className="manager-header">
        <h2>Manage Sliders</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
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
              accept="image/*"
              onChange={handleFileChange}
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
              <img src={slider.imageUrl} alt={`Slider ${slider.id}`} className="item-image" />
              <div className="item-content">
                <h3>Slider ID: {slider.id}</h3>
                <p>Created: {new Date(slider.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(slider.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(slider)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(slider.id)} className="delete-btn">Delete</button>
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