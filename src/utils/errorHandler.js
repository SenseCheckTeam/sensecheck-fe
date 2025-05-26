/**
 * Error handling utilities for the SenseCheck application
 */

/**
 * Navigate to error page based on status code
 * @param {number} statusCode - HTTP status code
 * @param {function} navigate - React Router navigate function
 */
export const navigateToError = (statusCode, navigate) => {
  navigate(`/error/${statusCode}`);
};

/**
 * Handle API errors and navigate to appropriate error page
 * @param {Error|Response} error - Error object or Response object
 * @param {function} navigate - React Router navigate function
 */
export const handleApiError = (error, navigate) => {
  if (error.status) {
    // If it's a Response object with status
    navigateToError(error.status, navigate);
  } else if (error.response && error.response.status) {
    // If it's an axios error with response
    navigateToError(error.response.status, navigate);
  } else {
    // Default to 500 for unknown errors
    navigateToError(500, navigate);
  }
};

/**
 * Common error status codes and their meanings
 */
export const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Check if a status code is an error
 * @param {number} statusCode - HTTP status code
 * @returns {boolean} - True if it's an error status code
 */
export const isErrorStatus = (statusCode) => {
  return statusCode >= 400;
};

/**
 * Get error message for status code
 * @param {number} statusCode - HTTP status code
 * @returns {string} - Human readable error message
 */
export const getErrorMessage = (statusCode) => {
  const messages = {
    400: 'Bad Request - The request could not be understood',
    401: 'Unauthorized - Please log in to continue',
    403: 'Forbidden - You don\'t have permission to access this resource',
    404: 'Not Found - The page you\'re looking for doesn\'t exist',
    500: 'Internal Server Error - Something went wrong on our end',
    502: 'Bad Gateway - Server received an invalid response',
    503: 'Service Unavailable - The server is temporarily unavailable'
  };
  
  return messages[statusCode] || 'An unexpected error occurred';
};

/**
 * Enhanced fetch wrapper with error handling
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @param {function} navigate - React Router navigate function
 * @returns {Promise} - Fetch promise
 */
export const fetchWithErrorHandling = async (url, options = {}, navigate = null) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (navigate && isErrorStatus(response.status)) {
        navigateToError(response.status, navigate);
        return null;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    
    if (navigate) {
      // Check if it's a network error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        navigateToError(503, navigate); // Service unavailable
      } else {
        navigateToError(500, navigate); // Internal server error
      }
    }
    
    throw error;
  }
};

/**
 * Create error boundary fallback component
 * @param {Error} error - The error that occurred
 * @param {function} resetError - Function to reset the error boundary
 * @returns {JSX.Element} - Error fallback component
 */
export const createErrorFallback = (error, resetError) => {
  return {
    error,
    resetError,
    message: error?.message || 'An unexpected error occurred'
  };
};
