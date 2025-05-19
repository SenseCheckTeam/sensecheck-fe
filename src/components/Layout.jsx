import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import '../App.css';

function Layout() {
  const location = useLocation();

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <div className="page-transition" key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} SenseCheck. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
