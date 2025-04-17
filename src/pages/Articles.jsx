import React, { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';
import '../App.css';

function Articles() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        console.log('Fetching articles...');
        const response = await contentAPI.getArticles();
        console.log('Articles response:', response);
        setArticles(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(`Failed to load articles: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="placeholder-content">
        <h2>Loading Articles...</h2>
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
    <div className="articles-page">
      <h1 className="page-title">Health Articles</h1>
      
      <div className="articles-container">
        {articles && articles.length > 0 ? (
          articles.map(article => (
            <div key={article.id} className="article-card">
              <img
                src={`http://13.215.253.107:5000${article.imageUrl}`}
                alt={article.title}
                className="article-image"
              />
              <div className="article-content">
                <h3>{article.title}</h3>
                <p className="article-excerpt">
                  {article.content.length > 150
                    ? `${article.content.substring(0, 150)}...`
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
    </div>
  );
}

export default Articles;
