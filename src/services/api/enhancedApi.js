// Enhanced API service with integrated error handling
import { handleApiError, isErrorStatus } from '../../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Enhanced fetch function with automatic error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @param {function} navigate - React Router navigate function (optional)
 * @returns {Promise} - API response
 */
async function fetchAPIWithErrorHandling(endpoint, options = {}, navigate = null) {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists
  let token;
  if (options.isAdmin) {
    token = localStorage.getItem('adminToken');
  } else {
    token = localStorage.getItem('token');
  }

  if (token && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    console.log(`Fetching ${url}...`);
    const response = await fetch(url, config);

    // Handle HTTP errors
    if (!response.ok) {
      console.error(`HTTP Error ${response.status}: ${response.statusText}`);
      
      // If navigate function is provided, redirect to error page
      if (navigate && isErrorStatus(response.status)) {
        handleApiError(response, navigate);
        return null; // Return null to indicate error was handled
      }
      
      // Otherwise, throw error for manual handling
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle network errors
    if (navigate && (error.name === 'TypeError' || error.message.includes('fetch'))) {
      handleApiError({ status: 503 }, navigate); // Service unavailable
      return null;
    }
    
    throw error;
  }
}

/**
 * Create API methods with error handling
 * @param {function} navigate - React Router navigate function
 * @returns {object} - API methods object
 */
export function createEnhancedAPI(navigate = null) {
  const fetchAPI = (endpoint, options = {}) => 
    fetchAPIWithErrorHandling(endpoint, options, navigate);

  return {
    // Auth API calls
    auth: {
      login: (credentials) => fetchAPI('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        skipAuth: true,
      }),

      register: (userData) => fetchAPI('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        skipAuth: true,
      }),

      adminLogin: (credentials) => fetchAPI('/admin', {
        method: 'POST',
        body: JSON.stringify(credentials),
        skipAuth: true,
      }),

      checkAuth: () => {
        const token = localStorage.getItem('token');
        return !!token;
      },

      checkAdminAuth: () => {
        const token = localStorage.getItem('adminToken');
        return !!token;
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
      },

      adminLogout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminName');
      },
    },

    // Content API calls
    content: {
      getHome: () => fetchAPI('/', { skipAuth: true }),
      getSliders: () => fetchAPI('/sliders', { skipAuth: true }),
      getSliderById: (id) => fetchAPI(`/sliders/${id}`, { skipAuth: true }),
      getArticles: () => fetchAPI('/articles', { skipAuth: true }),
      getArticleById: (id) => fetchAPI(`/articles/${id}`, { skipAuth: true }),
      getPancaIndra: () => fetchAPI('/panca-indra', { skipAuth: true }),
      getPartners: () => fetchAPI('/partner', { skipAuth: true }),
      getHero: () => fetchAPI('/hero', { skipAuth: true }),
    },

    // Admin API calls
    admin: {
      getDashboard: () => fetchAPI('/admin/dashboard', { isAdmin: true }),
      
      // Slider management
      createSlider: (formData) => fetchAPI('/admin/sliders', {
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set Content-Type for FormData
        isAdmin: true,
      }),
      
      updateSlider: (id, formData) => fetchAPI(`/admin/sliders/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {}, // Let browser set Content-Type for FormData
        isAdmin: true,
      }),
      
      deleteSlider: (id) => fetchAPI(`/admin/sliders/${id}`, {
        method: 'DELETE',
        isAdmin: true,
      }),

      // Article management
      createArticle: (formData) => fetchAPI('/admin/articles', {
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set Content-Type for FormData
        isAdmin: true,
      }),
      
      updateArticle: (id, formData) => fetchAPI(`/admin/articles/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {}, // Let browser set Content-Type for FormData
        isAdmin: true,
      }),
      
      deleteArticle: (id) => fetchAPI(`/admin/articles/${id}`, {
        method: 'DELETE',
        isAdmin: true,
      }),
    },
  };
}

// Default export without navigation (for backward compatibility)
export default createEnhancedAPI();

// Named export for use with navigation
export { fetchAPIWithErrorHandling };
