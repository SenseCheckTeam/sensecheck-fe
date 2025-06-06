import { authAPI } from '../services/api/api';

export async function handleLogin({
  email,
  password,
  setLoading,
  setError,
  login,
  navigate,
  from
}) {
  if (!email || !password) {
    setError('Mohon masukkan email dan password');
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const response = await authAPI.login({ email, password });

    login({
      token: response.loginResult.token,
      userId: response.loginResult.userId,
      name: response.loginResult.name,
      email: email
    });

    navigate(from, { replace: true });
  } catch (err) {
    setError(err.message || 'Login gagal. Silakan periksa kredensial Anda.');
  } finally {
    setLoading(false);
  }
}
