import React, { useState } from 'react';
import partnerPresenter from '../../presenters/partnerPresenter';

function PartnerManager({ data, onDataChange }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ photo: null });
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    partnerPresenter.handleFileChange(e, setFormData, setPreviewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    partnerPresenter.handleSubmit({ formData, setLoading, setShowForm, setFormData, setPreviewUrl, onDataChange });
  };

  const handleDelete = (partnerId) => {
    partnerPresenter.handleDelete({ partnerId, setLoading, onDataChange });
  };

  return (
    <div className="partner-manager">
      <div className="manager-header">
        <h2>Manage Partners</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
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

      {data?.[0]?.partner?.length > 0 && (
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