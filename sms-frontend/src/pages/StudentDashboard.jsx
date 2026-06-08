import React from 'react';
import { Plus, Search, MoreVertical, Users, UserCheck, UserMinus, FileText, CalendarCheck, CreditCard, Send, ChevronRight } from 'lucide-react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const classes = [
    'LKG', 'NURSERY', 'UKG', 'SKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
  ];

  return (
    <div className="student-dashboard">
      {/* Header and Breadcrumbs removed as they are now in the Navbar */}

      <div className="search-section glass">
        <button className="add-btn-gradient">
          <Plus size={20} />
          <span>Add New Student</span>
        </button>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon-gray" />
            <input type="text" placeholder="Search by Name, Admission No or Roll No..." />
          </div>
          <button className="search-trigger-btn">Search</button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Class Panel */}
        <div className="class-panel glass">
          <div className="panel-header">
            <h3>Grade Classes</h3>
          </div>
          <div className="class-list">
            {classes.map((cls) => (
              <div key={cls} className={`class-item ${cls === 'I' ? 'active' : ''}`}>
                <span>{cls} Grade</span>
                <ChevronRight size={14} className="arrow" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="dashboard-main">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-icon-wrapper">
                <Users size={24} />
              </div>
              <div className="stat-info">
                <span className="label">Total Students</span>
                <h2 className="value">1,240</h2>
              </div>
              <div className="stat-trend positive">+12% vs last month</div>
            </div>
            <div className="stat-card purple">
              <div className="stat-icon-wrapper">
                <UserCheck size={24} />
              </div>
              <div className="stat-info">
                <span className="label">Active Students</span>
                <h2 className="value">1,180</h2>
              </div>
              <div className="stat-trend positive">+5% vs last month</div>
            </div>
            <div className="stat-card pink">
              <div className="stat-icon-wrapper">
                <UserMinus size={24} />
              </div>
              <div className="stat-info">
                <span className="label">Inactive Students</span>
                <h2 className="value">60</h2>
              </div>
              <div className="stat-trend negative">-2% vs last month</div>
            </div>
          </div>

          {/* Action Shortcuts */}
          <div className="action-grid">
            <div className="action-card-modern">
              <div className="action-icon-modern purple-bg">
                <FileText size={22} />
              </div>
              <div className="action-content">
                <h4>Student Report</h4>
                <p>Generate detailed academic reports</p>
              </div>
            </div>
            <div className="action-card-modern">
              <div className="action-icon-modern green-bg">
                <CalendarCheck size={22} />
              </div>
              <div className="action-content">
                <h4>Attendance</h4>
                <p>Manage daily student presence</p>
              </div>
            </div>
            <div className="action-card-modern">
              <div className="action-icon-modern blue-bg">
                <CreditCard size={22} />
              </div>
              <div className="action-content">
                <h4>ID Cards</h4>
                <p>Bulk print student identity cards</p>
              </div>
            </div>
            <div className="action-card-modern">
              <div className="action-icon-modern pink-bg">
                <Send size={22} />
              </div>
              <div className="action-content">
                <h4>Notifications</h4>
                <p>Send bulk SMS or push alerts</p>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="analytics-grid">
            <div className="analytics-card-modern large">
              <div className="analytics-header">
                <h3>Yearly Student Growth</h3>
                <button className="icon-menu-btn"><MoreVertical size={18} /></button>
              </div>
              <div className="chart-content">
                <div className="modern-bar-chart">
                  {[40, 60, 45, 80, 55, 70, 90, 65, 50, 85, 75, 95].map((h, i) => (
                    <div key={i} className="bar-wrapper">
                      <div className="modern-bar" style={{ height: `${h}%` }}>
                        <div className="bar-tooltip">{h}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="analytics-card-modern">
              <div className="analytics-header">
                <h3>Gender Analysis</h3>
                <button className="icon-menu-btn"><MoreVertical size={18} /></button>
              </div>
              <div className="chart-content centered">
                <div className="modern-donut">
                  <div className="donut-center">
                    <span className="donut-val">1.2K</span>
                    <span className="donut-lbl">Total</span>
                  </div>
                </div>
                <div className="modern-legend">
                  <div className="legend-row"><span className="dot-blue"></span> Male: 52%</div>
                  <div className="legend-row"><span className="dot-pink"></span> Female: 48%</div>
                </div>
              </div>
            </div>
            <div className="analytics-card-modern">
              <div className="analytics-header">
                <h3>Community Groups</h3>
                <button className="icon-menu-btn"><MoreVertical size={18} /></button>
              </div>
              <div className="chart-content">
                <div className="community-progress-list">
                  <div className="progress-item">
                    <div className="progress-labels">
                      <span>General</span>
                      <span>45%</span>
                    </div>
                    <div className="modern-progress-bg"><div className="modern-progress-fill purple" style={{ width: '45%' }}></div></div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-labels">
                      <span>OBC</span>
                      <span>35%</span>
                    </div>
                    <div className="modern-progress-bg"><div className="modern-progress-fill blue" style={{ width: '35%' }}></div></div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-labels">
                      <span>SC/ST</span>
                      <span>20%</span>
                    </div>
                    <div className="modern-progress-bg"><div className="modern-progress-fill pink" style={{ width: '20%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
