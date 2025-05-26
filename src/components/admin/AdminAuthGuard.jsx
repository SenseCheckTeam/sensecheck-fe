import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Komponen untuk redirect admin yang sudah login
export function AdminLoginGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // Jika sudah login, tidak render children
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    return null;
  }

  return children;
}

// Komponen untuk proteksi dashboard (admin harus login)
export function AdminDashboardGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return (
      <div className="placeholder-content">
        <h2>Checking admin credentials...</h2>
      </div>
    );
  }

  return children;
}