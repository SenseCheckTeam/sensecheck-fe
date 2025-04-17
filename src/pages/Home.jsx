import React, { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';
import '../App.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState({
    sliders: [],
    articles: []
  });

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);
        console.log('Fetching home data...');
        const response = await contentAPI.getHome();
        console.log('Home data response:', response);
        setHomeData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError(`Failed to load data: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="placeholder-content">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="placeholder-content error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      {/* Slider Section */}
      <section className="slider-section">
        <h2>Featured Content</h2>
        <div className="sliders-container">
          {homeData.sliders && homeData.sliders.length > 0 ? (
            homeData.sliders.map(slider => (
              <div key={slider.id} className="slider-card">
                <img
                  src={`http://13.215.253.107:5000${slider.imageUrl}`}
                  alt={slider.title}
                  className="slider-image"
                />
                <div className="slider-content">
                  <h3>{slider.title}</h3>
                  <p>{slider.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No sliders available</p>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <h2>Health Articles</h2>
        <div className="articles-container">
          {homeData.articles && homeData.articles.length > 0 ? (
            homeData.articles.map(article => (
              <div key={article.id} className="article-card">
                <img
                  src={`http://13.215.253.107:5000${article.imageUrl}`}
                  alt={article.title}
                  className="article-image"
                />
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p className="article-excerpt">
                    {article.content.length > 100
                      ? `${article.content.substring(0, 100)}...`
                      : article.content}
                  </p>
                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No articles available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
