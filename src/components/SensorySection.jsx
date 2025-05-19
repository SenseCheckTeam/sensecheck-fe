import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Import sensory icons
import perabaIcon from '../assets/icons/peraba.png';
import pendengaranIcon from '../assets/icons/pendengaran.png';
import penglihatanIcon from '../assets/icons/penglihatan.png';
import penciumanIcon from '../assets/icons/penciuman.png';
import pengecapanIcon from '../assets/icons/pengecapan.png';

function SensorySection({ title = "Macam-macam Indra", sensoryItems }) {
  // Default sensory data if none provided
  const defaultSensoryData = [
    { id: 1, name: 'Peraba', icon: perabaIcon },
    { id: 2, name: 'Pendengaran', icon: pendengaranIcon },
    { id: 3, name: 'Penglihatan', icon: penglihatanIcon },
    { id: 4, name: 'Penciuman', icon: penciumanIcon },
    { id: 5, name: 'Pengecapan', icon: pengecapanIcon },
  ];

  // Use provided sensory items or default
  const sensoryData = sensoryItems || defaultSensoryData;

  return (
    <section className="sensory-section">
      <h2 className="section-title">{title}</h2>
      <h3 className="sensory-subtitle">Ketuk untuk mempelajari panca indra yang dipilih</h3>
      <div className="sensory-icons">
        {sensoryData.map((sense) => (
          <Link
            key={sense.id}
            to={`/${sense.name.toLowerCase()}`}
            className="sensory-item"
          >
            <div className="sensory-icon-wrapper">
              <img src={sense.icon} alt={sense.name} className="sensory-icon" />
            </div>
            <p className="sensory-name">{sense.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SensorySection;
