import MainLayout from "../../layout/MainLayout";
import "../../styles/Common.css";
import { Plus, Search, HelpCircle, MoreVertical, Timer, Users } from "lucide-react";

function Quizzes() {
  const quizzes = [
    { id: 1, title: "React Hooks Quiz", course: "Frontend Dev", duration: "30 mins", questions: 20, attempts: 142 },
    { id: 2, title: "REST API Basics", course: "Backend Dev", duration: "45 mins", questions: 30, attempts: 98 },
    { id: 3, title: "CSS Selectors Pro", course: "Web Design", duration: "15 mins", questions: 10, attempts: 156 },
    { id: 4, title: "MongoDB Aggregation", course: "Database Systems", duration: "60 mins", questions: 25, attempts: 64 },
  ];

  return (
    <MainLayout>
      <div className="page-header-modern">
        <div className="header-left">
          <h1>Quizzes</h1>
          <p>Create and manage interactive assessments for students.</p>
        </div>
        <button className="primary-btn-accent">
          <Plus size={18} />
          <span>New Quiz</span>
        </button>
      </div>

      <div className="content-card-modern">
        <div className="table-controls">
          <div className="search-box-modern">
            <Search size={18} />
            <input type="text" placeholder="Search quizzes..." />
          </div>
          <div className="filter-group">
            <button className="outline-btn-small active">Active</button>
            <button className="outline-btn-small">Drafts</button>
            <button className="outline-btn-small">Archived</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Quiz Title</th>
                <th>Course</th>
                <th>Duration</th>
                <th>Questions</th>
                <th>Total Attempts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name">
                      <div className="icon-wrapper-small quiz">
                        <HelpCircle size={16} />
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td>{item.course}</td>
                  <td>
                    <div className="info-cell">
                      <Timer size={14} className="text-light" />
                      <span>{item.duration}</span>
                    </div>
                  </td>
                  <td>{item.questions} Qs</td>
                  <td>
                    <div className="info-cell">
                      <Users size={14} className="text-light" />
                      <span>{item.attempts}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-btns-table">
                      <button className="text-btn-table">Edit Quiz</button>
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

export default Quizzes;
