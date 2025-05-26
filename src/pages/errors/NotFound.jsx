import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ErrorPages.css';

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <div className="error-animation">
          <div className="error-number">404</div>
          <div className="error-icon-404">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Broken page/document */}
              <path d="M30 20 L30 100 L90 100 L90 45 L75 30 L30 20 Z" fill="#65ADFF" opacity="0.1" stroke="#65ADFF" strokeWidth="2"/>
              <path d="M75 30 L75 45 L90 45" fill="none" stroke="#65ADFF" strokeWidth="2"/>

              {/* Crack/break in the page */}
              <path d="M45 35 L55 50 L50 65 L65 80" stroke="#f44336" strokeWidth="3" strokeLinecap="round" strokeDasharray="0"/>

              {/* Question mark */}
              <circle cx="60" cy="55" r="25" fill="none" stroke="#65ADFF" strokeWidth="2" opacity="0.3"/>
              <path d="M55 45 Q60 40 65 45 Q65 50 60 52 L60 58" stroke="#65ADFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <circle cx="60" cy="65" r="2" fill="#65ADFF"/>

              {/* Small floating pieces */}
              <rect x="70" y="25" width="4" height="4" fill="#f44336" opacity="0.6" transform="rotate(45 72 27)"/>
              <rect x="40" y="75" width="3" height="3" fill="#f44336" opacity="0.6" transform="rotate(45 41.5 76.5)"/>
              <rect x="75" y="70" width="3" height="3" fill="#f44336" opacity="0.6" transform="rotate(45 76.5 71.5)"/>
            </svg>
          </div>
        </div>

        <div className="error-text">
          <h1>Page Not Found</h1>
          <p className="error-description">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <p className="error-suggestion">
            You might have mistyped the address, or the page may have been removed.
          </p>
        </div>

        <div className="error-actions">
          <Link to="/" className="error-btn primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
            </svg>
            Go to Homepage
          </Link>
          <button onClick={handleGoBack} className="error-btn secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Go Back
          </button>
        </div>

        <div className="error-help">
          <h3>What can you do?</h3>
          <ul>
            <li>Check the URL for typos</li>
            <li>Go back to the previous page</li>
            <li>Visit our <Link to="/">homepage</Link></li>
            <li>Use the navigation menu above</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
