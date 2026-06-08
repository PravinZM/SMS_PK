import React from 'react';
import MainLayout from '../../layout/MainLayout';

const StudentReports = () => {
  return (
    <MainLayout>
      <div className="page-header">
        <div className="header-text">
          <h1>Student Reports</h1>
          <p>Generate and view academic and behavioral reports for students.</p>
        </div>
      </div>
      <div className="card" style={{ marginTop: "24px", padding: "20px" }}>
        <p>This is the Student Reports page UI. Detailed reports will be shown here.</p>
      </div>
    </MainLayout>
  );
};

export default StudentReports;
