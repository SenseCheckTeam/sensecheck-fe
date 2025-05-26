import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL;

function PancaIndraManager({ data, onDataChange }) {
  const [selectedIndra, setSelectedIndra] = useState('peraba');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    buttonUrl: '',
    logoPhoto: null,
    imagePhoto: null
  });
  const [previewUrls, setPreviewUrls] = useState({
    logo: '',
    image: ''
  });

  const indraOptions = [
    { key: 'peraba', label: 'Peraba' },
    { key: 'penciuman', label: 'Penciuman' },
    { key: 'pendengaran', label: 'Pendengaran' },
    { key: 'penglihatan', label: 'Penglihatan' },
    { key: 'pengecapan', label: 'Pengecapan' }
  ];

  useEffect(() => {
    if (data && data[selectedIndra]) {
      const indraData = data[selectedIndra];
      setFormData({
        title: indraData.title || '',
        subtitle: indraData.subtitle || '',
        description: indraData.description || '',
        buttonUrl: indraData.buttonUrl || '',
        logoPhoto: null,
        imagePhoto: null
      });
      setPreviewUrls({
        logo: indraData.logoUrl || '',
        image: indraData.imageUrl || ''
      });
    }
  }, [data, selectedIndra]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [name]: file
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls({
          ...previewUrls,
          [name === 'logoPhoto' ? 'logo' : 'image']: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('subtitle', formData.subtitle);
      formDataObj.append('description', formData.description);
      formDataObj.append('buttonUrl', formData.buttonUrl);
      if (formData.logoPhoto) {
        formDataObj.append('logoPhoto', formData.logoPhoto);
      }
      if (formData.imagePhoto) {
        formDataObj.append('imagePhoto', formData.imagePhoto);
      }

      const adminToken = localStorage.getItem('adminToken');
      const indraId = data && data[selectedIndra] ? data[selectedIndra].id : null;

      const response = await fetch(`${API}/admin/${selectedIndra}${indraId ? `/${indraId}` : ''}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: formDataObj
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.message);
      }

      alert(`${selectedIndra} updated successfully!`);
      setShowForm(false);
      onDataChange();
    } catch (err) {
      console.error('Error saving panca indra:', err);
      alert(`Failed to save ${selectedIndra}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pancaindra-manager">
      <div className="manager-header">
        <h2>Manage Panca Indra</h2>
        <div className="header-controls">
          <select
            value={selectedIndra}
            onChange={(e) => setSelectedIndra(e.target.value)}
            className="indra-selector"
          >
            {indraOptions.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : `Edit ${selectedIndra}`}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>Edit {selectedIndra}</h3>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="buttonUrl">Button URL</label>
            <input
              type="text"
              id="buttonUrl"
              name="buttonUrl"
              value={formData.buttonUrl}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="logoPhoto">Logo Image</label>
            <input
              type="file"
              id="logoPhoto"
              name="logoPhoto"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="file-input"
            />
            {previewUrls.logo && (
              <div className="image-preview">
                <img src={previewUrls.logo} alt="Logo Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="imagePhoto">Main Image</label>
            <input
              type="file"
              id="imagePhoto"
              name="imagePhoto"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="file-input"
            />
            {previewUrls.image && (
              <div className="image-preview">
                <img src={previewUrls.image} alt="Image Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : `Update ${selectedIndra}`}
            </button>
          </div>
        </form>
      )}

      {data && data[selectedIndra] && (
        <div className="pancaindra-display">
          <div className="item-card">
            <div className="indra-images">
              {data[selectedIndra].logoUrl && (
                <div className="image-container">
                  <label className='logo-image-label'>Logo Image:</label>
                  <img src={data[selectedIndra].logoUrl} alt="Logo" className="item-image-small" />
                </div>
              )}
              {data[selectedIndra].imageUrl && (
                <div className="image-container">
                  <label>Main Image:</label>
                  <img src={data[selectedIndra].imageUrl} alt="Main" className="item-image" />
                </div>
              )}
            </div>
            <div className="item-content">
              <h3>{data[selectedIndra].title}</h3>
              <h4>{data[selectedIndra].subtitle}</h4>
              <p className="description-text">{data[selectedIndra].description}</p>
              <div className="button-url-info">
                <strong>Button URL:</strong>
                <span className="url-text">{data[selectedIndra].buttonUrl}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PancaIndraManager;