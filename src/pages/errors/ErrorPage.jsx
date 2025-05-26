import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ErrorPages.css';

function ErrorPage() {
  const { statusCode } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReload = () => {
    window.location.reload();
  };

  // Error configurations for different status codes
  const errorConfigs = {
    '400': {
      title: 'Bad Request',
      description: 'The request could not be understood by the server due to malformed syntax.',
      suggestion: 'Please check your input and try again.',
      icon: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#ff9800" strokeWidth="2" fill="none"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="#ff9800" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="#ff9800" strokeWidth="2"/>
        </svg>
      )
    },
    '401': {
      title: 'Unauthorized',
      description: 'You need to be authenticated to access this resource.',
      suggestion: 'Please log in to continue.',
      icon: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#f44336" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="7" r="4" stroke="#f44336" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    '403': {
      title: 'Forbidden',
      description: 'You don\'t have permission to access this resource.',
      suggestion: 'Contact your administrator if you believe this is an error.',
      icon: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#f44336" strokeWidth="2" fill="none"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="#f44336" strokeWidth="2"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="#f44336" strokeWidth="2"/>
        </svg>
      )
    },
    '500': {
      title: 'Internal Server Error',
      description: 'Something went wrong on our end. We\'re working to fix it.',
      suggestion: 'Please try again later or contact support if the problem persists.',
      icon: (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#f44336" strokeWidth="2" fill="none"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="#f44336" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="#f44336" strokeWidth="2"/>
        </svg>
      )
    },
    '502': {
      title: 'Bad Gateway',
      description: 'The server received an invalid response from an upstream server.',
      suggestion: 'This is usually temporary. Please try again in a few minutes.',
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Server 1 */}
          <rect x="20" y="30" width="25" height="35" rx="3" fill="#65ADFF" opacity="0.2" stroke="#65ADFF" strokeWidth="2"/>
          <rect x="22" y="35" width="21" height="3" fill="#65ADFF" opacity="0.6"/>
          <rect x="22" y="40" width="21" height="3" fill="#65ADFF" opacity="0.6"/>
          <rect x="22" y="45" width="21" height="3" fill="#65ADFF" opacity="0.6"/>

          {/* Server 2 */}
          <rect x="75" y="30" width="25" height="35" rx="3" fill="#65ADFF" opacity="0.2" stroke="#65ADFF" strokeWidth="2"/>
          <rect x="77" y="35" width="21" height="3" fill="#65ADFF" opacity="0.6"/>
          <rect x="77" y="40" width="21" height="3" fill="#65ADFF" opacity="0.6"/>
          <rect x="77" y="45" width="21" height="3" fill="#65ADFF" opacity="0.6"/>

          {/* Broken connection line */}
          <line x1="45" y1="47" x2="55" y2="47" stroke="#ff9800" strokeWidth="3" strokeLinecap="round"/>
          <line x1="65" y1="47" x2="75" y2="47" stroke="#ff9800" strokeWidth="3" strokeLinecap="round"/>

          {/* X mark in the middle */}
          <circle cx="60" cy="47" r="8" fill="#f44336" opacity="0.1" stroke="#f44336" strokeWidth="2"/>
          <line x1="56" y1="43" x2="64" y2="51" stroke="#f44336" strokeWidth="2" strokeLinecap="round"/>
          <line x1="64" y1="43" x2="56" y2="51" stroke="#f44336" strokeWidth="2" strokeLinecap="round"/>

          {/* Warning indicators */}
          <circle cx="32" cy="75" r="3" fill="#ff9800"/>
          <path d="M32 72 L32 76" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="32" cy="78" r="0.5" fill="white"/>

          <circle cx="87" cy="75" r="3" fill="#ff9800"/>
          <path d="M87 72 L87 76" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="87" cy="78" r="0.5" fill="white"/>
        </svg>
      )
    },
    '503': {
      title: 'Service Unavailable',
      description: 'The server is currently unavailable due to maintenance or overload.',
      suggestion: 'Please try again later. We\'re working to restore service.',
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main server */}
          <rect x="40" y="25" width="40" height="50" rx="4" fill="#65ADFF" opacity="0.2" stroke="#65ADFF" strokeWidth="2"/>

          {/* Server details */}
          <rect x="45" y="32" width="30" height="4" fill="#65ADFF" opacity="0.6"/>
          <rect x="45" y="40" width="30" height="4" fill="#65ADFF" opacity="0.6"/>
          <rect x="45" y="48" width="30" height="4" fill="#65ADFF" opacity="0.6"/>
          <rect x="45" y="56" width="30" height="4" fill="#65ADFF" opacity="0.6"/>

          {/* Power button/indicator - OFF */}
          <circle cx="60" cy="65" r="4" fill="#f44336" opacity="0.3" stroke="#f44336" strokeWidth="2"/>
          <line x1="60" y1="62" x2="60" y2="68" stroke="#f44336" strokeWidth="2" strokeLinecap="round"/>

          {/* Maintenance tools */}
          <g transform="translate(25, 80)">
            {/* Wrench */}
            <path d="M2 2 L8 8 L6 10 L0 4 Z" fill="#ff9800" opacity="0.8"/>
            <circle cx="1" cy="1" r="1" fill="#ff9800"/>
            <circle cx="9" cy="9" r="1" fill="#ff9800"/>
          </g>

          <g transform="translate(85, 80)">
            {/* Screwdriver */}
            <rect x="0" y="4" width="8" height="2" fill="#ff9800" opacity="0.8"/>
            <rect x="8" y="3" width="2" height="4" fill="#ff9800"/>
          </g>

          {/* Warning sign */}
          <g transform="translate(55, 85)">
            <path d="M5 0 L10 8 L0 8 Z" fill="#ff9800" opacity="0.2" stroke="#ff9800" strokeWidth="1.5"/>
            <line x1="5" y1="3" x2="5" y2="5.5" stroke="#ff9800" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="5" cy="6.5" r="0.5" fill="#ff9800"/>
          </g>

          {/* "Under maintenance" indicator */}
          <circle cx="30" cy="35" r="2" fill="#ff9800"/>
          <circle cx="90" cy="35" r="2" fill="#ff9800"/>
          <circle cx="30" cy="55" r="2" fill="#ff9800"/>
          <circle cx="90" cy="55" r="2" fill="#ff9800"/>
        </svg>
      )
    }
  };

  // Default configuration for unknown status codes
  const defaultConfig = {
    title: 'Error',
    description: 'An unexpected error occurred.',
    suggestion: 'Please try again or contact support if the problem persists.',
    icon: (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#f44336" strokeWidth="2" fill="none"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="#f44336" strokeWidth="2"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="#f44336" strokeWidth="2"/>
      </svg>
    )
  };

  const config = errorConfigs[statusCode] || defaultConfig;

  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <div className="error-animation">
          <div className="error-number">{statusCode || 'Error'}</div>
          <div className="error-icon">
            {config.icon}
          </div>
        </div>

        <div className="error-text">
          <h1>{config.title}</h1>
          <p className="error-description">
            {config.description}
          </p>
          <p className="error-suggestion">
            {config.suggestion}
          </p>
        </div>

        <div className="error-actions">
          <button onClick={handleReload} className="error-btn primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Try Again
          </button>
          <Link to="/" className="error-btn secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
            </svg>
            Go to Homepage
          </Link>
          <button onClick={handleGoBack} className="error-btn tertiary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Go Back
          </button>
        </div>

        {statusCode === '401' && (
          <div className="error-help">
            <h3>Need to log in?</h3>
            <Link to="/login" className="login-link">
              Click here to log in
            </Link>
          </div>
        )}

        {(statusCode === '500' || statusCode === '502' || statusCode === '503') && (
          <div className="error-help">
            <h3>What can you do?</h3>
            <ul>
              <li>Wait a few minutes and try again</li>
              <li>Check your internet connection</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
