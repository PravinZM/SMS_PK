import MainLayout from "../../layout/MainLayout";
import DashboardCard from "../../components/DashboardCard";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Users, 
  Bell, 
  TrendingUp,
  Clock,
  ChevronRight,
  Megaphone,
  ArrowRight,
  Plus,
  Calendar
} from "lucide-react";
import "../../styles/Dashboard.css";

function LmsDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || { full_name: "Admin" };

  const stats = [
    { title: "Course Materials", value: "24", icon: <BookOpen />, color: "#2563eb", trend: { type: "up", value: 12 } },
    { title: "Total Assignments", value: "12", icon: <FileText />, color: "#10b981", trend: { type: "up", value: 8 } },
    { title: "Active Quizzes", value: "08", icon: <HelpCircle />, color: "#f59e0b", trend: { type: "down", value: 3 } },
    { title: "Total Students", value: "156", icon: <Users />, color: "#8b5cf6", trend: { type: "up", value: 24 } },
    { title: "New Notifications", value: "05", icon: <Bell />, color: "#ef4444" },
  ];

  const recentActivities = [
    { id: 1, title: "Material Published", desc: "Introduction to Advanced React Patterns", time: "2 hours ago", type: "material", status: "completed" },
    { id: 2, title: "Assignment Review", desc: "15 submissions pending for 'Unit 3 Quiz'", time: "4 hours ago", type: "assignment", status: "pending" },
    { id: 3, title: "New Quiz Created", desc: "Data Structures & Algorithms - Midterm", time: "Yesterday", type: "quiz", status: "completed" },
    { id: 4, title: "Course Enrollment", desc: "12 new students enrolled in 'Fullstack Dev'", time: "2 days ago", type: "system", status: "completed" },
  ];

  return (
    <MainLayout>
      <div className="dashboard-header">
        <div className="welcome-section">
          <span className="date-today">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <h1>Welcome back, {user?.full_name?.split(' ')[0]}! 👋</h1>
          <p>You have 3 assignments to review and 2 quizzes scheduled for today.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn">
            <Calendar size={18} />
            <span>Schedule</span>
          </button>
          <button className="primary-btn-accent">
            <Plus size={18} />
            <span>Create New Course</span>
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="grid-left">
          {/* Charts Row */}
          <div className="charts-container">
             <section className="card-modern analytics-card">
                <div className="card-header-modern">
                  <h3>Assignment Analytics</h3>
                  <div className="header-badge">This Month</div>
                </div>
                <div className="chart-body">
                  <div className="doughnut-ui">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <text x="18" y="20.35" className="percentage">85%</text>
                    </svg>
                  </div>
                  <div className="chart-info-grid">
                    <div className="info-item">
                      <span className="dot submitted"></span>
                      <div className="info-text">
                        <span className="val">1,240</span>
                        <span className="lab">Submitted</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="dot pending"></span>
                      <div className="info-text">
                        <span className="val">156</span>
                        <span className="lab">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
             </section>
             
             <section className="card-modern analytics-card">
                <div className="card-header-modern">
                  <h3>Materials Progress</h3>
                  <div className="header-badge success">Trending Up</div>
                </div>
                <div className="chart-body">
                  <div className="line-chart-ui">
                    <div className="line-bars">
                      {[40, 65, 45, 90, 70, 85, 60].map((h, i) => (
                        <div key={i} className="bar-wrapper">
                          <div className="bar-track">
                             <div className="bar-fill" style={{ height: `${h}%` }}></div>
                          </div>
                          <span className="bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="chart-footer-stats">
                    <div className="stat">
                      <TrendingUp size={16} className="text-success" />
                      <span>24% increase vs last week</span>
                    </div>
                  </div>
                </div>
             </section>
          </div>

          {/* Recent Activity */}
          <section className="card-modern activity-section">
            <div className="card-header-modern">
              <div className="header-title">
                <Clock size={20} className="text-primary" />
                <h3>Recent Activities</h3>
              </div>
              <button className="text-link">View Detailed Log <ArrowRight size={14} /></button>
            </div>
            <div className="activity-timeline">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="timeline-item">
                  <div className={`timeline-icon-box ${activity.type}`}>
                    {activity.type === 'material' && <BookOpen size={16} />}
                    {activity.type === 'assignment' && <FileText size={16} />}
                    {activity.type === 'quiz' && <HelpCircle size={16} />}
                    {activity.type === 'system' && <Bell size={16} />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{activity.title}</h4>
                      <span className="timeline-time">{activity.time}</span>
                    </div>
                    <p>{activity.desc}</p>
                    <div className={`status-pill ${activity.status}`}>
                      {activity.status}
                    </div>
                  </div>
                  <button className="item-action-btn">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid-right">
          {/* Announcements */}
          <section className="announcement-panel">
            <div className="ann-header">
              <div className="ann-icon-bg">
                <Megaphone size={20} color="#fff" />
              </div>
              <h3>Announcements</h3>
            </div>
            <div className="ann-list">
              <div className="ann-card">
                <div className="ann-meta">
                  <span className="category maintenance">Maintenance</span>
                  <span className="date">June 2, 2026</span>
                </div>
                <h4>System Maintenance Notice</h4>
                <p>The system will be down for scheduled maintenance on Tuesday from 2:00 AM to 4:00 AM EST.</p>
              </div>
              <div className="ann-card">
                <div className="ann-meta">
                  <span className="category update">New Content</span>
                  <span className="date">May 28, 2026</span>
                </div>
                <h4>New Course Materials Available</h4>
                <p>Advanced React Hooks and Context API modules are now live for all enrolled students.</p>
              </div>
            </div>
            <button className="outline-btn-modern">See All Announcements</button>
          </section>

          {/* Quick Tasks */}
          <section className="card-modern quick-tasks">
            <div className="card-header-modern">
              <h3>Quick Actions</h3>
            </div>
            <div className="task-grid">
               <button className="task-btn">
                  <div className="task-icon material"><Plus size={18} /></div>
                  <span>Add Material</span>
               </button>
               <button className="task-btn">
                  <div className="task-icon quiz"><Plus size={18} /></div>
                  <span>New Quiz</span>
               </button>
               <button className="task-btn">
                  <div className="task-icon notify"><Plus size={18} /></div>
                  <span>Notify All</span>
               </button>
               <button className="task-btn">
                  <div className="task-icon reports"><FileText size={18} /></div>
                  <span>Reports</span>
               </button>
            </div>
          </section>

          {/* System Status Card */}
          <div className="system-status-card">
            <div className="status-header">
               <div className="status-dot pulse"></div>
               <span>System Online</span>
            </div>
            <p>LMS Version 2.4.0 (Enterprise)</p>
            <div className="usage-meter">
               <div className="meter-bar" style={{ width: '65%' }}></div>
            </div>
            <span className="usage-label">Server Usage: 65%</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LmsDashboard;
