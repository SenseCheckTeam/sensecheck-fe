import React from 'react';
import '../App.css';
import pengecapanIcon from '../assets/icons/pengecapan.png';
import pengecapanImage from '../assets/gambarMacamIndra/pengecap.webp';
import BackButton from '../components/BackButton';

function Pengecapan() {
  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={pengecapanIcon} alt="Pengecapan" className="sense-icon-img" />
        </div>
        <h1 className="sense-title">Indra<br />Pengecapan</h1>
      </div>

      <div className="sense-content">
        <div className="sense-image-container">
          <img src={pengecapanImage} alt="Indra Pengecapan" className="sense-image" />
        </div>
        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Pengecapan</h2>
          <p className="sense-text">
            Indra pengecapan adalah salah satu dari lima indra utama manusia yang memungkinkan kita untuk merasakan berbagai rasa makanan dan minuman.
            Lidah adalah organ utama pengecapan yang mengandung ribuan kuncup rasa (taste buds) yang dapat mendeteksi lima rasa dasar: manis, asin, asam, pahit, dan umami.
          </p>
          <p className="sense-text">
            Indra pengecapan bekerja sama dengan indra penciuman untuk memberikan pengalaman rasa yang lengkap, dan keduanya sangat penting untuk
            kesenangan makan dan kelangsungan hidup.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Cara Kerja Pengecapan</h2>
          <p className="sense-text">
            Proses pengecapan dimulai ketika molekul makanan larut dalam air liur dan berinteraksi dengan sel reseptor rasa di kuncup rasa.
            Setiap kuncup rasa mengandung 50-100 sel reseptor rasa yang dapat mendeteksi rasa dasar yang berbeda.
          </p>
          <p className="sense-text">
            Ketika molekul makanan terikat pada reseptor, sel-sel reseptor mengirimkan sinyal listrik melalui saraf kranial ke batang otak
            dan kemudian ke area otak yang lebih tinggi. Otak kemudian memproses informasi ini dan menginterpretasikannya sebagai rasa tertentu.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Menjaga Kesehatan Lidah dan Indra Pengecapan</h2>
          <ul className="sense-list">
            <li>Jaga kebersihan mulut dengan menyikat gigi dan lidah secara teratur</li>
            <li>Gunakan obat kumur antiseptik untuk mengurangi bakteri di mulut</li>
            <li>Hindari merokok dan konsumsi alkohol berlebihan</li>
            <li>Minum cukup air untuk menjaga produksi air liur</li>
            <li>Konsumsi makanan yang bervariasi untuk melatih indra pengecapan</li>
            <li>Konsultasikan ke dokter jika mengalami perubahan rasa yang berkepanjangan</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Pengecapan;
