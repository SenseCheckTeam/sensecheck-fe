import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import HeroManager from '../components/admin/HeroManager';
import PancaIndraManager from '../components/admin/PancaIndraManager';
import PartnerManager from '../components/admin/PartnerManager';
import SliderManager from '../components/admin/SliderManager';

import { adminPresenter } from '../presenters/adminDashboardPresenter';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sliders');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!adminPresenter.isAdminLoggedIn()) {
      navigate('/admin/login');
      return;
    }

    adminPresenter.loadDashboardData({
      onLoading: setLoading,
      onSuccess: setDashboardData,
      onError: setError,
    });
  }, [navigate]);

  const handleLogout = () => {
    adminPresenter.logout();
    navigate('/admin/login');
  };

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
        <button onClick={() =>
          adminPresenter.loadDashboardData({
            onLoading: setLoading,
            onSuccess: setDashboardData,
            onError: setError,
          })
        }>Try Again</button>
      </div>
    );
  }

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
        <button className={`tab-btn ${activeTab === 'sliders' ? 'active' : ''}`} onClick={() => setActiveTab('sliders')}>Manage Sliders</button>
        <button className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`} onClick={() => setActiveTab('hero')}>Manage Hero</button>
        <button className={`tab-btn ${activeTab === 'pancaindra' ? 'active' : ''}`} onClick={() => setActiveTab('pancaindra')}>Manage Panca Indra</button>
        <button className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`} onClick={() => setActiveTab('partners')}>Manage Partners</button>
      </div>

      <div className="admin-content">
        {activeTab === 'sliders' && <SliderManager data={dashboardData?.sliders || []} onDataChange={() =>
          adminPresenter.loadDashboardData({ onLoading: setLoading, onSuccess: setDashboardData, onError: setError })
        } />}
        {activeTab === 'hero' && <HeroManager data={dashboardData?.heros || []} onDataChange={() =>
          adminPresenter.loadDashboardData({ onLoading: setLoading, onSuccess: setDashboardData, onError: setError })
        } />}
        {activeTab === 'pancaindra' && <PancaIndraManager data={dashboardData?.pancaIndra || []} onDataChange={() =>
          adminPresenter.loadDashboardData({ onLoading: setLoading, onSuccess: setDashboardData, onError: setError })
        } />}
        {activeTab === 'partners' && <PartnerManager data={dashboardData?.partners ? [dashboardData.partners] : []} onDataChange={() =>
          adminPresenter.loadDashboardData({ onLoading: setLoading, onSuccess: setDashboardData, onError: setError })
        } />}
      </div>
    </div>
  );
}

export default AdminDashboard;
