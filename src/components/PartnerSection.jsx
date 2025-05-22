import React from 'react';
import '../App.css';

function PartnerSection({ title = "Our Partner", partners }) {
  const defaultPartners = [
    { id: 1, name: 'DBS Foundation'},
    { id: 2, name: 'Dicoding'},
    { id: 3, name: 'Universitas Gunadarma'},
  ];

  const partnerData = partners && partners.length > 0 ? partners : defaultPartners;

  return (
    <section className="partners-section">
      <h2 className="section-title">{title}</h2>
      <div className="partner-logos">
        {partnerData.map((partner) => (
          <div key={partner.id} className="partner-item">
            <img
              src={partner.imageUrl || partner.logo}
              alt={partner.name || 'Partner Logo'}
              className="partner-logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}


export default PartnerSection;
