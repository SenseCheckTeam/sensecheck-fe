import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import PendengaranPresenter from '../presenters/pendengaranPresenter';

function Pendengaran() {
  const location = useLocation();
  const [pendengaran, setPendengaran] = useState(null);

  useEffect(() => {
    const data = location.state?.data;
    PendengaranPresenter.load(data, setPendengaran);
  }, [location.state]);

  if (!pendengaran) {
    return <div>Data tidak tersedia</div>;
  }

  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={pendengaran.logoUrl} alt={pendengaran.title} className="sense-icon-img" />
        </div>
        <h1 className="sense-title">
          {pendengaran.subtitle} <br /> {pendengaran.title}
        </h1>
      </div>

      <div className="sense-content">
        {pendengaran.imageUrl && (
          <div className="sense-image-wrapper">
            <img
              src={pendengaran.imageUrl}
              alt={pendengaran.title}
              className="sense-image"
            />
          </div>
        )}

        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Pendengaran</h2>
          <p className="sense-text">{pendengaran.description}</p>
        </section>
      </div>
    </div>
  );
}

export default Pendengaran;
