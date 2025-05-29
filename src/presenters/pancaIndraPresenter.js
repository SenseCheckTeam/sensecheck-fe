import { adminAPI } from '../services/api/api';

export function loadPancaIndra(data, selectedIndra, setFormData, setPreviewUrls) {
  const item = data?.[selectedIndra];
  if (item) {
    setFormData({
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      buttonUrl: item.buttonUrl || '',
      logoPhoto: null,
      imagePhoto: null
    });
    setPreviewUrls({
      logo: item.logoUrl || '',
      image: item.imageUrl || ''
    });
  }
}

export async function updatePancaIndra(formData, selectedIndra, data, onDataChange, setShowForm) {
  try {
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('subtitle', formData.subtitle);
    formDataObj.append('description', formData.description);
    formDataObj.append('buttonUrl', formData.buttonUrl);
    if (formData.logoPhoto) formDataObj.append('logoPhoto', formData.logoPhoto);
    if (formData.imagePhoto) formDataObj.append('imagePhoto', formData.imagePhoto);

    const indraId = data?.[selectedIndra]?.id;

    const _result = await adminAPI.updatePancaIndra(selectedIndra, indraId, formDataObj);

    alert(`${selectedIndra} updated successfully!`);
    setShowForm(false);
    onDataChange();
  } catch (err) {
    console.error('Error updating:', err);
    alert(`Failed to save ${selectedIndra}: ${err.message}`);
  }
}
