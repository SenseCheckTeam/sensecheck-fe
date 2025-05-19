import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';

// Import komponen
import BackButton from '../components/BackButton';

// Import gambar lokal
import dermatitisImage from '../assets/placeholder/dermatitis.jpg';

function DiagnosisResult() {
  const location = useLocation();
  const { senseType, diagnosisText } = location.state || {};

  // Data hasil diagnosis (dalam aplikasi nyata, ini akan berasal dari API)
  const diagnosisResult = {
    title: 'Dermatitis Kontak',
    probability: 99,
    image: dermatitisImage,
    description: 'Dermatitis kontak adalah peradangan pada kulit yang terjadi akibat kontak langsung dengan zat tertentu yang menyebabkan iritasi atau reaksi alergi. Kondisi ini ditandai dengan ruam merah dan gatal pada kulit.',
    recommendations: 'Untuk penanganan pertama dermatitis kontak, segera hentikan paparan zat yang menyebabkan iritasi atau alergi, lalu gunakan kompres dingin untuk meredakan peradangan. Jika gejala tidak membaik atau memburuk, konsultasikan dengan dokter untuk mendapatkan pengobatan yang tepat.'
  };

  return (
    <div className="diagnosis-result-container">
      <BackButton />
      <div className="diagnosis-result-content">
        <h2 className="diagnosis-result-heading">Hasil Diagnosis</h2>

        <div className="diagnosis-result-title">
          <h1>{diagnosisResult.title}</h1>
          <p className="diagnosis-result-probability">
            Dengan Kemungkinan: <span>{diagnosisResult.probability}%</span>
          </p>
        </div>

        <div className="diagnosis-result-image-container">
          <img
            src={diagnosisResult.image}
            alt={diagnosisResult.title}
            className="diagnosis-result-image"
          />
        </div>

        <div className="diagnosis-result-description">
          <p>{diagnosisResult.description}</p>
        </div>

        <div className="diagnosis-result-recommendations">
          <h3>Saran Penanganan Pertama</h3>
          <p>{diagnosisResult.recommendations}</p>
        </div>

        <div className="diagnosis-result-actions">
          <Link to="/" className="diagnosis-result-button home-button">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisResult;
