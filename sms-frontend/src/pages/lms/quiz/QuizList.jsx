import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Send, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  X,
  Archive
} from 'lucide-react';
import MainLayout from "../../../layout/MainLayout";
import StatusBadge from "../../../components/ui/StatusBadge";
import ConfirmModal from "../../../modals/ConfirmModal";
import SuccessModal from "../../../modals/SuccessModal";
import { quizService } from "../../../services/quizService";
import '../../../styles/quiz/QuizTable.css';

const QuizList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Modals state
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', quizId: null, title: '', message: '' });
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '', isError: false });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    const data = await quizService.getQuizzes();
    setQuizzes(data);
    setLoading(false);
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAllRows = () => {
    if (selectedRows.length === quizzes.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(quizzes.map(q => q.id));
    }
  };

  const handleActionClick = (type, quizId) => {
    let title = '';
    let message = '';
    
    if (type === 'delete') {
      title = 'Delete Quiz?';
      message = quizId 
        ? 'Are you sure you want to delete this quiz? This action will move it to archive.' 
        : `Are you sure you want to delete ${selectedRows.length} selected quizzes?`;
    } else if (type === 'publish') {
      title = 'Publish Quiz?';
      message = 'Are you sure you want to publish this quiz? Once published, students can attempt it as per the schedule.';
    }

    setConfirmModal({ isOpen: true, type, quizId, title, message });
  };

  const handleConfirm = async () => {
    const { type, quizId } = confirmModal;
    setLoading(true);
    
    try {
      if (type === 'delete') {
        if (quizId) {
          await quizService.deleteQuiz(quizId);
        } else {
          // Bulk delete
          await Promise.all(selectedRows.map(id => quizService.deleteQuiz(id)));
          setSelectedRows([]);
        }
        setSuccessModal({ isOpen: true, title: 'Success!', message: 'Operation completed successfully.', isError: false });
      } else if (type === 'publish') {
        await quizService.publishQuiz(quizId);
        setSuccessModal({ isOpen: true, title: 'Published!', message: 'Quiz is now live for students.', isError: false });
      }
      fetchQuizzes();
    } catch (err) {
      setSuccessModal({ isOpen: true, title: 'Error', message: 'Something went wrong. Please try again.', isError: true });
    } finally {
      setConfirmModal({ ...confirmModal, isOpen: false });
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="page-header">
        <div className="header-text">
          <h1>Quiz Management</h1>
          <p>Create, manage and monitor student quizzes across all subjects.</p>
        </div>
        <div className="header-actions">
          <button className="outline-btn">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="primary-btn" onClick={() => navigate('/quizzes/create')}>
            <Plus size={18} />
            <span>Create New Quiz</span>
          </button>
        </div>
      </div>

      {selectedRows.length > 0 && (
        <div className="bulk-actions-bar animate-slide-down">
          <div className="selection-count">
            <span>{selectedRows.length} items selected</span>
          </div>
          <div className="bulk-btns">
            <button className="bulk-btn primary"><Send size={16} /> Publish</button>
            <button className="bulk-btn info"><Archive size={16} /> Archive</button>
            <button className="bulk-btn danger" onClick={() => handleActionClick('delete', null)}><Trash2 size={16} /> Delete</button>
          </div>
          <button className="close-bulk" onClick={() => setSelectedRows([])}><X size={18} /></button>
        </div>
      )}

      <div className="table-filters-container card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by title, code or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className="filter-btn">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <select className="filter-select">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-responsive">
          <table className="enterprise-table sticky-header">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === quizzes.length && quizzes.length > 0}
                    onChange={toggleAllRows}
                  />
                </th>
                <th>Quiz Details</th>
                <th>Subject & Class</th>
                <th>Configuration</th>
                <th>Marks</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="skeleton-row">
                    <td colSpan="8"><div className="skeleton"></div></td>
                  </tr>
                ))
              ) : (
                quizzes.map((quiz) => (
                  <tr key={quiz.id} className={selectedRows.includes(quiz.id) ? 'selected-row' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(quiz.id)}
                        onChange={() => toggleRowSelection(quiz.id)}
                      />
                    </td>
                    <td>
                      <div className="quiz-info">
                        <span className="quiz-title">{quiz.title}</span>
                        <span className="quiz-code">{quiz.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="subject-info">
                        <span>{quiz.subject}</span>
                        <span className="class-badge">{quiz.class}</span>
                      </div>
                    </td>
                    <td>
                      <div className="config-info">
                        <span>{quiz.totalQuestions} Questions</span>
                        <span>{quiz.duration}</span>
                      </div>
                    </td>
                    <td>
                      <div className="marks-info">
                        <span>Total: {quiz.totalMarks}</span>
                        <span className="pass-marks">Pass: {quiz.passMarks}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        <span>Start: {quiz.startDate}</span>
                        <span>End: {quiz.endDate}</span>
                      </div>
                    </td>
                    <td><StatusBadge status={quiz.status} /></td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-action" title="View Details"><Eye size={16} /></button>
                        <button className="icon-action" title="Edit Quiz" onClick={() => navigate(`/quizzes/edit/${quiz.id}`)}><Edit size={16} /></button>
                        {quiz.status === 'Draft' && (
                          <button className="icon-action text-success" onClick={() => handleActionClick('publish', quiz.id)} title="Publish"><Send size={16} /></button>
                        )}
                        <button className="icon-action text-danger" onClick={() => handleActionClick('delete', quiz.id)} title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <div className="pagination-info">
            Showing <span>1 to {quizzes.length}</span> of <span>{quizzes.length}</span> entries
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled><ChevronLeft size={18} /></button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type === 'delete' ? 'danger' : 'primary'}
        confirmText={confirmModal.type === 'delete' ? 'Delete' : 'Publish'}
        loading={loading}
      />

      {/* Success/Error Modal */}
      <SuccessModal 
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal.title}
        message={successModal.message}
        isError={successModal.isError}
      />
    </MainLayout>
  );
};

export default QuizList;