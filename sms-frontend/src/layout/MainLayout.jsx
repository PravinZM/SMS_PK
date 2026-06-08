import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/Navbar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-container">
        <Navbar />
        <main className="content-area">
          <div className="content-container">
            {children}
          </div>
          <footer className="footer">
            <p>&copy; 2026 LMS ERP System. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Help Center</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
