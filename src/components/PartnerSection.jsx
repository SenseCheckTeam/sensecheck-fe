import React from 'react';
import '../App.css';
import dbsLogo from '../assets/partners/dbs.png';
import dicodingLogo from '../assets/partners/dicoding.png';
import gunadarmaLogo from '../assets/partners/gunadarma.png';

function PartnerSection({ title = "Our Partner", partners }) {
  // Default partners if none provided
  const defaultPartners = [
    { id: 1, name: 'DBS Foundation', logo: dbsLogo },
    { id: 2, name: 'Dicoding', logo: dicodingLogo },
    { id: 3, name: 'Universitas Gunadarma', logo: gunadarmaLogo },
  ];

  // Use provided partners or default
  const partnerData = partners || defaultPartners;

  return (
    <section className="partners-section">
      <h2 className="section-title">{title}</h2>
      <div className="partner-logos">
        {partnerData.map((partner) => (
          <div key={partner.id} className="partner-item">
            <img src={partner.logo} alt={partner.name} className="partner-logo" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnerSection;
