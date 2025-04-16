import React from 'react';
import Navbar from './Navbar';
import './Home.css';

function Home() {
  // Sample article data
  const articles = [
    { 
      id: 1, 
      title: 'Tips Menjaga Kesehatan Jantung', 
      excerpt: 'Pelajari cara-cara efektif untuk menjaga kesehatan jantung Anda dengan perubahan gaya hidup sederhana.'
    },
    { 
      id: 2, 
      title: 'Pentingnya Vaksinasi', 
      excerpt: 'Mengapa vaksinasi penting untuk kesehatan Anda dan masyarakat secara keseluruhan.'
    },
    { 
      id: 3, 
      title: 'Nutrisi untuk Imunitas', 
      excerpt: 'Makanan yang dapat membantu meningkatkan sistem kekebalan tubuh Anda.'
    }
  ];

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Slider Section */}
      <div className="slider-container">
        <div className="slider">
          <div className="slider-content">
            <h2>Kesehatan Anda Prioritas Kami</h2>
            <p>Dapatkan saran kesehatan dari platform terpercaya</p>
          </div>
        </div>
      </div>
      
      {/* Articles Section */}
      <h2 className="section-title">Artikel Kesehatan Terbaru</h2>
      <div className="articles-container">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 HealthDiagnose. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}

export default Home;