import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import DiagnosisPresenter from '../presenters/diagnosisPresenter';

function DiagnosisForm() {
  const { senseType } = useParams();
  const navigate = useNavigate();
  const presenter = new DiagnosisPresenter(senseType, navigate);

  const [state, setState] = useState(presenter.initialState);

  useEffect(() => {
    presenter.setView(setState);
    presenter.loadSenseData();
  }, []);

  if (state.error && !state.senseData) return <p style={{ padding: '1rem' }}>{state.error}</p>;
  if (!state.senseData) return <p style={{ padding: '1rem' }}>Memuat data...</p>;

  return (
    <div className="diagnosis-form-container">
      <div className="diagnosis-form-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>

        <div className="diagnosis-form-header">
          {state.senseData.logoUrl && (
            <div className="diagnosis-form-icon-wrapper">
              <img
                src={state.senseData.logoUrl}
                alt={state.senseData.title}
                className="diagnosis-form-icon"
              />
            </div>
          )}
          <h1 className="diagnosis-form-title">
            Diagnosis {state.senseData.title}
          </h1>
        </div>

        {state.error && <div className="diagnosis-form-error">{state.error}</div>}

        <form className="diagnosis-form" onSubmit={presenter.handleSubmit}>
          <div className="diagnosis-form-group">
            <label htmlFor="diagnosisText">Jelaskan gejala Anda:</label>
            <textarea
              id="diagnosisText"
              value={state.diagnosisText}
              onChange={(e) => presenter.updateField('diagnosisText', e.target.value)}
              placeholder={presenter.getPlaceholderText()}
              rows={8}
              disabled={state.loading}
              required
            />
          </div>

          <div className="diagnosis-form-group">
            <label className="diagnosis-form-label">Tingkat Keparahan:</label>
            <div className="radio-group">
              {['ringan', 'sedang', 'berat'].map(level => (
                <label className="radio-option" key={level}>
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={state.severity === level}
                    onChange={(e) => presenter.updateField('severity', e.target.value)}
                    disabled={state.loading}
                  />
                  <span className="radio-text">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="diagnosis-form-group">
            <label className="diagnosis-form-label">Apakah ada riwayat gejala serupa sebelumnya?</label>
            <div className="radio-group">
              {['ya', 'tidak'].map(option => (
                <label className="radio-option" key={option}>
                  <input
                    type="radio"
                    name="history"
                    value={option}
                    checked={state.history === option}
                    onChange={(e) => presenter.updateField('history', e.target.value)}
                    disabled={state.loading}
                  />
                  <span className="radio-text">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="diagnosis-form-button"
            disabled={state.loading}
          >
            {state.loading ? 'Memproses...' : 'Diagnosa Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiagnosisForm;
