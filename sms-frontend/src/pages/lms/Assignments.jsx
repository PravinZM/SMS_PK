import MainLayout from "../../layout/MainLayout";
import "../../styles/Common.css";
import { Plus, Search, FileText, MoreVertical, Clock, CheckCircle } from "lucide-react";

function Assignments() {
  const assignments = [
    { id: 1, title: "React State Management", course: "Frontend Dev", deadline: "June 5, 2026", submissions: "124/156", status: "Active" },
    { id: 2, title: "Express Middleware", course: "Backend Dev", deadline: "June 8, 2026", submissions: "85/156", status: "Active" },
    { id: 3, title: "SQL Complex Queries", course: "Database Systems", deadline: "May 30, 2026", submissions: "150/156", status: "Completed" },
    { id: 4, title: "Flexbox Layouts", course: "Web Design", deadline: "June 2, 2026", submissions: "45/156", status: "Active" },
  ];

  return (
    <MainLayout>
      <div className="page-header-modern">
        <div className="header-left">
          <h1>Assignments</h1>
          <p>Track student submissions and assignment deadlines.</p>
        </div>
        <button className="primary-btn-accent">
          <Plus size={18} />
          <span>Create Assignment</span>
        </button>
      </div>

      <div className="content-card-modern">
        <div className="table-controls">
          <div className="search-box-modern">
            <Search size={18} />
            <input type="text" placeholder="Search assignments..." />
          </div>
          <div className="filter-group">
            <select className="select-modern">
              <option>Status: All</option>
              <option>Status: Active</option>
              <option>Status: Completed</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Course</th>
                <th>Deadline</th>
                <th>Submissions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name">
                      <div className="icon-wrapper-small assignment">
                        <FileText size={16} />
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td>{item.course}</td>
                  <td>
                    <div className="deadline-cell">
                      <Clock size={14} className="text-light" />
                      <span>{item.deadline}</span>
                    </div>
                  </td>
                  <td>
                    <div className="submission-progress">
                      <span className="sub-count">{item.submissions}</span>
                      <div className="progress-bar-small">
                        <div className="progress-fill" style={{ width: `${(parseInt(item.submissions.split('/')[0]) / 156) * 100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge-pill ${item.status.toLowerCase()}`}>
                      {item.status === 'Completed' ? <CheckCircle size={12} /> : null}
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns-table">
                      <button className="text-btn-table">Review</button>
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

export default Assignments;
