import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import BackButton from '../components/BackButton';
import { contentAPI } from '../services/api/api'; // pastikan path ini benar

function Diagnosis() {
  const [indraList, setIndraList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchIndra() {
      try {
        setLoading(true);
        const response = await contentAPI.getPancaIndra();
        const data = response.data;

        // Konversi object menjadi array
        const arrayIndra = [
          { key: 'peraba', ...data.peraba },
          { key: 'penciuman', ...data.penciuman },
          { key: 'pendengaran', ...data.pendengaran },
          { key: 'penglihatan', ...data.penglihatan },
          { key: 'pengecapan', ...data.pengecapan }
        ];

        setIndraList(arrayIndra);
      } catch (err) {
        setError('Gagal memuat data panca indra');
      } finally {
        setLoading(false);
      }
    }

    fetchIndra();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="diagnosis-container">
      <div className="diagnosis-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>
        <h1 className="diagnosis-title">Pilih Indra untuk di diagnosa</h1>

        <div className="diagnosis-sensory-icons">
          {indraList.map((sense) => (
            <Link
              key={sense.id}
              to={`/diagnosis/${sense.key}`}
              className="diagnosis-sensory-item"
            >
              <div className="diagnosis-sensory-icon-wrapper">
                <img src={sense.logoUrl} alt={sense.title} className="diagnosis-sensory-icon" />
              </div>
              <p className="diagnosis-sensory-name">{sense.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
