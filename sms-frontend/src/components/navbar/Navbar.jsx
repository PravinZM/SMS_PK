import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Moon, 
  Star, 
  Bell, 
  ChevronDown,
  ChevronRight,
  Home
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  // Helper to generate dynamic title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    
    // Capitalize and join
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ')).join(' ');
  };

  // Helper to generate breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { name: 'Home', path: '/dashboard', icon: <Home size={14} /> }
    ];
    
    let currentPath = '';
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      breadcrumbs.push({
        name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
        path: currentPath,
        active: index === parts.length - 1
      });
    });
    
    return breadcrumbs;
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-left">
        <div className="title-section">
          <h2 className="page-title">{getPageTitle()}</h2>
          <div className="breadcrumb-nav">
            {getBreadcrumbs().map((crumb, index) => (
              <React.Fragment key={index}>
                <Link 
                  to={crumb.path} 
                  className={`breadcrumb-item ${crumb.active ? 'active' : ''}`}
                >
                  {crumb.icon && <span className="crumb-icon">{crumb.icon}</span>}
                  <span>{crumb.name}</span>
                </Link>
                {index < getBreadcrumbs().length - 1 && (
                  <ChevronRight size={14} className="breadcrumb-separator" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="academic-year-pill">
          <div className="pill-dot"></div>
          <span>2024 - 2025</span>
          <ChevronDown size={14} />
        </div>

        <div className="navbar-actions">
          <div className="action-btn">
            <Moon size={18} />
          </div>
          <div className="action-btn">
            <Star size={18} />
          </div>
          <div className="action-btn notification">
            <Bell size={18} />
            <span className="notification-badge"></span>
          </div>
        </div>

        <div className="user-dropdown">
          <div className="user-avatar-container">
            <img src="https://ui-avatars.com/api/?name=Admin&background=6c63ff&color=fff" alt="Admin" />
          </div>
          <div className="user-meta">
            <span className="user-role">Administrator</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
