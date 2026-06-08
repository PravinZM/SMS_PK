import React from 'react';
import MainLayout from "../../../layout/MainLayout";
import DashboardCard from '../../../components/DashboardCard';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  Trophy, 
  Target, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import '../../../styles/quiz/QuizTable.css'; // Reusing some table styles
import '../../../styles/Dashboard.css';

const QuizDashboard = () => {
  const stats = [
    { title: "Total Quizzes", value: "48", icon: <Target />, color: "#2563eb" },
    { title: "Active Quizzes", value: "12", icon: <CheckCircle2 />, color: "#10b981" },
    { title: "Total Attempts", value: "1,284", icon: <Users />, color: "#8b5cf6" },
    { title: "Avg. Pass Rate", value: "72%", icon: <Trophy />, color: "#f59e0b" },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <div className="header-text">
          <h1>Quiz Analytics</h1>
          <p>Monitor performance metrics and student engagement across all assessments.</p>
        </div>
        <button className="primary-btn">
          <BarChart3 size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="grid-left">
          <div className="card">
            <h3>Performance Trends</h3>
            <div className="chart-placeholder" style={{ height: '300px' }}>
              {/* Simulated Chart */}
              <div className="line-graph" style={{ height: '200px', alignItems: 'flex-end', gap: '30px' }}>
                <div className="bar" style={{ height: '60%', backgroundColor: 'var(--primary)' }}></div>
                <div className="bar" style={{ height: '80%', backgroundColor: 'var(--primary)' }}></div>
                <div className="bar" style={{ height: '45%', backgroundColor: 'var(--primary)' }}></div>
                <div className="bar" style={{ height: '90%', backgroundColor: 'var(--primary)' }}></div>
                <div className="bar" style={{ height: '75%', backgroundColor: 'var(--primary)' }}></div>
              </div>
              <div className="chart-labels" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span>
              </div>
            </div>
          </div>

          <div className="card mt-xl" style={{ marginTop: '32px' }}>
            <h3>Top Performing Students</h3>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Quizzes Taken</th>
                  <th>Avg. Score</th>
                  <th>Consistency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alice Johnson</td>
                  <td>12</td>
                  <td>94%</td>
                  <td><span className="badge-ui active">High</span></td>
                </tr>
                <tr>
                  <td>Bob Smith</td>
                  <td>10</td>
                  <td>88%</td>
                  <td><span className="badge-ui info">Medium</span></td>
                </tr>
                <tr>
                  <td>Charlie Brown</td>
                  <td>15</td>
                  <td>82%</td>
                  <td><span className="badge-ui warning">Variable</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid-right">
          <div className="card analytics-card">
            <h3>Subject Distribution</h3>
            <div className="chart-placeholder doughnut" style={{ width: '180px', height: '180px' }}>
               <div className="doughnut-center">
                  <span className="val">5</span>
                  <span className="lab">Subjects</span>
               </div>
            </div>
            <div className="chart-legend" style={{ marginTop: '24px' }}>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#2563eb' }}></span> Web Dev (40%)</div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#10b981' }}></span> Database (30%)</div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#f59e0b' }}></span> Network (20%)</div>
              <div className="legend-item"><span className="dot" style={{ backgroundColor: '#ef4444' }}></span> Security (10%)</div>
            </div>
          </div>

          <div className="card mt-xl" style={{ marginTop: '32px' }}>
            <h3>Recent Alerts</h3>
            <div className="activity-list">
              <div className="activity-item">
                <AlertCircle size={16} className="text-danger" />
                <div className="activity-info">
                  <h4>Low Pass Rate</h4>
                  <p>Quiz 'SQL Joins' has &lt; 40% pass rate.</p>
                </div>
              </div>
              <div className="activity-item">
                <CheckCircle2 size={16} className="text-success" />
                <div className="activity-info">
                  <h4>High Engagement</h4>
                  <p>100+ students completed 'React Hooks'.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizDashboard;