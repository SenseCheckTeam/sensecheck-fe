import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Import sensory icons
import perabaIcon from '../assets/icons/peraba.png';
import pendengaranIcon from '../assets/icons/pendengaran.png';
import penglihatanIcon from '../assets/icons/penglihatan.png';
import penciumanIcon from '../assets/icons/penciuman.png';
import pengecapanIcon from '../assets/icons/pengecapan.png';

function SensorySection({ title, pancaIndra }) {
  const sensoryData = [
    { name: 'peraba', icon: perabaIcon },
    { name: 'pendengaran', icon: pendengaranIcon },
    { name: 'penglihatan', icon: penglihatanIcon },
    { name: 'penciuman', icon: penciumanIcon },
    { name: 'pengecapan', icon: pengecapanIcon },
  ];

  return (
    <section className="sensory-section">
      <h2 className="section-title">{title}</h2>
      <h3 className="sensory-subtitle">Ketuk untuk mempelajari panca indra yang dipilih</h3>
      <div className="sensory-icons">
        {sensoryData.map((item) => {
          const sense = pancaIndra?.[item.name];
          if (!sense) return null;

          return (
              <Link
                key={sense.id}
                to={`/${item.name}`}
                state={{ data: sense }}
                className="sensory-item"
              >
              <div className="sensory-icon-wrapper">
                <img src={sense.logoUrl} alt={sense.title} className="sensory-icon" />
              </div>
              <p className="sensory-name">{sense.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


export default SensorySection;
