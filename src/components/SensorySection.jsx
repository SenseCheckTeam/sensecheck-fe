import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


function SensorySection({ title, pancaIndra }) {
  const sensoryData = [
    { name: 'peraba'},
    { name: 'pendengaran'},
    { name: 'penglihatan'},
    { name: 'penciuman'},
    { name: 'pengecapan'},
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
