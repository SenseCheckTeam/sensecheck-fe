import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import BackButton from '../components/BackButton';
import PenciumanPresenter from '../presenters/penciumanPresenter';

function Penciuman() {
  const location = useLocation();
  const [penciuman, setPenciuman] = useState(null);

  useEffect(() => {
    const data = location.state?.data;
    PenciumanPresenter.load(data, setPenciuman);
  }, [location.state]);

  if (!penciuman) {
    return <div>Data tidak tersedia</div>;
  }

  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={penciuman.logoUrl} alt={penciuman.title} className="sense-icon-img" />
        </div>
        <h1 className="sense-title">{penciuman.subtitle} <br />{penciuman.title}</h1>
      </div>

      <div className="sense-content">
        {penciuman.imageUrl && (
          <div className="sense-image-container">
            <img
              src={penciuman.imageUrl}
              alt={penciuman.title}
              className="sense-image"
            />
          </div>
        )}

        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Penciuman</h2>
          <p className="sense-text">{penciuman.description}</p>
        </section>
      </div>
    </div>
  );
}

export default Penciuman;
