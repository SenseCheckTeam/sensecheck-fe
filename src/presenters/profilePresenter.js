import { userAPI } from '../services/api/api';

export async function updateProfile(formData, user, login, setLoading) {
  const { name, email, password } = formData;

  if (!name.trim()) return { success: false, message: 'Nama tidak boleh kosong' };
  if (!email.trim()) return { success: false, message: 'Email tidak boleh kosong' };
  if (!password.trim()) return { success: false, message: 'Password tidak boleh kosong' };
  if (password.length < 8) return { success: false, message: 'Password harus minimal 8 karakter' };

  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) return { success: false, message: 'Token tidak ditemukan. Silakan login kembali.' };

    const updatePayload = { name, email, password };
    const _data = await userAPI.updateProfile(token, updatePayload);

    // Update AuthContext
    login({ token, userId: user.userId, name, email });

    return { success: true, message: 'Profile berhasil diperbarui!' };
  } catch (err) {
    return { success: false, message: err.message || 'Terjadi kesalahan saat memperbarui profil' };
  } finally {
    setLoading(false);
  }
}
