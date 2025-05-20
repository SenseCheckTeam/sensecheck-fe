import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import PenglihatanPresenter from '../presenters/penglihatanPresenter';

function Penglihatan() {
  const location = useLocation();
  const [penglihatan, setPenglihatan] = useState(null);

  useEffect(() => {
    const data = location.state?.data;
    PenglihatanPresenter.load(data, setPenglihatan);
  }, [location.state]);

  if (!penglihatan) {
    return <div>Data tidak tersedia</div>;
  }

  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img
            src={penglihatan.logoUrl}
            alt={penglihatan.title}
            className="sense-icon-img"
          />
        </div>
        <h1 className="sense-title">
          {penglihatan.subtitle} <br /> {penglihatan.title}
        </h1>
      </div>

      <div className="sense-content">
        {penglihatan.imageUrl && (
          <div className="sense-image-wrapper">
            <img
              src={penglihatan.imageUrl}
              alt={penglihatan.title}
              className="sense-image"
            />
          </div>
        )}

        <section className="sense-section">
          <h2 className="sense-section-title">Tentang {penglihatan.title}</h2>
          <p className="sense-text">{penglihatan.description}</p>
        </section>
      </div>
    </div>
  );
}

export default Penglihatan;
