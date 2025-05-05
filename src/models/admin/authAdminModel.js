import { authAPI } from '../../services/api/api';

export const adminLogin = async ({ email, password }) => {
  return await authAPI.adminLogin({ email, password });
};
