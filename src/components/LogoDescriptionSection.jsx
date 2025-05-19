import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logoBesar from '../assets/logoBesar.png';

function LogoDescriptionSection({
  logo = logoBesar,
  title = "Sense Check",
  description = "Aplikasi Aplikasi untuk mendiagnosa Penyakit dengan cepat menggunakan penglihatan, pendengaran, penciuman, pengecapan, peraba.",
  buttonText = "Coba Sekarang!"
}) {

  return (
    <section className="logo-section">
      <div className="logo-container">
        <div className="logo-wrapper">
          <img src={logo} alt={title} className="logo-besar" />
        </div>
        <div className="description-wrapper">
          <h2 className="section-title">{title}</h2>
          <p className="section-description">
            {description}
          </p>
          <Link to="/diagnosis" className="coba-sekarang-btn">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LogoDescriptionSection;
