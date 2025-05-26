import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Import komponen admin
import HeroManager from '../components/admin/HeroManager';
import PancaIndraManager from '../components/admin/PancaIndraManager';
import PartnerManager from '../components/admin/PartnerManager';
import SliderManager from '../components/admin/SliderManager';

const API = import.meta.env.VITE_API_URL;

// Komponen untuk dashboard admin
function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sliders');
  const [isAdmin, setIsAdmin] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cek apakah user adalah admin saat komponen dimount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      // Redirect ke halaman admin login jika tidak ada token admin
      navigate('/admin/login');
      return;
    }
    setIsAdmin(true);
    fetchDashboardData();
  }, [navigate]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setDashboardData(data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Jika bukan admin, tampilkan loading
  if (!isAdmin) {
    return (
      <div className="placeholder-content">
        <h2>Checking admin credentials...</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="placeholder-content">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="placeholder-content error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData}>Try Again</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {localStorage.getItem('adminName') || 'Admin'}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'sliders' ? 'active' : ''}`}
          onClick={() => setActiveTab('sliders')}
        >
          Manage Sliders
        </button>
        <button
          className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          Manage Hero
        </button>
        <button
          className={`tab-btn ${activeTab === 'pancaindra' ? 'active' : ''}`}
          onClick={() => setActiveTab('pancaindra')}
        >
          Manage Panca Indra
        </button>
        <button
          className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('partners')}
        >
          Manage Partners
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'sliders' && <SliderManager onDataChange={fetchDashboardData} />}
        {activeTab === 'hero' && <HeroManager data={dashboardData?.heros} onDataChange={fetchDashboardData} />}
        {activeTab === 'pancaindra' && <PancaIndraManager data={dashboardData?.pancaIndra} onDataChange={fetchDashboardData} />}
        {activeTab === 'partners' && <PartnerManager data={dashboardData?.partners} onDataChange={fetchDashboardData} />}
      </div>
    </div>
  );
}

export default AdminDashboard;
