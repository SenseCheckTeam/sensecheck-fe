import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';

// Import komponen
import BackButton from '../components/BackButton';

function DiagnosisResult() {
  const location = useLocation();
  const { senseType, diagnosisText } = location.state || {};
  
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login kembali.');
        }

        // 1. Ambil data diagnosis terakhir dari /diagnosa
        const diagnosisResponse = await fetch(`${import.meta.env.VITE_API_URL}/diagnosa`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!diagnosisResponse.ok) {
          throw new Error(`Gagal mengambil data diagnosis: ${diagnosisResponse.status}`);
        }

        const diagnosisData = await diagnosisResponse.json();
        console.log('Diagnosis data:', diagnosisData);

        // Ambil data terakhir (-1)
        const latestDiagnosis = diagnosisData.data[0];

        console.log('Latest:', diagnosisData.data.length - 1);
        
        console.log('Latest diagnosis:', latestDiagnosis);
        if (!latestDiagnosis) {
          throw new Error('Data diagnosis tidak ditemukan');
        }

        // 2. Ambil data penyakit berdasarkan diagnosis name
        const penyakitResponse = await fetch(`${import.meta.env.VITE_API_URL}/penyakit`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!penyakitResponse.ok) {
          throw new Error(`Gagal mengambil data penyakit: ${penyakitResponse.status}`);
        }

        const penyakitList = await penyakitResponse.json();
        console.log('Penyakit list:', penyakitList);

        // Cari penyakit yang sesuai dengan diagnosis
        const matchedPenyakit = penyakitList.data.find(
          penyakit => penyakit.name.toLowerCase() === latestDiagnosis.diagnosis.toLowerCase()
        );

        if (!matchedPenyakit) {
          throw new Error(`Penyakit dengan nama "${latestDiagnosis.diagnosis}" tidak ditemukan`);
        }

        // 3. Ambil detail penyakit berdasarkan ID
        const penyakitDetailResponse = await fetch(`${import.meta.env.VITE_API_URL}/penyakit/${matchedPenyakit.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!penyakitDetailResponse.ok) {
          throw new Error(`Gagal mengambil detail penyakit: ${penyakitDetailResponse.status}`);
        }

        const penyakitDetail = await penyakitDetailResponse.json();
        console.log('Penyakit detail:', penyakitDetail);

        // 4. Gabungkan data untuk hasil diagnosis
        const result = {
          title: latestDiagnosis.diagnosis,
          probability: latestDiagnosis.confidence,
          image: penyakitDetail.data.imageUrl,
          description: penyakitDetail.data.description,
          recommendations: latestDiagnosis.saran
        };

        setDiagnosisResult(result);

      } catch (err) {
        console.error('Error fetching diagnosis data:', err);
        setError(err.message || 'Terjadi kesalahan saat mengambil data diagnosis');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosisData();
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
