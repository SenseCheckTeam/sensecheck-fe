// HeroManager.jsx
import React, { useState, useEffect } from 'react';
import { heroPresenter } from '../../presenters/heroPresenter';

function HeroManager({ data, onDataChange }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    textButton: '',
    buttonUrl: '',
    photo: null,
    imageUrl: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const initialized = heroPresenter.initializeFormData(data);
    if (initialized) {
      setFormData(initialized);
      setPreviewUrl(initialized.imageUrl);
    }
  }, [data]);

  const handleInputChange = (e) => {
    heroPresenter.handleInputChange(e, formData, setFormData);
  };

  const handleFileChange = (e) => {
    heroPresenter.handleFileChange(e, formData, setFormData, setPreviewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    heroPresenter.handleSubmit({
      formData,
      data,
      setLoading,
      setShowForm,
      onDataChange,
      onSuccess: (msg) => alert(msg),
      onError: (msg) => alert(msg)
    });
  };
  

  return (
    <div className="hero-manager">
      <div className="manager-header">
        <h2>Manage Hero Content</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {heroPresenter.getToggleFormLabel(showForm, data)}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{heroPresenter.getFormTitle(data)}</h3>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="4" required></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="textButton">Button Text</label>
            <input type="text" id="textButton" name="textButton" value={formData.textButton} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="buttonUrl">Button URL</label>
            <input type="text" id="buttonUrl" name="buttonUrl" value={formData.buttonUrl} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Image</label>
            <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} className="file-input" />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {heroPresenter.getSubmitButtonLabel(loading, data)}
            </button>
          </div>
        </form>
      )}

      {data?.length > 0 && (
        <div className="items-list">
          <div className="item-card">
            <img src={data[0].imageUrl} alt={data[0].title} className="item-image" />
            <div className="item-content">
              <h3>{data[0].title}</h3>
              <p>{data[0].description}</p>
              <p><strong>Button:</strong> {data[0].textButton}</p>
              <p><strong>URL:</strong> {data[0].buttonUrl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroManager;