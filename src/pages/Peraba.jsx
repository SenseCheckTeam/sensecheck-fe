import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import PerabaPresenter from '../presenters/perabaPresenter';

function Peraba() {
  const location = useLocation();
  const [peraba, setPeraba] = useState(null);

  useEffect(() => {
    const data = location.state?.data;
    PerabaPresenter.load(data, setPeraba);
  }, [location.state]);

  if (!peraba) {
    return <div>Data tidak tersedia</div>;
  }

  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img
            src={peraba.logoUrl}
            alt={peraba.title}
            className="sense-icon-img"
          />
        </div>
        <h1 className="sense-title">{peraba.subtitle}<br />{peraba.title}</h1>
      </div>

      <div className="sense-content">
        {peraba.imageUrl && (
          <div className="sense-image-wrapper">
            <img
              src={peraba.imageUrl}
              alt={peraba.title}
              className="sense-image"
            />
          </div>
        )}
        <section className="sense-section">
          <h2 className="sense-section-title">Tentang {peraba.title}</h2>
          <p className="sense-text">{peraba.description}</p>
        </section>
      </div>
    </div>
  );
}

export default Peraba;
