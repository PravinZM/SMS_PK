import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Bell, 
  LogOut,
  GraduationCap,
  ChevronRight
} from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";
import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/materials", label: "Materials", icon: <BookOpen size={20} /> },
    { path: "/assignments", label: "Assignments", icon: <FileText size={20} /> },
    { path: "/quizzes", label: "Quizzes", icon: <HelpCircle size={20} /> },
    { path: "/notifications", label: "Notifications", icon: <Bell size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <GraduationCap size={24} color="#fff" />
            </div>
            <h2 className="logo-text">LMS ERP</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">Main Menu</p>
          <ul>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    <span className="icon-wrapper">{item.icon}</span>
                    <span className="label">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="active-arrow" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => setShowLogoutConfirm(true)} className="logout-btn">
            <span className="icon-wrapper"><LogOut size={20} /></span>
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      <ConfirmModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account? Any unsaved changes may be lost."
        type="danger"
        confirmText="Logout"
      />
    </>
  );
}

export default Sidebar;
