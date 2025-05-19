import React from 'react';
import '../App.css';
import pendengaranIcon from '../assets/icons/pendengaran.png';
import BackButton from '../components/BackButton';

function Pendengaran() {
  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={pendengaranIcon} alt="Pendengaran" className="sense-icon-img" />
        </div>
        <h1 className="sense-title">Indra<br />Pendengaran</h1>
      </div>

      <div className="sense-content">
        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Pendengaran</h2>
          <p className="sense-text">
            Indra pendengaran adalah salah satu dari lima indra utama manusia yang memungkinkan kita untuk mendengar suara di sekitar kita.
            Telinga adalah organ utama pendengaran yang menangkap gelombang suara dan mengubahnya menjadi sinyal yang dapat diinterpretasikan oleh otak.
          </p>
          <p className="sense-text">
            Telinga manusia terdiri dari tiga bagian utama: telinga luar, telinga tengah, dan telinga dalam, yang bekerja sama untuk
            memberikan kemampuan mendengar berbagai frekuensi dan volume suara.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Cara Kerja Pendengaran</h2>
          <p className="sense-text">
            Proses pendengaran dimulai ketika gelombang suara masuk ke telinga luar melalui daun telinga dan saluran telinga.
            Gelombang suara ini kemudian mencapai gendang telinga, yang bergetar sesuai dengan frekuensi dan intensitas suara.
          </p>
          <p className="sense-text">
            Getaran dari gendang telinga diteruskan melalui tiga tulang kecil di telinga tengah (maleus, inkus, dan stapes) ke telinga dalam.
            Di telinga dalam, koklea mengubah getaran menjadi sinyal listrik yang kemudian dikirim ke otak melalui saraf pendengaran.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Menjaga Kesehatan Telinga</h2>
          <ul className="sense-list">
            <li>Hindari paparan suara keras dalam waktu lama</li>
            <li>Gunakan pelindung telinga saat berada di lingkungan bising</li>
            <li>Jangan memasukkan benda asing ke dalam telinga</li>
            <li>Bersihkan telinga dengan hati-hati dan hindari penggunaan cotton bud terlalu dalam</li>
            <li>Lakukan pemeriksaan pendengaran secara rutin</li>
            <li>Segera konsultasi ke dokter jika mengalami gangguan pendengaran</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Pendengaran;
