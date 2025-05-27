import { adminAPI } from '../services/api/api';

export const adminPresenter = {
  isAdminLoggedIn: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  loadDashboardData: async ({ onLoading, onSuccess, onError }) => {
    onLoading(true);
    try {
      const data = await adminAPI.getDashboard();
      onSuccess(data.data);
    } catch (error) {
      console.error('Load dashboard error:', error);
      onError('Failed to load dashboard data. Please try again.');
    } finally {
      onLoading(false);
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
  },
};
