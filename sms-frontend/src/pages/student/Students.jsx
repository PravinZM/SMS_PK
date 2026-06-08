import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../../layout/MainLayout';
import DashboardCard from '../../components/DashboardCard';
import AddStudentDrawer from '../../components/student/AddStudentDrawer';
import studentService from '../../services/studentService';
import { 
  Plus, 
  Search, 
  Users, 
  UserCheck, 
  UserMinus, 
  Filter,
  FileText,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  ChevronRight,
  HelpCircle,
  PhoneCall,
  MoreVertical,
  ArrowUpRight,
  Settings,
  Loader2
} from 'lucide-react';
import './Students.css';
import '../../styles/Common.css';

// --- Constants ---
const CLASSES = ['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const YEAR_CHART_DATA = [45, 65, 55, 85, 75];

const COMMUNITY_DATA = [
  { label: 'General', value: 450, total: 1240, color: '#6366f1' },
  { label: 'OBC', value: 380, total: 1240, color: '#8b5cf6' },
  { label: 'SC/ST', value: 210, total: 1240, color: '#ec4899' },
  { label: 'Others', value: 200, total: 1240, color: '#f59e0b' }
];

// --- Sub-Components ---

const StudentHeader = ({ onAddStudent }) => (
  <div className="page-header-modern">
    <div className="header-left">
      <h1>Student Management</h1>
      <p>Home / Student / Student List</p>
    </div>
    <div className="header-actions">
      <button className="secondary-btn">
        <Settings size={18} />
        <span>Manage Classes</span>
      </button>
      <button className="primary-btn-accent" onClick={onAddStudent}>
        <Plus size={18} />
        <span>Add Student</span>
      </button>
    </div>
  </div>
);

const ActionBar = () => (
  <div className="students-top-bar">
    <div className="search-wrapper">
      <div className="search-input-group">
        <input type="text" placeholder="Search student by name, roll no, father name..." />
      </div>
      <button className="search-btn-icon">
        <Search size={20} />
      </button>
    </div>
    <div className="filter-group">
      <select className="select-modern">
        <option>2024-2025 Session</option>
        <option>2023-2024 Session</option>
      </select>
      <select className="select-modern">
        <option>All Sections</option>
        <option>Section A</option>
        <option>Section B</option>
      </select>
    </div>
  </div>
);

const StatsGrid = ({ stats }) => (
  <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
    <DashboardCard title="Class List" value="Classes" icon={<Filter />} color="#2563eb" />
    <DashboardCard title="Total Students" value={stats.total} icon={<Users />} color="#8b5cf6" />
    <DashboardCard title="Active Students" value={stats.active} icon={<UserCheck />} color="#10b981" />
    <DashboardCard title="Inactive Students" value={stats.inactive} icon={<UserMinus />} color="#ef4444" />
  </div>
);

const ClassPanel = ({ activeClass, onSelect, classCounts }) => (
  <aside className="class-panel">
    <div className="class-panel-header">
      <h3>Classes</h3>
      <ChevronRight size={16} className="text-light" />
    </div>
    <div className="class-list">
      {CLASSES.map((cls) => (
        <div 
          key={cls} 
          className={`class-item ${activeClass === cls ? 'active' : ''}`}
          onClick={() => onSelect(cls)}
        >
          <span>Class {cls}</span>
          <span className="class-count">{classCounts[cls] || 0}</span>
        </div>
      ))}
    </div>
  </aside>
);

const AnalyticsSection = () => (
  <div className="analytics-grid">
    <div className="chart-card">
      <div className="chart-header">
        <h3>Year Students</h3>
        <MoreVertical size={16} className="text-light" />
      </div>
      <div className="bar-chart-container">
        {YEAR_CHART_DATA.map((h, i) => (
          <div key={i} className="bar-group">
            <div className="bar-container">
              <div className="bar-inner" style={{ height: `${h}%` }}></div>
            </div>
            <span className="bar-label">{2020 + i}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="chart-card">
      <div className="chart-header">
        <h3>Gender Analysis</h3>
        <div className="header-badge">Total 1,240</div>
      </div>
      <div className="doughnut-container">
        <svg viewBox="0 0 36 36" className="circular-chart-student">
          <path className="circle-bg-student" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="circle-male" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="circle-female" strokeDasharray="40, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="gender-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#6366f1' }}></div>
            <div className="legend-info">
              <span className="legend-label">Male</span>
              <span className="legend-value">744 (60%)</span>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: '#ec4899' }}></div>
            <div className="legend-info">
              <span className="legend-label">Female</span>
              <span className="legend-value">496 (40%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="chart-card">
      <div className="chart-header">
        <h3>Community Analysis</h3>
        <ArrowUpRight size={16} className="text-primary" />
      </div>
      <div className="community-list">
        {COMMUNITY_DATA.map((item, index) => (
          <div key={index} className="community-item">
            <div className="community-header">
              <span>{item.label}</span>
              <span>{item.value} Students</span>
            </div>
            <div className="progress-track">
              <div className="progress-bar-inner" style={{ 
                width: `${(item.value / item.total) * 100}%`,
                backgroundColor: item.color 
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="chart-card full-width-analytics">
      <div className="chart-header">
        <h3>Student Count Classwise</h3>
        <div className="filter-group">
          <button className="outline-btn-small active">Current Session</button>
          <button className="outline-btn-small">Previous Session</button>
        </div>
      </div>
      <div className="bar-chart-container" style={{ height: '250px' }}>
        {CLASSES.map((cls, i) => (
          <div key={i} className="bar-group" style={{ flex: 1 }}>
            <div className="bar-container" style={{ width: '30px' }}>
              <div className="bar-inner" style={{ 
                height: `${40 + (Math.sin(i) * 30 + 30)}%`,
                background: i % 2 === 0 ? 'var(--gradient-primary)' : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
              }}></div>
            </div>
            <span className="bar-label">{cls}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StudentTable = ({ students, activeClass, isLoading }) => (
  <div className="content-card-modern" style={{ marginTop: '24px' }}>
    <div className="card-header-modern">
      <div className="header-title-section">
        <h3>Students in Class {activeClass}</h3>
        <p>Showing students for the academic session 2024-2025</p>
      </div>
      <div className="header-badge success">Active Session</div>
    </div>
    <div className="table-responsive">
      {isLoading ? (
        <div className="loading-state" style={{ padding: '40px', textAlign: 'center' }}>
          <Loader2 className="animate-spin" size={40} style={{ color: 'var(--primary-color)', margin: '0 auto' }} />
          <p style={{ marginTop: '12px', color: '#64748b' }}>Loading students...</p>
        </div>
      ) : (
        <table className="table-modern">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Class</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, idx) => (
                <tr key={student.student_id || idx}>
                  <td>{student.roll_no || 'N/A'}</td>
                  <td>
                    <div className="item-name">
                      <div className="icon-wrapper-small material">
                        <Users size={16} />
                      </div>
                      <span>{student.first_name} {student.last_name}</span>
                    </div>
                  </td>
                  <td>{student.father_name || 'N/A'}</td>
                  <td>{student.class}</td>
                  <td><span className={`badge-pill ${student.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>{student.status}</span></td>
                  <td>
                    <div className="action-btns-table">
                      <button className="text-btn-table">View Profile</button>
                      <button className="icon-btn-table"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  No students found in this class.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

const FloatingSupport = () => (
  <div className="floating-actions">
    <div className="floating-btn" title="Call Support">
      <PhoneCall size={20} />
    </div>
    <div className="floating-btn" title="Help Center">
      <HelpCircle size={20} />
    </div>
  </div>
);

// --- Main Page Component ---

const Students = () => {
  const [activeClass, setActiveClass] = useState('LKG');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [classCounts, setClassCounts] = useState({});

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await studentService.getAllStudents();
      if (response.success) {
        const students = response.data;
        setAllStudents(students);
        
        // Calculate stats
        const total = students.length;
        const active = students.filter(s => s.status?.toLowerCase() === 'active').length;
        const inactive = total - active;
        setStats({ total, active, inactive });

        // Calculate class counts
        const counts = {};
        students.forEach(s => {
          counts[s.class] = (counts[s.class] || 0) + 1;
        });
        setClassCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const filteredStudents = allStudents.filter(s => s.class === activeClass);

  const QUICK_ACTIONS = [
    { name: "Student Report", icon: <FileText size={24} />, color: "#2563eb" },
    { name: "Attendance Sheet", icon: <CalendarCheck size={24} />, color: "#10b981" },
    { name: "ID Card Bulk Print", icon: <CreditCard size={24} />, color: "#f59e0b" },
    { name: "Send Notification", icon: <MessageSquare size={24} />, color: "#ef4444" },
  ];

  return (
    <MainLayout>
      <div className="students-container">
        <StudentHeader onAddStudent={() => setIsDrawerOpen(true)} />
        <ActionBar />
        <StatsGrid stats={stats} />

        <div className="students-main-layout">
          <ClassPanel activeClass={activeClass} onSelect={setActiveClass} classCounts={classCounts} />

          <div className="students-content-right">
            <div className="quick-actions-section">
              {QUICK_ACTIONS.map((action, index) => (
                <div key={index} className="action-card">
                  <div className="action-icon-wrapper">
                    {action.icon}
                  </div>
                  <span>{action.name}</span>
                </div>
              ))}
            </div>

            <AnalyticsSection />
            <StudentTable 
              students={filteredStudents} 
              activeClass={activeClass} 
              isLoading={isLoading} 
            />
          </div>
        </div>
        
        <FloatingSupport />

        {/* Add Student Drawer */}
        <AddStudentDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onSuccess={fetchStudents}
        />
      </div>
    </MainLayout>
  );
};

export default Students;
