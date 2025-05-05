// API service for interacting with the backend

const API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', API_URL);

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
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
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API calls
export const authAPI = {
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

  // Check if user is logged in
  checkAuth: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Check if admin is logged in
  checkAdminAuth: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
  },

  // Admin logout
  adminLogout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
  },
};

// Content API calls
export const contentAPI = {
  getHome: () => fetchAPI('/', {
    skipAuth: true,
  }),

  getSliders: () => fetchAPI('/sliders', {
    skipAuth: true,
  }),

  getSliderById: (id) => fetchAPI(`/sliders/${id}`, {
    skipAuth: true,
  }),

  getArticles: () => fetchAPI('/articles', {
    skipAuth: true,
  }),

  getArticleById: (id) => fetchAPI(`/articles/${id}`, {
    skipAuth: true,
  }),
};

export default {
  auth: authAPI,
  content: contentAPI,
};
