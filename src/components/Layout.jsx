import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../App.css';

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2023 HealthDiagnose. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
