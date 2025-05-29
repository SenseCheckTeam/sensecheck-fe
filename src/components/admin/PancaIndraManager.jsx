import React, { useEffect, useState } from 'react';
import { loadPancaIndra, updatePancaIndra } from '../../presenters/pancaIndraPresenter';

function PancaIndraManager({ data, onDataChange }) {
  const [selectedIndra, setSelectedIndra] = useState('peraba');
  const [showForm, setShowForm] = useState(false);
  const initialFormData = {
    title: '',
    subtitle: '',
    description: '',
    buttonUrl: '',
    logoPhoto: null,
    imagePhoto: null
  };
  
  const initialPreviewUrls = {
    logo: '',
    image: ''
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [previewUrls, setPreviewUrls] = useState(initialPreviewUrls);
  
  const [loading, setLoading] = useState(false);

  const indraOptions = [
    { key: 'peraba', label: 'Peraba' },
    { key: 'penciuman', label: 'Penciuman' },
    { key: 'pendengaran', label: 'Pendengaran' },
    { key: 'penglihatan', label: 'Penglihatan' },
    { key: 'pengecapan', label: 'Pengecapan' }
  ];

  useEffect(() => {
    loadPancaIndra(data, selectedIndra, setFormData, setPreviewUrls);
  }, [data, selectedIndra]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => ({
          ...prev,
          [name === 'logoPhoto' ? 'logo' : 'image']: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePancaIndra(formData, selectedIndra, data, onDataChange, setShowForm);
      setShowForm(false);
      onDataChange();
    } catch (err) {
      alert(`Failed to update ${selectedIndra}: ${err.message}`);
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
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
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
              rows="6"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="buttonUrl">Button URL</label>
            <input
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
              name="logoPhoto"
              id="logoPhoto"
              accept="image/*"
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
              name="imagePhoto"
              id="imagePhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {previewUrls.image && (
              <div className="image-preview">
                <img src={previewUrls.image} alt="Main Preview" />
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
                  <label className="logo-image-label">Logo Image:</label>
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