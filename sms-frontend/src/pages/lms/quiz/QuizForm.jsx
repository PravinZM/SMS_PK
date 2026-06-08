import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Settings, 
  HelpCircle, 
  CheckCircle,
  Clock,
  Layout,
  Type
} from 'lucide-react';
import MainLayout from "../../../layout/MainLayout";
import SuccessModal from "../../../modals/SuccessModal";
import '../../../styles/quiz/QuizForm.css';

const QuizForm = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showSuccess, setShowSuccess] = useState(false);
  const [questions, setQuestions] = useState([
    { id: 1, type: 'mcq', text: '', options: ['', '', '', ''], correctOption: 0, marks: 5 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { 
      id: questions.length + 1, 
      type: 'mcq', 
      text: '', 
      options: ['', '', '', ''], 
      correctOption: 0, 
      marks: 5 
    }]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <MainLayout>
      <div className="page-header">
        <div className="header-text">
          <button className="back-link" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            <span>Back to Quizzes</span>
          </button>
          <h1>Create New Quiz</h1>
        </div>
        <div className="header-actions">
          <button className="outline-btn">Save Draft</button>
          <button className="primary-btn" onClick={handleSave}>
            <Save size={18} />
            <span>Publish Quiz</span>
          </button>
        </div>
      </div>

      <div className="form-tabs">
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} />
          <span>Quiz Settings</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <HelpCircle size={18} />
          <span>Question Builder</span>
        </button>
      </div>

      <form className="quiz-form-container" onSubmit={handleSave}>
        {activeTab === 'settings' ? (
          <div className="form-section card animate-fade-in">
            <h3 className="section-title"><Layout size={20} /> Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Quiz Title*</label>
                <input type="text" placeholder="e.g. Mid-term React Exam" required />
              </div>
              <div className="form-group">
                <label>Quiz Code</label>
                <input type="text" placeholder="QZ-2026-001" />
              </div>
              <div className="form-group">
                <label>Subject*</label>
                <select required>
                  <option value="">Select Subject</option>
                  <option value="web">Web Development</option>
                  <option value="db">Database Systems</option>
                </select>
              </div>
              <div className="form-group">
                <label>Class/Batch*</label>
                <select required>
                  <option value="">Select Class</option>
                  <option value="y2cs">Year 2 - Computer Science</option>
                  <option value="y1it">Year 1 - IT</option>
                </select>
              </div>
            </div>

            <h3 className="section-title mt-xl"><Clock size={20} /> Configuration</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Duration (Minutes)*</label>
                <input type="number" placeholder="45" required />
              </div>
              <div className="form-group">
                <label>Total Marks*</label>
                <input type="number" placeholder="100" required />
              </div>
              <div className="form-group">
                <label>Pass Marks*</label>
                <input type="number" placeholder="40" required />
              </div>
              <div className="form-group">
                <label>Attempts Allowed</label>
                <input type="number" defaultValue="1" />
              </div>
            </div>

            <h3 className="section-title mt-xl"><Settings size={20} /> Advanced Options</h3>
            <div className="options-grid">
              <label className="switch-container">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
                <span>Shuffle Questions</span>
              </label>
              <label className="switch-container">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
                <span>Shuffle Options</span>
              </label>
              <label className="switch-container">
                <input type="checkbox" />
                <span className="slider"></span>
                <span>Negative Marking</span>
              </label>
              <label className="switch-container">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
                <span>Show Results Immediately</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="question-builder-section animate-fade-in">
            {questions.map((q, index) => (
              <div key={q.id} className="question-card card">
                <div className="question-header">
                  <span className="question-number">Question {index + 1}</span>
                  <div className="question-actions">
                    <select className="type-select">
                      <option value="mcq">Multiple Choice</option>
                      <option value="tf">True / False</option>
                      <option value="blank">Fill in the Blank</option>
                    </select>
                    <button type="button" className="icon-btn text-danger" onClick={() => removeQuestion(q.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <textarea placeholder="Enter your question here..." className="question-textarea"></textarea>
                </div>

                <div className="options-list">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="option-item">
                      <input type="radio" name={`correct-${q.id}`} defaultChecked={optIndex === 0} />
                      <input type="text" placeholder={`Option ${optIndex + 1}`} className="option-input" />
                    </div>
                  ))}
                </div>

                <div className="question-footer">
                  <div className="form-group horizontal">
                    <label>Marks:</label>
                    <input type="number" defaultValue={q.marks} className="small-input" />
                  </div>
                  <div className="form-group horizontal">
                    <label>Difficulty:</label>
                    <select className="small-input">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-question-btn" onClick={addQuestion}>
              <Plus size={20} />
              <span>Add Another Question</span>
            </button>
          </div>
        )}
      </form>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          window.location.href = '/quizzes';
        }}
        title="Quiz Created!"
        message="Your quiz has been successfully created and published."
      />
    </MainLayout>
  );
};

export default QuizForm;