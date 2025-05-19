import React from 'react';
import '../App.css';
import perabaIcon from '../assets/icons/peraba.png';
import BackButton from '../components/BackButton';

function Peraba() {
  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={perabaIcon} alt="Peraba" className="sense-icon-img" />
        </div>
        <h1 className="sense-title">Indra<br />Peraba</h1>
      </div>

      <div className="sense-content">
        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Peraba</h2>
          <p className="sense-text">
            Indra peraba adalah salah satu dari lima indra utama manusia yang memungkinkan kita untuk merasakan sentuhan, tekanan, suhu, dan rasa sakit.
            Kulit adalah organ terbesar tubuh dan merupakan organ utama indra peraba yang mengandung berbagai reseptor sensorik.
          </p>
          <p className="sense-text">
            Indra peraba sangat penting untuk kelangsungan hidup dan interaksi kita dengan dunia fisik, membantu kita menghindari bahaya dan
            memberikan informasi tentang lingkungan sekitar.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Cara Kerja Indra Peraba</h2>
          <p className="sense-text">
            Proses peraba dimulai ketika reseptor di kulit kita terangsang oleh stimulus eksternal seperti sentuhan, tekanan, getaran,
            suhu, atau rasa sakit. Berbagai jenis reseptor khusus di kulit mendeteksi jenis stimulus yang berbeda.
          </p>
          <p className="sense-text">
            Ketika reseptor terangsang, mereka menghasilkan sinyal listrik yang dikirim melalui saraf sensorik ke sumsum tulang belakang
            dan kemudian ke otak. Otak kemudian memproses informasi ini dan menginterpretasikannya sebagai sensasi tertentu.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Menjaga Kesehatan Kulit</h2>
          <ul className="sense-list">
            <li>Jaga kebersihan kulit dengan mandi secara teratur</li>
            <li>Gunakan pelembab untuk mencegah kulit kering</li>
            <li>Lindungi kulit dari paparan sinar matahari berlebihan dengan tabir surya</li>
            <li>Konsumsi makanan yang kaya vitamin E dan antioksidan</li>
            <li>Minum cukup air untuk menjaga hidrasi kulit</li>
            <li>Hindari kontak dengan bahan kimia berbahaya</li>
            <li>Periksa kulit secara rutin untuk mendeteksi perubahan yang mencurigakan</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Peraba;
