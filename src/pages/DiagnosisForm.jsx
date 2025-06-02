import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

// Komponen
import BackButton from '../components/BackButton';
import { contentAPI } from '../services/api/api';

function DiagnosisForm() {
  const { senseType } = useParams();
  const navigate = useNavigate();

  const [diagnosisText, setDiagnosisText] = useState('');
  const [severity, setSeverity] = useState('');
  const [history, setHistory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [senseData, setSenseData] = useState(null);

  useEffect(() => {
    async function fetchIndra() {
      try {
        const response = await contentAPI.getPancaIndra();
        const data = response.data;

        const selectedSense = data[senseType];
        if (!selectedSense) {
          setError('Indra tidak ditemukan');
        } else {
          setSenseData(selectedSense);
        }
      } catch (err) {
        setError('Gagal memuat data indra dari server');
      }
    }

    fetchIndra();
  }, [senseType]);

  // Mapping senseType ke kategori untuk API model
  const getSenseCategory = (senseType) => {
    const mapping = {
      'peraba': 'kulit',
      'penciuman': 'hidung',
      'pengecapan': 'lidah',
      'penglihatan': 'mata',
      'pendengaran': 'telinga'
    };
    return mapping[senseType] || senseType;
  };

  const getPlaceholderText = () => {
    switch (senseType) {
      case 'peraba':
        return 'Jelaskan apa yang Anda rasakan melalui sentuhan...';
      case 'penciuman':
        return 'Jelaskan apa yang Anda cium...';
      case 'pendengaran':
        return 'Jelaskan apa yang Anda dengar...';
      case 'penglihatan':
        return 'Jelaskan apa yang Anda lihat...';
      case 'pengecapan':
        return 'Jelaskan apa yang Anda rasakan melalui pengecapan...';
      default:
        return 'Jelaskan gejala Anda...';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!diagnosisText.trim()) {
      setError('Mohon masukkan deskripsi gejala');
      return;
    }

    if (!severity) {
      setError('Mohon pilih tingkat keparahan');
      return;
    }

    if (!history) {
      setError('Mohon pilih apakah ada riwayat serupa sebelumnya');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. Kirim data ke API Model untuk prediksi
      const kategori = getSenseCategory(senseType);
      const modelPayload = {
        kategori,
        gejala: diagnosisText,
        keparahan: severity,
        riwayat: history
      };

      console.log('Sending to model API:', modelPayload);

      const modelResponse = await fetch(`${import.meta.env.VITE_API_MODEL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelPayload)
      });

      if (!modelResponse.ok) {
        throw new Error(`Model API error: ${modelResponse.status}`);
      }

      const modelResult = await modelResponse.json();
      console.log('Model API response:', modelResult);

      // 2. Kirim hasil diagnosis ke backend utama
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage
      
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      if (!userId) {
        throw new Error('User ID tidak ditemukan. Silakan login kembali.');
      }

      // disini
      const diagnosisPayload = {
        userId, // Tambahkan userId ke payload
        diagnosis: modelResult.diagnosis, // Menyertakan hasil dari model
        saran: modelResult.saran, // Menyertakan saran jika ada
        confidence: modelResult.confidence // Menyertakan kepercayaan dari model
      };

      console.log('Sending to backend API:', diagnosisPayload);

      const backendResponse = await fetch(`${import.meta.env.VITE_API_URL}/diagnosa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(diagnosisPayload)
      });

      if (!backendResponse.ok) {
        const errorData = await backendResponse.json();
        throw new Error(errorData.message || `Backend API error: ${backendResponse.status}`);
      }

      const backendResult = await backendResponse.json();
      console.log('Backend API response:', backendResult);

      // 3. Navigate ke halaman hasil dengan data lengkap
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
      console.error('Diagnosis error:', err);
      setError(err.message || 'Terjadi kesalahan saat memproses diagnosis. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (error && !senseData) return <p style={{ padding: '1rem' }}>{error}</p>;
  if (!senseData) return <p style={{ padding: '1rem' }}>Memuat data...</p>;

  return (
    <div className="diagnosis-form-container">
      <div className="diagnosis-form-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>

        <div className="diagnosis-form-header">
          {senseData.logoUrl && (
            <div className="diagnosis-form-icon-wrapper">
              <img
                src={senseData.logoUrl}
                alt={senseData.title}
                className="diagnosis-form-icon"
              />
            </div>
          )}
          <h1 className="diagnosis-form-title">
            Diagnosis {senseData.title}
          </h1>
        </div>

        {error && <div className="diagnosis-form-error">{error}</div>}

        <form className="diagnosis-form" onSubmit={handleSubmit}>
          <div className="diagnosis-form-group">
            <label htmlFor="diagnosisText">Jelaskan gejala Anda:</label>
            <textarea
              id="diagnosisText"
              value={diagnosisText}
              onChange={(e) => setDiagnosisText(e.target.value)}
              placeholder={getPlaceholderText()}
              rows={8}
              disabled={loading}
              required
            />
          </div>

          {/* Field Keparahan */}
          <div className="diagnosis-form-group">
            <label className="diagnosis-form-label">Tingkat Keparahan:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="severity"
                  value="ringan"
                  checked={severity === 'ringan'}
                  onChange={(e) => setSeverity(e.target.value)}
                  disabled={loading}
                />
                <span className="radio-text">Ringan</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="severity"
                  value="sedang"
                  checked={severity === 'sedang'}
                  onChange={(e) => setSeverity(e.target.value)}
                  disabled={loading}
                />
                <span className="radio-text">Sedang</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="severity"
                  value="berat"
                  checked={severity === 'berat'}
                  onChange={(e) => setSeverity(e.target.value)}
                  disabled={loading}
                />
                <span className="radio-text">Berat</span>
              </label>
            </div>
          </div>

          {/* Field Riwayat */}
          <div className="diagnosis-form-group">
            <label className="diagnosis-form-label">Apakah ada riwayat gejala serupa sebelumnya?</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="history"
                  value="ya"
                  checked={history === 'ya'}
                  onChange={(e) => setHistory(e.target.value)}
                  disabled={loading}
                />
                <span className="radio-text">Ya</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="history"
                  value="tidak"
                  checked={history === 'tidak'}
                  onChange={(e) => setHistory(e.target.value)}
                  disabled={loading}
                />
                <span className="radio-text">Tidak</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="diagnosis-form-button"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Diagnosa Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiagnosisForm;
