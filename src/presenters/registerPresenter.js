import { authAPI } from '../services/api/api';

export async function handleRegister(form, setLoading, setError, navigate) {
  const { username, email, password, confirmPassword } = form;

  if (!username || !email || !password || !confirmPassword) {
    setError('Mohon isi semua kolom');
    return;
  }

  if (password !== confirmPassword) {
    setError('Password tidak cocok');
    return;
  }

  if (password.length < 8) {
    setError('Password harus minimal 8 karakter');
    return;
  }

  try {
    setLoading(true);
    setError(null);

    await authAPI.register({ name: username, email, password });

    navigate('/login', {
      state: { message: 'Registrasi berhasil! Silakan login.' }
    });
  } catch (err) {
    setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
  } finally {
    setLoading(false);
  }
}
