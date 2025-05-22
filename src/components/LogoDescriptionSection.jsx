import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function LogoDescriptionSection({ hero = [] }) {
  console.log('hero data:', hero);
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
              <Link to="/diagnosis" className="coba-sekarang-btn">
                {hero.textButton}
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default LogoDescriptionSection;
