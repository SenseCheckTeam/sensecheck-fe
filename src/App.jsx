import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import komponen
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

// Import halaman sense
import Penglihatan from './pages/Penglihatan';
import Pendengaran from './pages/Pendengaran';
import Penciuman from './pages/Penciuman';
import Peraba from './pages/Peraba';
import Pengecapan from './pages/Pengecapan';

// Import halaman diagnosis
import Diagnosis from './pages/Diagnosis';
import DiagnosisForm from './pages/DiagnosisForm';
import DiagnosisResult from './pages/DiagnosisResult';

// Import halaman admin
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AdminLoginGuard, AdminDashboardGuard } from './components/admin/AdminAuthGuard';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <AdminLoginGuard>
              <AdminLogin />
            </AdminLoginGuard>
          } />
          <Route path="/admin/dashboard" element={
            <AdminDashboardGuard>
              <AdminDashboard />
            </AdminDashboardGuard>
          } />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          
          {/* Regular Routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<About />} />
            
            {/* Sense Routes */}
            <Route path="penglihatan" element={<Penglihatan />} />
            <Route path="pendengaran" element={<Pendengaran />} />
            <Route path="penciuman" element={<Penciuman />} />
            <Route path="peraba" element={<Peraba />} />
            <Route path="pengecapan" element={<Pengecapan />} />
            
            {/* Diagnosis Routes */}
            <Route path="diagnosis" element={<Diagnosis />} />
            <Route path="diagnosis/:senseType" element={<DiagnosisForm />} />
            <Route path="diagnosis-result" element={<DiagnosisResult />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
