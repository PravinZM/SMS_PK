import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ChevronRight,
  BookMarked,
  FileEdit,
  GraduationCap,
  Bell,
  UserCircle,
  ClipboardList,
  Search
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  // State persistence using localStorage - only ONE active menu allowed
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem('sidebar_active_menu') || null;
  });

  useEffect(() => {
    if (activeMenu) {
      localStorage.setItem('sidebar_active_menu', activeMenu);
    } else {
      localStorage.removeItem('sidebar_active_menu');
    }
  }, [activeMenu]);

  const toggleMenu = (menuName) => {
    setActiveMenu(prev => prev === menuName ? null : menuName);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { 
      name: 'LMS', 
      icon: <BookOpen size={20} />, 
      path: '/lms',
      submenus: [
        { name: 'Materials', icon: <BookMarked size={16} />, path: '/lms/materials' },
        { name: 'Assignments', icon: <FileEdit size={16} />, path: '/lms/assignments' },
        { name: 'Quizzes', icon: <GraduationCap size={16} />, path: '/lms/quizzes' },
        { name: 'Notifications', icon: <Bell size={16} />, path: '/lms/notifications' }
      ]
    },
    { 
      name: 'Student', 
      icon: <Users size={20} />, 
      path: '/student',
      submenus: [
        { name: 'Students', icon: <UserCircle size={16} />, path: '/student/students' },
        { name: 'Student Explorer', icon: <Search size={16} />, path: '/student/explorer' },
        { name: 'Student Reports', icon: <ClipboardList size={16} />, path: '/student/student-reports' }
      ]
    }
  ];

  // Helper to check if a main menu should be active based on its submenus
  const isParentActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.submenus) {
      return item.submenus.some(sub => location.pathname === sub.path);
    }
    return false;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon-container">
            <span className="logo-text">S</span>
          </div>
          <span className="school-name">SMS ERP</span>
        </div>
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div key={item.name} className="menu-group">
            {item.submenus ? (
              <>
                <div 
                  className={`menu-item ${activeMenu === item.name ? 'open' : ''} ${isParentActive(item) ? 'parent-active' : ''}`} 
                  onClick={() => toggleMenu(item.name)}
                >
                  <div className="menu-item-content">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <div className={`arrow-icon ${activeMenu === item.name ? 'rotated' : ''}`}>
                    <ChevronRight size={16} />
                  </div>
                </div>
                <div className={`submenu-container ${activeMenu === item.name ? 'expanded' : ''}`}>
                  {item.submenus.map((sub) => (
                    <NavLink 
                      key={sub.name} 
                      to={sub.path} 
                      className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
                    >
                      <div className="submenu-item-content">
                        {sub.icon}
                        <span>{sub.name}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
              >
                <div className="menu-item-content">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
