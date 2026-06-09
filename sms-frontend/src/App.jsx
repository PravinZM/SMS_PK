import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import LmsDashboard from "./pages/lms/LmsDashboard";
import Materials from "./pages/lms/Materials";
import Assignments from "./pages/lms/Assignments";
import Quizzes from "./pages/lms/Quizzes";
import Notifications from "./pages/lms/Notifications";
import Students from "./pages/student/Students";
import StudentReports from "./pages/student/StudentReports";
import StudentExplorer from "./pages/student/StudentExplorer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Main Dashboard Route */}
        <Route path="/dashboard" element={<LmsDashboard />} />
        
        {/* LMS Module Routes */}
        <Route path="/lms/materials" element={<Materials />} />
        <Route path="/lms/assignments" element={<Assignments />} />
        <Route path="/lms/quizzes" element={<Quizzes />} />
        <Route path="/lms/notifications" element={<Notifications />} />

        {/* Student Module Routes */}
        <Route path="/student/students" element={<Students />} />
        <Route path="/student/explorer" element={<StudentExplorer />} />
        <Route path="/student/student-reports" element={<StudentReports />} />

        {/* Catch-all to redirect to dashboard if logged in (simple logic for now) */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
