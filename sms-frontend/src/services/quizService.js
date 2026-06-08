/**
 * Quiz Service - Mocking API calls and Business Logic
 */

const STORAGE_KEY = 'lms_quizzes';

// Initial Mock Data
const initialQuizzes = [
  {
    id: 'QZ-1001',
    title: 'React Hooks & State Management',
    code: 'REACT-001',
    subject: 'Web Development',
    class: 'Semester 4 - Batch A',
    totalQuestions: 15,
    duration: 30,
    totalMarks: 30,
    passMarks: 12,
    type: 'Assessment',
    startDate: '2026-06-05T09:00',
    endDate: '2026-06-05T12:00',
    createdBy: 'Admin User',
    status: 'Scheduled', // Draft, Published, Scheduled, Completed, Archived
    isDeleted: false,
    questions: [
      {
        id: 1,
        type: 'MCQ',
        text: 'What is the purpose of useEffect?',
        options: ['Manage state', 'Handle side effects', 'Optimize rendering', 'Create context'],
        correctAnswer: 'Handle side effects',
        marks: 2,
        difficulty: 'Medium'
      }
    ],
    analytics: {
      attempts: 142,
      avgScore: 22,
      passRate: 85
    }
  },
  {
    id: 'QZ-1002',
    title: 'CSS Grid & Flexbox Masterclass',
    code: 'CSS-002',
    subject: 'UI/UX Design',
    class: 'Semester 2 - Batch B',
    totalQuestions: 10,
    duration: 20,
    totalMarks: 20,
    passMarks: 8,
    type: 'Quick Quiz',
    startDate: '2026-05-30T10:00',
    endDate: '2026-05-30T11:00',
    createdBy: 'Jane Doe',
    status: 'Completed',
    isDeleted: false,
    questions: [],
    analytics: {
      attempts: 210,
      avgScore: 18,
      passRate: 92
    }
  },
  {
    id: 'QZ-1003',
    title: 'Data Structures Midterm',
    code: 'DS-103',
    subject: 'Computer Science',
    class: 'Semester 3 - Batch C',
    totalQuestions: 25,
    duration: 60,
    totalMarks: 50,
    passMarks: 20,
    type: 'Midterm',
    startDate: '2026-06-10T14:00',
    endDate: '2026-06-10T16:00',
    createdBy: 'Admin User',
    status: 'Draft',
    isDeleted: false,
    questions: [],
    analytics: {
      attempts: 0,
      avgScore: 0,
      passRate: 0
    }
  }
];

export const quizService = {
  getQuizzes: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialQuizzes));
      return initialQuizzes;
    }
    return JSON.parse(data).filter(q => !q.isDeleted);
  },

  getQuizById: (id) => {
    const quizzes = quizService.getQuizzes();
    return quizzes.find(q => q.id === id);
  },

  saveQuiz: (quizData) => {
    const quizzes = quizService.getQuizzes();
    let updatedQuizzes;

    if (quizData.id && quizzes.find(q => q.id === quizData.id)) {
      // Update
      updatedQuizzes = quizzes.map(q => q.id === quizData.id ? { ...q, ...quizData, updatedAt: new Date().toISOString() } : q);
    } else {
      // Create
      const newQuiz = {
        ...quizData,
        id: quizData.id || `QZ-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        isDeleted: false,
        analytics: { attempts: 0, avgScore: 0, passRate: 0 }
      };
      updatedQuizzes = [...quizzes, newQuiz];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuizzes));
    return updatedQuizzes;
  },

  deleteQuiz: (id) => {
    const quizzes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updatedQuizzes = quizzes.map(q => q.id === id ? { ...q, isDeleted: true } : q);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuizzes));
  },

  bulkDelete: (ids) => {
    const quizzes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updatedQuizzes = quizzes.map(q => ids.includes(q.id) ? { ...q, isDeleted: true } : q);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuizzes));
  },

  updateStatus: (id, status) => {
    const quizzes = quizService.getQuizzes();
    const updatedQuizzes = quizzes.map(q => q.id === id ? { ...q, status } : q);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuizzes));
  },

  duplicateQuiz: (id) => {
    const quiz = quizService.getQuizById(id);
    if (quiz) {
      const newQuiz = {
        ...quiz,
        id: `QZ-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `${quiz.title} (Copy)`,
        status: 'Draft',
        createdAt: new Date().toISOString()
      };
      const quizzes = quizService.getQuizzes();
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...quizzes, newQuiz]));
    }
  }
};
