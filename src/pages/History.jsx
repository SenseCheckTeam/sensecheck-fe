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
            date: '2024-01-15',
            result: 'Normal',
            score: 85
          },
          {
            id: 2,
            senseType: 'Pendengaran',
            date: '2024-01-10',
            result: 'Perlu Perhatian',
            score: 65
          },
          {
            id: 3,
            senseType: 'Penciuman',
            date: '2024-01-05',
            result: 'Normal',
            score: 90
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
                    <span className={`result-badge ${item.result === 'Normal' ? 'normal' : 'warning'}`}>
                      {item.result}
                    </span>
                    <span className="history-score">Skor: {item.score}/100</span>
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
