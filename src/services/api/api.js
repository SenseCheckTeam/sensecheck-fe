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

  adminLogin: (credentials) => fetchAPI('/admin/login', {
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
};

// Content API calls
export const contentAPI = {
  getHome: () => fetchAPI('/', { skipAuth: true }),

  getSliders: () => fetchAPI('/sliders', { skipAuth: true }),

  getSliderById: (id) => fetchAPI(`/sliders/${id}`, { skipAuth: true }),

  getArticles: () => fetchAPI('/articles', { skipAuth: true }),

  getArticleById: (id) => fetchAPI(`/articles/${id}`, { skipAuth: true }),

  getPancaIndra: () => fetchAPI('/panca-indra', { skipAuth: true }),

  getPartners: () => fetchAPI('/partner', { skipAuth: true }),

  getHero: () => fetchAPI('/hero', { skipAuth: true }),
};

// Admin API calls
export const adminAPI = {
  getDashboard: () => fetchAPI('/admin/dashboard', { isAdmin: true }),

  uploadHero: (formData, heroId) => {
    const endpoint = heroId ? `/admin/hero/${heroId}` : '/admin/hero';
    return fetch(`${API_URL}${endpoint}`, {
      method: heroId ? 'PUT' : 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to upload hero');
      return data;
    });
  },

  updatePancaIndra: (indraName, indraId, formDataObj) => {
    const endpoint = `/admin/${indraName}${indraId ? `/${indraId}` : ''}`;
    return fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: formDataObj,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update data');
      return data;
    });
  },

  addPartner: (formData) => {
    return fetch(`${API_URL}/admin/partner`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add partner');
      return data;
    });
  },

  deletePartner: (id) => {
    return fetch(`${API_URL}/admin/partner/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete partner');
      return data;
    });
  },

  
};

// Diagnosis API calls
export const diagnosisAPI = {
  getSenseData: () => contentAPI.getPancaIndra(),

  getDiagnosisResult: async (payload) => {
    const MODEL_URL = import.meta.env.VITE_API_MODEL;

    const res = await fetch(MODEL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal mendapatkan hasil diagnosis');
    return data;
  },

  saveDiagnosisToBackend: async (payload) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const res = await fetch(`${API_URL}/diagnosa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal menyimpan diagnosis');
    return data;
  },

  getDiagnosisHistory: async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const res = await fetch(`${API_URL}/diagnosa`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal mengambil riwayat diagnosis');
    return data;
  },

  getAllPenyakit: async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const res = await fetch(`${API_URL}/penyakit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal mengambil daftar penyakit');
    return data;
  },

  getPenyakitDetail: async (id) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const res = await fetch(`${API_URL}/penyakit/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal mengambil detail penyakit');
    return data;
  },

  getHistoryData: async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');
  
    if (!token) throw new Error('Token tidak ditemukan');
  
    const res = await fetch(`${API_URL}/diagnosa`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal mengambil riwayat diagnosis');
  
    // Transformasi data agar hasilnya seperti sebelumnya
    return data.data.map((item) => ({
      id: item.id,
      senseType: 'Diagnosis',
      disease: item.diagnosis,
      date: new Date(item.createdAt).toLocaleDateString('id-ID'),
      percentage: parseFloat(item.confidence.replace('%', '')),
      saran: item.saran,
      createdAt: item.createdAt,
    }));
  },
  
}

// profile
export const userAPI = {
  updateProfile: (payload) => fetchAPI('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
};




export default {
  auth: authAPI,
  content: contentAPI,
  admin: adminAPI,
  diagnosis: diagnosisAPI,
  user: userAPI,
};
