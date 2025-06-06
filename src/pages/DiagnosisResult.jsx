import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { loadDiagnosisResult } from '../presenters/diagnosisResultPresenter';
import '../App.css';

function DiagnosisResult() {
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDiagnosisResult({ setDiagnosisResult, setError, setLoading });
  }, []);
  

  if (loading) {
    return (
      <div className="diagnosis-result-container">
        <BackButton />
        <div className="diagnosis-result-content">
          <p style={{ padding: '2rem', textAlign: 'center' }}>Memuat hasil diagnosis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="diagnosis-result-container">
        <BackButton />
        <div className="diagnosis-result-content">
          <div className="diagnosis-form-error" style={{ margin: '2rem 0' }}>
            {error}
          </div>
          <Link to="/diagnosis" className="diagnosis-result-button">
            Kembali ke Diagnosis
          </Link>
        </div>
      </div>
    );
  }

  if (!diagnosisResult) {
    return (
      <div className="diagnosis-result-container">
        <BackButton />
        <div className="diagnosis-result-content">
          <p style={{ padding: '2rem', textAlign: 'center' }}>Data diagnosis tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnosis-result-container">
      <BackButton />
      <div className="diagnosis-result-content">
        <h2 className="diagnosis-result-heading">Hasil Diagnosis</h2>

        <div className="diagnosis-result-title">
          <h1>{diagnosisResult.title}</h1>
          <p className="diagnosis-result-probability">
            Dengan Kemungkinan: <span>{diagnosisResult.probability}</span>
          </p>
        </div>

        {diagnosisResult.image && (
          <div className="diagnosis-result-image-container">
            <img
              src={diagnosisResult.image}
              alt={diagnosisResult.title}
              className="diagnosis-result-image"
            />
          </div>
        )}

        <div className="diagnosis-result-description">
          <p>{diagnosisResult.description}</p>
        </div>

        <div className="diagnosis-result-recommendations">
          <h3>Saran Penanganan Pertama</h3>
          <p>{diagnosisResult.recommendations}</p>
        </div>

        <div className="diagnosis-result-actions">
          <Link to="/" className="diagnosis-result-button home-button">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisResult;
