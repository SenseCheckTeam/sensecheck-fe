import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function LogoDescriptionSection({ hero = [] }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log('hero data:', hero);

  const handleCobaSekarang = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/diagnosis');
    } else {
      navigate('/login', { state: { from: { pathname: '/diagnosis' } } });
    }
  };

  return (
    <section className="logo-section">
      <div className="logo-container">
        {hero.map((hero) => (
          <React.Fragment key={hero.id}>
            <div className="logo-wrapper">
              <img src={hero.imageUrl} alt={hero.title} className="logo-besar" />
            </div>
            <div className="description-wrapper">
              <h2 className="section-title">{hero.title}</h2>
              <p className="section-description">{hero.description}</p>
              <button onClick={handleCobaSekarang} className="coba-sekarang-btn">
                {hero.textButton}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default LogoDescriptionSection;
