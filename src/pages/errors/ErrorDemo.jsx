import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css';

function ErrorDemo() {
  const errorCodes = [
    { code: '400', name: 'Bad Request', description: 'Invalid request syntax' },
    { code: '401', name: 'Unauthorized', description: 'Authentication required' },
    { code: '403', name: 'Forbidden', description: 'Access denied' },
    { code: '404', name: 'Not Found', description: 'Page not found' },
    { code: '500', name: 'Internal Server Error', description: 'Server error' },
    { code: '502', name: 'Bad Gateway', description: 'Invalid server response' },
    { code: '503', name: 'Service Unavailable', description: 'Server temporarily unavailable' }
  ];

  const triggerJSError = () => {
    // This will trigger the ErrorBoundary
    throw new Error('Test Demonstrasi Error');
  };

  return (
    <div className="error-demo-container">
      <div className="error-demo-content">
        <h1>Error Pages Demo</h1>
        <p className="demo-description">
          This page demonstrates all the error pages available in the SenseCheck application.
          Click on any error code below to see the corresponding error page.
        </p>

        <div className="error-grid">
          {errorCodes.map((error) => (
            <div key={error.code} className="error-card">
              <div className="error-card-header">
                <span className="error-code">{error.code}</span>
                <h3>{error.name}</h3>
              </div>
              <p className="error-card-description">{error.description}</p>
              <Link 
                to={`/error/${error.code}`} 
                className="error-card-link"
              >
                View Error Page
              </Link>
            </div>
          ))}
        </div>

        <div className="special-errors">
          <h2>Special Error Cases</h2>
          
          <div className="special-error-card">
            <h3>404 - Not Found</h3>
            <p>Try visiting a non-existent page to see the 404 error:</p>
            <Link to="/this-page-does-not-exist" className="error-card-link">
              Visit Non-existent Page
            </Link>
          </div>

          <div className="special-error-card">
            <h3>JavaScript Error Boundary</h3>
            <p>Click the button below to trigger a JavaScript error and see the ErrorBoundary in action:</p>
            <button onClick={triggerJSError} className="error-trigger-btn">
              Trigger JavaScript Error
            </button>
          </div>
        </div>

        <div className="demo-info">
          <h2>How to Use Error Pages</h2>
          <div className="info-grid">
            <div className="info-card">
              <h4>Programmatic Navigation</h4>
              <pre>{`import { navigateToError } from '../utils/errorHandler';

// Navigate to specific error page
navigateToError(404, navigate);`}</pre>
            </div>
            
            <div className="info-card">
              <h4>API Error Handling</h4>
              <pre>{`import { handleApiError } from '../utils/errorHandler';

try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    handleApiError(response, navigate);
  }
} catch (error) {
  handleApiError(error, navigate);
}`}</pre>
            </div>
          </div>
        </div>

        <div className="demo-actions">
          <Link to="/" className="error-btn primary">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorDemo;
