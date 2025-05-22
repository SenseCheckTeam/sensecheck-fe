import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

// Komponen
import BackButton from '../components/BackButton';
import { contentAPI } from '../services/api/api'; // pastikan path ini benar

function DiagnosisForm() {
  const { senseType } = useParams();
  const navigate = useNavigate();

  const [diagnosisText, setDiagnosisText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [senseData, setSenseData] = useState(null);

  useEffect(() => {
    async function fetchIndra() {
      try {
        const response = await contentAPI.getPancaIndra();
        const data = response.data;

        // Pastikan senseType valid (peraba, penciuman, dst)
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

    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 1000)); // simulasi submit

      navigate('/diagnosis-result', {
        state: {
          senseType,
          diagnosisText
        }
      });
    } catch (err) {
      setError('Terjadi kesalahan saat memproses diagnosis. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p style={{ padding: '1rem' }}>{error}</p>;
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
