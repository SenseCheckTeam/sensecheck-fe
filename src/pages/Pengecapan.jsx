import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import PengecapanPresenter from '../presenters/pengecapanPresenter';

function Pengecapan() {
  const location = useLocation();
  const [pengecapan, setPengecapan] = useState(null);

  useEffect(() => {
    const data = location.state?.data;
    PengecapanPresenter.load(data, setPengecapan);
  }, [location.state]);

  if (!pengecapan) {
    return <div>Data tidak tersedia</div>;
  }

  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={pengecapan.logoUrl} alt={pengecapan.title} className="sense-icon-img" />
        </div>
        <h1 className="sense-title">
          {pengecapan.subtitle} <br /> {pengecapan.title}
        </h1>
      </div>

      <div className="sense-content">
        {pengecapan.imageUrl && (
          <div className="sense-image-wrapper">
            <img
              src={pengecapan.imageUrl}
              alt={pengecapan.title}
              className="sense-image"
            />
          </div>
        )}

        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Pengecapan</h2>
          <p className="sense-text">{pengecapan.description}</p>
        </section>
      </div>
    </div>
  );
}

export default Pengecapan;
