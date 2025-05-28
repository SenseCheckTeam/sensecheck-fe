import { adminAPI } from '../services/api/api';

export const heroPresenter = {
  initializeFormData(data) {
    if (!data || data.length === 0) return {
      title: '',
      description: '',
      textButton: '',
      buttonUrl: '',
      photo: null,
      imageUrl: '',
    };

    const hero = data[0];
    return {
      title: hero.title || '',
      description: hero.description || '',
      textButton: hero.textButton || '',
      buttonUrl: hero.buttonUrl || '',
      photo: null,
      imageUrl: hero.imageUrl || '',
    };
  },

  handleInputChange(e, formData, setFormData) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  },

  handleFileChange(e, formData, setFormData, setPreviewUrl) {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  },

  async handleSubmit({ formData, data, setLoading, setShowForm, onDataChange }) {
    setLoading(true);
    try {
      const formDataObj = new FormData();
  
      // Append form data fields
      const fields = ['title', 'description', 'textButton', 'buttonUrl'];
      fields.forEach((field) => {
        if (formData[field]) {
          formDataObj.append(field, formData[field]);
        }
      });
  
      // Append photo if exists
      if (formData.photo) {
        formDataObj.append('photo', formData.photo);
      }
  
      const heroId = data?.[0]?.id ?? null;
  
      await adminAPI.uploadHero(formDataObj, heroId);
  
      alert(heroId ? 'Hero updated successfully!' : 'Hero created successfully!');
      setShowForm(false);
      onDataChange();
    } catch (err) {
      console.error('Error saving hero:', err);
      alert(`Failed to save hero: ${err.message}`);
    } finally {
      setLoading(false);
    }
  },

  getFormMode(data) {
    return data?.length > 0 ? 'edit' : 'add';
  },

  getToggleFormLabel(showForm, data) {
    if (showForm) return 'Cancel';
    return this.getFormMode(data) === 'edit' ? 'Edit Hero' : 'Add Hero';
  },

  getFormTitle(data) {
    return this.getFormMode(data) === 'edit' ? 'Edit Hero' : 'Add New Hero';
  },

  getSubmitButtonLabel(loading, data) {
    if (loading) return 'Saving...';
    return this.getFormMode(data) === 'edit' ? 'Update Hero' : 'Create Hero';
  }
};
