import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

// Import komponen
import BackButton from '../components/BackButton';

// Import sensory icons
import perabaIcon from '../assets/icons/peraba.png';
import pendengaranIcon from '../assets/icons/pendengaran.png';
import penglihatanIcon from '../assets/icons/penglihatan.png';
import penciumanIcon from '../assets/icons/penciuman.png';
import pengecapanIcon from '../assets/icons/pengecapan.png';

function DiagnosisForm() {
  const { senseType } = useParams();
  const navigate = useNavigate();
  const [diagnosisText, setDiagnosisText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Map sense type to icon and title
  const sensoryInfo = {
    peraba: { icon: perabaIcon, title: 'Peraba' },
    penciuman: { icon: penciumanIcon, title: 'Penciuman' },
    pendengaran: { icon: pendengaranIcon, title: 'Pendengaran' },
    penglihatan: { icon: penglihatanIcon, title: 'Penglihatan' },
    pengecapan: { icon: pengecapanIcon, title: 'Pengecapan' },
  };

  // Get current sense info
  const currentSense = sensoryInfo[senseType] || { icon: null, title: 'Tidak Ditemukan' };

  // Placeholder text based on sense type
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

      // Here you would typically send the diagnosis text to your API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to the diagnosis result page
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

  return (
    <div className="diagnosis-form-container">
      <div className="diagnosis-form-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>
        <div className="diagnosis-form-header">
          {currentSense.icon && (
            <div className="diagnosis-form-icon-wrapper">
              <img
                src={currentSense.icon}
                alt={currentSense.title}
                className="diagnosis-form-icon"
              />
            </div>
          )}
          <h1 className="diagnosis-form-title">
            Diagnosis {currentSense.title}
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
