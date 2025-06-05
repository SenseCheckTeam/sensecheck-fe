import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
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

      <Footer />
    </div>
  );
}

export default Layout;
