import { useState, useEffect } from 'react';
import { contentAPI, diagnosisAPI } from '../services/api/api';

export function useDiagnosisPresenter(senseType, navigate) {
  const [diagnosisText, setDiagnosisText] = useState('');
  const [severity, setSeverity] = useState('');
  const [history, setHistory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [senseData, setSenseData] = useState(null);

  useEffect(() => {
    async function fetchSenseData() {
      try {
        const response = await contentAPI.getPancaIndra();
        const data = response.data;
        const selectedSense = data[senseType];
        if (!selectedSense) {
          setError('Indra tidak ditemukan');
        } else {
          setSenseData(selectedSense);
        }
      } catch {
        setError('Gagal memuat data indra dari server');
      }
    }

    fetchSenseData();
  }, [senseType]);

  const getSenseCategory = (type) => {
    const mapping = {
      peraba: 'kulit',
      penciuman: 'hidung',
      pengecapan: 'lidah',
      penglihatan: 'mata',
      pendengaran: 'telinga'
    };
    return mapping[type] || type;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!diagnosisText.trim()) return setError('Mohon masukkan deskripsi gejala');
    if (!severity) return setError('Mohon pilih tingkat keparahan');
    if (!history) return setError('Mohon pilih apakah ada riwayat serupa sebelumnya');

    try {
      setLoading(true);
      setError(null);

      const kategori = getSenseCategory(senseType);
      const modelPayload = {
        kategori,
        gejala: diagnosisText,
        keparahan: severity,
        riwayat: history
      };

      // Gunakan API dari diagnosisAPI
      const modelResult = await diagnosisAPI.getDiagnosisResult(modelPayload);

      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID tidak ditemukan. Silakan login kembali.');

      const diagnosisPayload = {
        userId,
        diagnosis: modelResult.diagnosis,
        saran: modelResult.saran,
        confidence: modelResult.confidence
      };

      const backendResult = await diagnosisAPI.saveDiagnosisToBackend(diagnosisPayload);

      navigate('/diagnosis-result', {
        state: {
          senseType,
          diagnosisText,
          severity,
          history,
          kategori,
          modelResult,
          backendResult
        }
      });

    } catch (err) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat memproses diagnosis.');
    } finally {
      setLoading(false);
    }
  };

  return {
    diagnosisText,
    severity,
    history,
    loading,
    error,
    senseData,
    setDiagnosisText,
    setSeverity,
    setHistory,
    handleSubmit
  };
}
