import { diagnosisAPI } from '../services/api/api';

export async function loadHistory({ setLoading, setError, setHistoryData }) {
  try {
    setLoading(true);
    const data = await diagnosisAPI.getHistoryData();
    setHistoryData(data);
  } catch (err) {
    setError(err.message || 'Terjadi kesalahan saat mengambil riwayat diagnosis');
  } finally {
    setLoading(false);
  }
}
