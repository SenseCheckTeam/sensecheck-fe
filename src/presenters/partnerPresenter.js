import { adminAPI } from '../services/api/api';

const handleFileChange = (e, setFormData, setPreviewUrl) => {
  const file = e.target.files[0];
  if (file) {
    setFormData({ photo: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async ({ formData, setLoading, setShowForm, setFormData, setPreviewUrl, onDataChange }) => {
  if (!formData.photo) {
    alert('Please select an image');
    return;
  }

  try {
    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append('photo', formData.photo);

    const result = await adminAPI.addPartner(formDataObj);

    if (result.error) throw new Error(result.message);

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

const handleDelete = async ({ partnerId, setLoading, onDataChange }) => {
  if (!window.confirm('Are you sure you want to delete this partner?')) return;

  try {
    setLoading(true);

    const result = await adminAPI.deletePartner(partnerId);

    if (result.error) throw new Error(result.message);

    alert('Partner deleted successfully!');
    onDataChange();
  } catch (err) {
    console.error('Error deleting partner:', err);
    alert(`Failed to delete partner: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

export default {
  handleFileChange,
  handleSubmit,
  handleDelete
};
