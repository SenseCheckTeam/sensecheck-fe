import React from 'react';
import '../App.css';
import penciumanIcon from '../assets/icons/penciuman.png';
import BackButton from '../components/BackButton';

function Penciuman() {
  return (
    <div className="sense-page-container">
      <BackButton />
      <div className="sense-header">
        <div className="sense-icon-large">
          <img src={penciumanIcon} alt="Penciuman" className="sense-icon-img" />
        </div>
        <h1 className="sense-title">Indra<br />Penciuman</h1>
      </div>

      <div className="sense-content">
        <section className="sense-section">
          <h2 className="sense-section-title">Tentang Indra Penciuman</h2>
          <p className="sense-text">
            Indra penciuman adalah salah satu dari lima indra utama manusia yang memungkinkan kita untuk mendeteksi dan membedakan berbagai aroma.
            Hidung adalah organ utama penciuman yang menangkap molekul bau dan mengubahnya menjadi sinyal yang dapat diinterpretasikan oleh otak.
          </p>
          <p className="sense-text">
            Indra penciuman manusia dapat mengenali ribuan aroma berbeda dan memiliki hubungan yang kuat dengan memori dan emosi.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Cara Kerja Penciuman</h2>
          <p className="sense-text">
            Proses penciuman dimulai ketika molekul bau masuk ke hidung saat kita menghirup udara. Molekul-molekul ini kemudian
            berinteraksi dengan reseptor khusus yang terletak di epitel olfaktori di bagian atas rongga hidung.
          </p>
          <p className="sense-text">
            Ketika molekul bau terikat pada reseptor, sel-sel reseptor mengirimkan sinyal listrik melalui saraf olfaktori ke bulbus olfaktori
            di otak. Dari sini, informasi diteruskan ke area otak yang lebih tinggi untuk diproses dan diinterpretasikan sebagai bau tertentu.
          </p>
        </section>

        <section className="sense-section">
          <h2 className="sense-section-title">Menjaga Kesehatan Hidung</h2>
          <ul className="sense-list">
            <li>Jaga kebersihan hidung dengan mencuci tangan secara teratur</li>
            <li>Hindari menghirup zat berbahaya atau iritan</li>
            <li>Gunakan masker saat berada di lingkungan berdebu atau tercemar</li>
            <li>Lakukan irigasi hidung dengan larutan saline jika diperlukan</li>
            <li>Hindari merokok dan paparan asap rokok</li>
            <li>Konsultasikan ke dokter jika mengalami gangguan penciuman yang berkepanjangan</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Penciuman;
