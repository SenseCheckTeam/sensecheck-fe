import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import '../App.css';

function History() {
  const { user } = useAuth();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading history data
    // In a real app, you would fetch this from an API
    const loadHistory = () => {
      setTimeout(() => {
        // Mock data for demonstration
        const mockHistory = [
          {
            id: 1,
            senseType: 'Penglihatan',
            disease: 'Katarak',
            date: '2024-01-15',
            percentage: 99
          },
          {
            id: 2,
            senseType: 'Pendengaran',
            disease: 'Tinnitus',
            date: '2024-01-10',
            percentage: 85
          },
          {
            id: 3,
            senseType: 'Penciuman',
            disease: 'Anosmia',
            date: '2024-01-05',
            percentage: 92
          }
        ];
        setHistoryData(mockHistory);
        setLoading(false);
      }, 1000);
    };

    loadHistory();
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
                  <h3>{item.senseType}</h3>
                  <span className="history-date">{item.date}</span>
                </div>
                <div className="history-item-content">
                  <div className="history-result">
                    <div className="disease-info">
                      <span className="disease-name">{item.disease}</span>
                      <span className="disease-percentage">Persentase: {item.percentage}%</span>
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
