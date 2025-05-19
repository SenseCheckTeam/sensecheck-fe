import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Import komponen
import BackButton from '../components/BackButton';

// Import sensory icons
import perabaIcon from '../assets/icons/peraba.png';
import pendengaranIcon from '../assets/icons/pendengaran.png';
import penglihatanIcon from '../assets/icons/penglihatan.png';
import penciumanIcon from '../assets/icons/penciuman.png';
import pengecapanIcon from '../assets/icons/pengecapan.png';

function Diagnosis() {
  // Sensory data
  const sensoryData = [
    { id: 1, name: 'Peraba', icon: perabaIcon, route: 'peraba' },
    { id: 2, name: 'Penciuman', icon: penciumanIcon, route: 'penciuman' },
    { id: 3, name: 'Pendengaran', icon: pendengaranIcon, route: 'pendengaran' },
    { id: 4, name: 'Penglihatan', icon: penglihatanIcon, route: 'penglihatan' },
    { id: 5, name: 'Pengecapan', icon: pengecapanIcon, route: 'pengecapan' },
  ];

  return (
    <div className="diagnosis-container">
      <div className="diagnosis-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton />
        </div>
        <h1 className="diagnosis-title">Pilih Indra untuk di diagnosa</h1>

        <div className="diagnosis-sensory-icons">
          {sensoryData.map((sense) => (
            <Link
              key={sense.id}
              to={`/diagnosis/${sense.route}`}
              className="diagnosis-sensory-item"
            >
              <div className="diagnosis-sensory-icon-wrapper">
                <img src={sense.icon} alt={sense.name} className="diagnosis-sensory-icon" />
              </div>
              <p className="diagnosis-sensory-name">{sense.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
