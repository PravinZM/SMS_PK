import { Bell, Search, User, ChevronDown, Settings } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const path = window.location.pathname.split("/").pop() || "Dashboard";
  const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="title-section">
          <h2 className="page-title">{pageTitle}</h2>
          <span className="breadcrumb">LMS / {pageTitle}</span>
        </div>
        
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search for courses, materials, students..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="nav-actions">
          <button className="icon-btn-modern" aria-label="Notifications">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-btn-modern" aria-label="Settings">
            <Settings size={20} />
          </button>
        </div>

        <div className="user-profile-modern">
          <div className="avatar-wrapper">
            <div className="avatar-initials">
              {user?.full_name?.charAt(0) || "A"}
            </div>
            <div className="status-indicator online"></div>
          </div>
          <div className="user-details">
            <span className="user-name">{user?.full_name || "Admin User"}</span>
            <span className="user-role">{user?.role_name || "LMS Administrator"}</span>
          </div>
          <ChevronDown size={16} className="dropdown-arrow" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
