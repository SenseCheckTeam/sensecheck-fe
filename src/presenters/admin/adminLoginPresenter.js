import { adminLogin } from '../../models/admin/authAdminModel';

export const handleAdminLogin = async ({ email, password, setLoading, setError, navigate }) => {
  if (!email || !password) {
    setError('Please enter both email and password');
    return { success: false, error: 'Validation failed' };
  }

  try {
    setLoading(true);
    setError(null);

    const response = await adminLogin({ email, password });

    localStorage.setItem('adminToken', response.loginResult.token);
    localStorage.setItem('adminId', response.loginResult.adminId);
    localStorage.setItem('adminName', response.loginResult.name);

    navigate('/admin');

    return { success: true };
  } catch (err) {
    const errorMsg = err.message || 'Login failed. Please check your credentials.';
    setError(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    setLoading(false);
  }
};
