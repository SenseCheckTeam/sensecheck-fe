import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import '../App.css';

function History() {
  const { user } = useAuth();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login kembali.');
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/diagnosa`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil riwayat diagnosis: ${response.status}`);
        }

        const result = await response.json();
        console.log('History data from API:', result);
        
        // Transformasi data sesuai format yang dibutuhkan komponen
        const transformedData = result.data.map((item) => ({
          id: item.id,
          senseType: 'Diagnosis', // Atau Anda bisa menambahkan mapping berdasarkan diagnosis
          disease: item.diagnosis,
          date: new Date(item.createdAt).toLocaleDateString('id-ID'),
          percentage: parseFloat(item.confidence.replace('%', '')),
          saran: item.saran,
          createdAt: item.createdAt
        }));

        setHistoryData(transformedData);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError(err.message || 'Terjadi kesalahan saat mengambil riwayat diagnosis');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-container">
        <div className="history-content">
          <BackButton />
          <h1 className="history-title">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-container">
        <div className="history-content">
          <BackButton />
          <h1 className="history-title">Error</h1>
          <p className="history-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>

        <h1 className="history-title">Riwayat Diagnosis</h1>
        <p className="history-subtitle">Halo {user?.name}, berikut adalah riwayat diagnosis Anda</p>

        {historyData.length === 0 ? (
          <div className="history-empty">
            <p>Belum ada riwayat diagnosis</p>
            <p>Mulai diagnosis pertama Anda sekarang!</p>
          </div>
        ) : (
          <div className="history-list">
            {historyData.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-item-header">
                  <h3>{item.disease}</h3>
                  <span className="history-date">{item.date}</span>
                </div>
                <div className="history-item-content">
                  <div className="history-result">
                    <div className="disease-info">
                      <span className="disease-name">Confidence: {item.percentage}%</span>
                      <span className="disease-saran">Saran: {item.saran}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
