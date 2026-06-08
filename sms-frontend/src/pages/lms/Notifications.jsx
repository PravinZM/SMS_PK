import MainLayout from "../../layout/MainLayout";
import "../../styles/Common.css";
import { Bell, Search, Filter, MoreHorizontal, Circle } from "lucide-react";

function Notifications() {
  const notifications = [
    { id: 1, title: "System Update Successful", message: "LMS Version 2.4.0 has been deployed successfully with new features.", time: "2 hours ago", unread: true, type: "system" },
    { id: 2, title: "New Assignment Submission", message: "John Doe submitted 'React Hooks' assignment.", time: "4 hours ago", unread: true, type: "assignment" },
    { id: 3, title: "Maintenance Reminder", message: "Scheduled maintenance in 24 hours.", time: "Yesterday", unread: false, type: "reminder" },
    { id: 4, title: "Course Material Added", message: "New PDF uploaded to Frontend Development course.", time: "2 days ago", unread: false, type: "material" },
  ];

  return (
    <MainLayout>
      <div className="page-header-modern">
        <div className="header-left">
          <h1>Notifications</h1>
          <p>Stay updated with the latest activities and system alerts.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn">Mark all as read</button>
          <button className="primary-btn-accent">Settings</button>
        </div>
      </div>

      <div className="notification-container">
        <div className="content-card-modern">
          <div className="notification-filters">
            <button className="filter-tab active">All Notifications</button>
            <button className="filter-tab">Unread</button>
            <button className="filter-tab">System</button>
            <button className="filter-tab">Course Updates</button>
          </div>

          <div className="notification-list">
            {notifications.map((notif) => (
              <div key={notif.id} className={`notification-item-modern ${notif.unread ? 'unread' : ''}`}>
                <div className="notif-status">
                  {notif.unread && <Circle size={12} fill="var(--primary)" color="var(--primary)" />}
                </div>
                <div className={`notif-icon-box ${notif.type}`}>
                  <Bell size={18} />
                </div>
                <div className="notif-content">
                  <div className="notif-header">
                    <h4>{notif.title}</h4>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <p>{notif.message}</p>
                </div>
                <button className="notif-action-btn">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="notif-footer">
            <button className="load-more-btn">Load Older Notifications</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Notifications;
