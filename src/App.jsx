import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import komponen
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import History from './pages/History';
import Profile from './pages/Profile';

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

// Import error pages
import NotFound from './pages/errors/NotFound';
import ErrorPage from './pages/errors/ErrorPage';
import ErrorDemo from './pages/errors/ErrorDemo';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
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

            {/* Error Routes */}
            <Route path="/error/:statusCode" element={<ErrorPage />} />
            <Route path="/error-demo" element={<ErrorDemo />} />

            {/* Regular Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />

              {/* Protected Routes */}
              <Route path="history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Sense Routes */}
              <Route path="penglihatan" element={<Penglihatan />} />
              <Route path="pendengaran" element={<Pendengaran />} />
              <Route path="penciuman" element={<Penciuman />} />
              <Route path="peraba" element={<Peraba />} />
              <Route path="pengecapan" element={<Pengecapan />} />

              {/* Diagnosis Routes - Protected */}
              <Route path="diagnosis" element={
                <ProtectedRoute>
                  <Diagnosis />
                </ProtectedRoute>
              } />
              <Route path="diagnosis/:senseType" element={
                <ProtectedRoute>
                  <DiagnosisForm />
                </ProtectedRoute>
              } />
              <Route path="diagnosis-result" element={
                <ProtectedRoute>
                  <DiagnosisResult />
                </ProtectedRoute>
              } />

              {/* 404 Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Route>
            </Routes>
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
