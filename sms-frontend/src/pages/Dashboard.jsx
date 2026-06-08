import React from 'react';
import MainLayout from '../layout/MainLayout';

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <MainLayout>
      <div className="page-header">
        <div className="header-text">
          <h1>Main Dashboard</h1>
          <p>Welcome back, {user?.full_name || 'Admin'}. Here is what's happening today.</p>
        </div>
      </div>

      <div className="dashboard-content" style={{ marginTop: "24px" }}>
        <div className="card" style={{ padding: "24px" }}>
          <h2>Welcome {user?.full_name || 'Admin'}</h2>
          <p style={{ color: "var(--text-gray)", marginTop: "8px" }}>
            Role: {user?.role_name || 'Administrator'}
          </p>
          <div style={{ marginTop: "24px", padding: "16px", background: "var(--bg-main)", borderRadius: "12px" }}>
            <p>This is your overview of the SMS ERP system. Use the sidebar to navigate through LMS and Student modules.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
