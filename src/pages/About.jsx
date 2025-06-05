import React from 'react';
import '../App.css';
import TeamMember from '../components/TeamMember';

function About() {
  // Team members data
  const teamMembers = [
    { id: 1, name: 'Muhammad Raihan', className: 'MC-20' },
    { id: 2, name: 'Shidqi Ahmad Musyaffa', className: 'MC-25' },
    { id: 3, name: 'Rizki Ilhamnuddin Muria', className: 'MC-30' },
    { id: 4, name: 'Nur Fajar Apriyanto', className: 'FC-10' },
    { id: 5, name: 'Muhammad Hanif Galuh Syahputera', className: 'FC-46' },
    { id: 6, name: 'Nabil Al Faros', className: 'FC-35' },
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About SenseCheck</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
          SenseCheck hadir sebagai solusi cerdas untuk membantu masyarakat mengenali gejala penyakit
          pancaindra secara cepat, akurat, dan mandiri. Misi kami adalah meningkatkan akses informasi kesehatan
          yang mudah dipahami oleh semua kalangan, terutama di daerah dengan keterbatasan layanan medis.
          Dengan teknologi AI berbasis teks, SenseCheck bertujuan menjadi asisten diagnosis awal yang aman, edukatif, dan inklusif.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <p>
          SenseCheck bekerja dengan menganalisis gejala yang kamu tulis dalam bahasa sehari-hari. Setelah pengguna memasukkan keluhan atau gejala,
          sistem AI kami yang dilatih dengan data medis akan memproses dan mencocokkannya dengan kemungkinan penyakit pancaindra seperti mata, telinga, hidung,
          lidah, dan kulit. Hasil diagnosis awal akan disertai saran ringan atau langkah awal penanganan yang bisa kamu lakukan, tanpa menggantikan peran dokter.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
          SenseCheck dikembangkan oleh tim multidisiplin yang terdiri dari mahasiswa teknologi Universitas Gunadarma
          dari dua bidang keahlian full stack web developer dan machine learning Engineer.
          Kami berkolaborasi untuk menciptakan aplikasi yang tak hanya canggih secara teknis,
          tapi juga nyaman digunakan dan bermanfaat langsung untuk masyarakat. Setiap anggota berkontribusi dalam riset,
          pengembangan AI, desain antarmuka, serta integrasi sistem untuk memastikan kualitas dan keberlanjutan produk.
          </p>
          <div className="team-members-container">
            {teamMembers.map(member => (
              <TeamMember
                key={member.id}
                photo={member.photo}
                name={member.name}
                className={member.className}
              />
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2>Partners</h2>
          <p>
            SenseCheck bangga bermitra dengan organisasi terkemuka seperti DBS Foundation,
            Universitas Gunadarma dan Dicoding untuk menghadirkan solusi inovatif ini.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
