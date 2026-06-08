import MainLayout from "../../layout/MainLayout";
import "../../styles/Common.css";
import { Plus, Search, FileText, Download, MoreVertical, BookOpen } from "lucide-react";

function Materials() {
  const materials = [
    { id: 1, title: "React Fundamentals", type: "PDF", size: "2.4 MB", date: "May 20, 2026", course: "Frontend Dev" },
    { id: 2, title: "Advanced CSS Grid", type: "Video", size: "45 MB", date: "May 22, 2026", course: "Web Design" },
    { id: 3, title: "Node.js Express Guide", type: "DOCX", size: "1.2 MB", date: "May 25, 2026", course: "Backend Dev" },
    { id: 4, title: "Database Design Patterns", type: "PDF", size: "3.8 MB", date: "May 28, 2026", course: "Database Systems" },
  ];

  return (
    <MainLayout>
      <div className="page-header-modern">
        <div className="header-left">
          <h1>Course Materials</h1>
          <p>Manage and organize your educational resources.</p>
        </div>
        <button className="primary-btn-accent">
          <Plus size={18} />
          <span>Upload Material</span>
        </button>
      </div>

      <div className="content-card-modern">
        <div className="table-controls">
          <div className="search-box-modern">
            <Search size={18} />
            <input type="text" placeholder="Search materials..." />
          </div>
          <div className="filter-group">
            <select className="select-modern">
              <option>All Courses</option>
              <option>Frontend Dev</option>
              <option>Backend Dev</option>
            </select>
            <select className="select-modern">
              <option>All Types</option>
              <option>PDF</option>
              <option>Video</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Material Name</th>
                <th>Course</th>
                <th>Type</th>
                <th>Size</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name">
                      <div className="icon-wrapper-small material">
                        <BookOpen size={16} />
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td>{item.course}</td>
                  <td><span className="badge-modern">{item.type}</span></td>
                  <td>{item.size}</td>
                  <td>{item.date}</td>
                  <td>
                    <div className="action-btns-table">
                      <button className="icon-btn-table" title="Download"><Download size={16} /></button>
                      <button className="icon-btn-table"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

export default Materials;
