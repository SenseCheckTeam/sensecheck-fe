import React from 'react';
import { authAPI } from '../services/api/api';

// adminLoginPresenter.js (tanpa menerima formData langsung)
export const useAdminLoginPresenter = (setLoading, setError) => {
    const [formData, setFormData] = React.useState({ email: '', password: '' });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      if (!formData.email || !formData.password) {
        setError('Email dan password harus diisi');
        return;
      }
  
      try {
        setLoading(true);
        const data = await authAPI.adminLogin({ email: formData.email, password: formData.password });
        localStorage.setItem('adminToken', data.loginResult.token);
        localStorage.setItem('adminId', data.loginResult.adminId);
        localStorage.setItem('adminName', data.loginResult.name);
        return { success: true };
      } catch (err) {
        setError(err.message || 'Login gagal. Silakan coba lagi.');
        return { success: false };
      } finally {
        setLoading(false);
      }
    };
  
    return {
      formData,
      handleInputChange,
      handleSubmit,
    };
  };
  
