import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import { useDiagnosisPresenter } from '../presenters/diagnosisPresenter';


function DiagnosisForm() {
  const { senseType } = useParams();
  const navigate = useNavigate();

  const {
    diagnosisText,
    severity,
    history,
    loading,
    error,
    senseData,
    setDiagnosisText,
    setSeverity,
    setHistory,
    handleSubmit,
  } = useDiagnosisPresenter(senseType, navigate);

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
          <h1 className="diagnosis-form-title">Diagnosis {senseData.title}</h1>
        </div>

        {error && <div className="diagnosis-form-error">{error}</div>}

        <form className="diagnosis-form" onSubmit={handleSubmit}>
          <div className="diagnosis-form-group">
            <label htmlFor="diagnosisText">Jelaskan gejala Anda:</label>
            <textarea
              id="diagnosisText"
              value={diagnosisText}
              onChange={(e) => setDiagnosisText(e.target.value)}
              placeholder="Ceritakan gejala yang Anda alami..."
              rows={8}
              disabled={loading}
              required
            />
          </div>

          <div className="diagnosis-form-group">
            <label className="diagnosis-form-label">Tingkat Keparahan:</label>
            <div className="radio-group">
              {['ringan', 'sedang', 'berat'].map((level) => (
                <label className="radio-option" key={level}>
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={severity === level}
                    onChange={(e) => setSeverity(e.target.value)}
                    disabled={loading}
                  />
                  <span className="radio-text">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="diagnosis-form-group">
            <label className="diagnosis-form-label">
              Apakah ada riwayat gejala serupa sebelumnya?
            </label>
            <div className="radio-group">
              {['ya', 'tidak'].map((option) => (
                <label className="radio-option" key={option}>
                  <input
                    type="radio"
                    name="history"
                    value={option}
                    checked={history === option}
                    onChange={(e) => setHistory(e.target.value)}
                    disabled={loading}
                  />
                  <span className="radio-text">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
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
