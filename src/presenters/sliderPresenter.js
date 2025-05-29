import { contentAPI } from '../services/api/api';

export const sliderPresenter = {
  load: async (setSliders, setLoading, setError) => {
    try {
      setLoading(true);
      const res = await contentAPI.getSliders();
      setSliders(res.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading sliders:', err);
      setError('Failed to load sliders. Please try again.');
    } finally {
      setLoading(false);
    }
  },

  submit: async ({ formData, editingId, setLoading, onDataChange, reload }) => {
    try {
      setLoading(true);
      const formDataObj = new FormData();
      if (formData.photo) {
        formDataObj.append('photo', formData.photo);
      }

      const adminToken = localStorage.getItem('adminToken');
      const url = import.meta.env.VITE_API_URL + (editingId ? `/admin/sliders/${editingId}` : '/admin/sliders');
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: formDataObj
      });

      const data = await res.json();

      if (data.error) throw new Error(data.message);

      reload();
      alert(editingId ? 'Slider updated successfully!' : 'Slider added successfully!');
      onDataChange();
      return true;
    } catch (err) {
      console.error('Error saving slider:', err);
      alert(`Failed to save slider: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  },

  delete: async ({ id, setLoading, onDataChange, reload }) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;

    try {
      setLoading(true);
      const adminToken = localStorage.getItem('adminToken');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/sliders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });

      const data = await res.json();
      if (data.error) throw new Error(data.message);

      reload();
      alert('Slider deleted successfully!');
      onDataChange();
    } catch (err) {
      console.error('Error deleting slider:', err);
      alert(`Failed to delete slider: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
};
