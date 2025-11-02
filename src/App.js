import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import Behavior from "./pages/Behavior";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import SubjectDetails from "./pages/SubjectDetails";
import Forms from "./pages/Forms";
import FormDetail from "./pages/FormDetail";
import ParentIdInput from "./pages/ParentIdInput";
import About from "./pages/About";
import Settings from "./pages/Settings";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherGrades from "./pages/TeacherGrades";
import BehaviorLogs from "./pages/BehaviorLogs";
import ClassAnnouncements from "./pages/ClassAnnouncements";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/behavior" element={<Behavior />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/grades/:subjectId" element={<SubjectDetails />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms/pta-meeting" element={<FormDetail title="PTA Meeting" />} />
        <Route path="/parent-id" element={<ParentIdInput />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher-attendance/:sectionId" element={<TeacherAttendance />} /> 
        <Route path="/teacher-grades" element={<TeacherGrades />} />
        <Route path="/behavior-logs" element={<BehaviorLogs />} />
        <Route path="/class-announcements" element={<ClassAnnouncements/>} />
      </Routes>
    </Router>
  );
}

export default App;
