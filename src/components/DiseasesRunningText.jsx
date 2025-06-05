import React from 'react';
import '../App.css';

function DiseasesRunningText() {
  const diseases = [
    'Psoriasis',
    'Sinusitis',
    'Candidiasis Oral',
    'Tinnitus',
    'Otitis Eksterna',
    'Lidah Geografik',
    'Polip Hidung',
    'Konjungtivitis',
    'Rhinitis Alergi',
    'Infeksi Telinga Tengah',
    'Dermatitis Kontak',
    'Mata Kering',
    'Glossitis',
    'Katarak',
    'Eksim'
  ];

  // Split diseases into 3 groups
  const group1 = diseases.slice(0, 5);
  const group2 = diseases.slice(5, 10);
  const group3 = diseases.slice(10, 15);

  // Create seamless infinite loop by duplicating enough times to fill screen and beyond
  const infiniteGroup1 = Array(20).fill([...group1]).flat();
  const infiniteGroup2 = Array(20).fill([...group2]).flat();
  const infiniteGroup3 = Array(20).fill([...group3]).flat();

  return (
    <section className="diseases-running-text-section">
      {/* Title Section */}
      <div className="diseases-section-header">
        <h2 className="diseases-section-title">Daftar Penyakit</h2>
        <p className="diseases-section-subtitle">Daftar-daftar penyakit yang bisa di diagnosa</p>
      </div>

      {/* First Row */}
      <div className="diseases-running-text-container">
        <div className="diseases-running-text row-1">
          {infiniteGroup1.map((disease, index) => (
            <div key={`row1-${index}`} className="disease-card blue-theme">
              <span className="disease-name">{disease}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row */}
      <div className="diseases-running-text-container">
        <div className="diseases-running-text row-2">
          {infiniteGroup2.map((disease, index) => (
            <div key={`row2-${index}`} className="disease-card blue-theme">
              <span className="disease-name">{disease}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Third Row */}
      <div className="diseases-running-text-container">
        <div className="diseases-running-text row-3">
          {infiniteGroup3.map((disease, index) => (
            <div key={`row3-${index}`} className="disease-card blue-theme">
              <span className="disease-name">{disease}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DiseasesRunningText;
