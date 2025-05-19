import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'

// Sense Pages
import Penglihatan from './pages/Penglihatan'
import Pendengaran from './pages/Pendengaran'
import Penciuman from './pages/Penciuman'
import Peraba from './pages/Peraba'
import Pengecapan from './pages/Pengecapan'

// Diagnosis Pages
import Diagnosis from './pages/Diagnosis'
import DiagnosisForm from './pages/DiagnosisForm'
import DiagnosisResult from './pages/DiagnosisResult'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />

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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
