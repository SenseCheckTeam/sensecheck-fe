import React from 'react';
import '../App.css';
import penglihatanIcon from '../assets/icons/penglihatan.png';
import penglihatanImage from '../assets/gambarMacamIndra/pengelihatan.jpg';
import BackButton from '../components/BackButton';

function Penglihatan() {
  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={penglihatanIcon} alt="Penglihatan" className="sense-icon-img" />
        </div>
        <h1 className="sense-title">Penglihatan</h1>
      </div>

      <div className="sense-content">
        <div className="sense-image-container">
          <img src={penglihatanImage} alt="Indra Penglihatan" className="sense-image" />
        </div>
        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Penglihatan</h2>
          <p className="sense-text">
            Indra penglihatan adalah salah satu dari lima indra utama manusia yang memungkinkan kita untuk melihat dunia di sekitar kita.
            Mata adalah organ utama penglihatan yang menangkap cahaya dan mengubahnya menjadi sinyal yang dapat diinterpretasikan oleh otak.
          </p>
          <p className="sense-text">
            Mata manusia memiliki struktur kompleks yang terdiri dari kornea, lensa, retina, dan berbagai komponen lainnya yang bekerja sama
            untuk memberikan kemampuan melihat dengan detail dan warna.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Cara Kerja Penglihatan</h2>
          <p className="sense-text">
            Proses penglihatan dimulai ketika cahaya masuk ke mata melalui kornea dan pupil. Cahaya kemudian difokuskan oleh lensa mata
            ke retina di bagian belakang mata. Retina mengandung sel-sel fotoreseptor (sel batang dan sel kerucut) yang mengubah cahaya
            menjadi sinyal listrik.
          </p>
          <p className="sense-text">
            Sinyal listrik ini kemudian diteruskan melalui saraf optik ke otak, di mana informasi diproses dan diinterpretasikan sebagai
            gambar yang kita lihat.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Menjaga Kesehatan Mata</h2>
          <ul className="sense-list">
            <li>Lakukan pemeriksaan mata secara rutin</li>
            <li>Istirahatkan mata saat bekerja dengan layar digital (aturan 20-20-20: setiap 20 menit, lihat objek berjarak 20 kaki selama 20 detik)</li>
            <li>Konsumsi makanan yang kaya vitamin A dan antioksidan</li>
            <li>Gunakan kacamata pelindung saat berada di lingkungan berisiko</li>
            <li>Hindari mengucek mata terlalu keras</li>
            <li>Jaga kebersihan mata dan tangan</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Penglihatan;
