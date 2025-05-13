import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Komponen untuk dashboard admin
function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sliders');
  const [isAdmin, setIsAdmin] = useState(false);

  // Cek apakah user adalah admin saat komponen dimount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      // Redirect ke halaman admin login jika tidak ada token admin
      navigate('/admin/login');
      return;
    }
    setIsAdmin(true);
  }, [navigate]);

  // Jika bukan admin, tampilkan loading
  if (!isAdmin) {
    return (
      <div className="placeholder-content">
        <h2>Checking admin credentials...</h2>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {localStorage.getItem('adminName') || 'Admin'}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'sliders' ? 'active' : ''}`}
          onClick={() => setActiveTab('sliders')}
        >
          Manage Sliders
        </button>
        <button
          className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          Manage Articles
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'sliders' ? (
          <SliderManager />
        ) : (
          <ArticleManager />
        )}
      </div>
    </div>
  );
}

// Komponen untuk mengelola slider
function SliderManager() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
      const response = await fetch(`${VITE_API_URL}/sliders`);
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
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
      title: '',
      description: '',
      photo: null
    });
    setPreviewUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || (!formData.photo && !editingId)) {
      alert('Please fill all fields and upload an image');
      return;
    }

    try {
      setLoading(true);

      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      if (formData.photo) {
        formDataObj.append('photo', formData.photo);
      }

      const adminToken = localStorage.getItem('adminToken');

      let url = `${VITE_API_URL}/admin/sliders`;
      let method = 'POST';

      if (editingId) {
        url = `${VITE_API_URL}/admin/sliders/${editingId}`;
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
      title: slider.title,
      description: slider.description,
      photo: null
    });
    setEditingId(slider.id);
    setPreviewUrl(`${slider.imageUrl}`);
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

      const response = await fetch(`${VITE_API_URL}/admin/sliders/${id}`, {
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
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="photo">Image</label>
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
                src={`${slider.imageUrl}`}
                alt={slider.title}
                className="item-image"
              />
              <div className="item-content">
                <h3>{slider.title}</h3>
                <p>{slider.description}</p>
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

// Komponen untuk mengelola artikel
function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    photo: null
  });
  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Fetch articles saat komponen dimount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fungsi untuk mengambil data artikel dari API
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${VITE_API_URL}/articles`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setArticles(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
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
      title: '',
      content: '',
      photo: null
    });
    setPreviewUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || (!formData.photo && !editingId)) {
      alert('Please fill all fields and upload an image');
      return;
    }

    try {
      setLoading(true);

      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('content', formData.content);
      if (formData.photo) {
        formDataObj.append('photo', formData.photo);
      }

      const adminToken = localStorage.getItem('adminToken');

      let url = `${VITE_API_URL}/admin/articles`;
      let method = 'POST';

      if (editingId) {
        url = `${VITE_API_URL}/admin/articles/${editingId}`;
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

      // Refresh articles
      fetchArticles();
      resetForm();
      alert(editingId ? 'Article updated successfully!' : 'Article added successfully!');
    } catch (err) {
      console.error('Error saving article:', err);
      alert(`Failed to save article: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit article
  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      photo: null
    });
    setEditingId(article.id);
    setPreviewUrl(`${article.imageUrl}`);
    setShowForm(true);
  };

  // Handle delete article
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      setLoading(true);

      const adminToken = localStorage.getItem('adminToken');

      const response = await fetch(`${VITE_API_URL}/admin/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      // Refresh articles
      fetchArticles();
      alert('Article deleted successfully!');
    } catch (err) {
      console.error('Error deleting article:', err);
      alert(`Failed to delete article: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && articles.length === 0) {
    return (
      <div className="admin-loading">
        <h2>Loading articles...</h2>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="admin-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchArticles}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="article-manager">
      <div className="manager-header">
        <h2>Manage Articles</h2>
        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Article'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Article' : 'Add New Article'}</h3>

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
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="photo">Image</label>
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
              {loading ? 'Saving...' : (editingId ? 'Update Article' : 'Add Article')}
            </button>
          </div>
        </form>
      )}

      <div className="items-list">
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article.id} className="item-card">
              <img
                src={`${article.imageUrl}`}
                alt={article.title}
                className="item-image"
              />
              <div className="item-content">
                <h3>{article.title}</h3>
                <p className="item-excerpt">
                  {article.content.length > 150
                    ? `${article.content.substring(0, 150)}...`
                    : article.content}
                </p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(article)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(article.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No articles available. Add your first article!</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
