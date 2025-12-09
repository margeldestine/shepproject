import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import RoleChoice from "./pages/RoleChoice";
import Dashboard from "./pages/Dashboard";
import Behavior from "./pages/Behavior";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import SubjectDetails from "./pages/SubjectDetails";
import Forms from "./pages/Forms";
import FormDetail from "./pages/FormDetail";
import Events from "./pages/Events";

import ParentIdInput from "./pages/ParentIdInput";
import About from "./pages/About";
import Settings from "./pages/Settings";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherGrades from "./pages/TeacherGrades";
import GradeBreakdown from "./pages/GradeBreakdown";
import InputGrades from "./pages/InputGrades";
import BehaviorLogs from "./pages/BehaviorLogs";
import ClassAnnouncements from "./pages/ClassAnnouncements";
import Announcements from "./pages/Announcements";
import TeacherForms from "./pages/TeacherForms";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role-selection" element={<RoleChoice />} />
        <Route path="/role-choice" element={<RoleChoice />} />
        <Route path="/signup" element={<RoleSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parent" element={<Dashboard />} />
        <Route path="/behavior" element={<Behavior />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/grades/:subjectId" element={<SubjectDetails />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms/pta-meeting" element={<FormDetail title="PTA Meeting" />} />
        <Route path="/events" element={<Events />} />
        <Route path="/parent-id" element={<ParentIdInput />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        
        {/* OLD ROUTES - Keep for backward compatibility */}
        <Route path="/teacher-attendance/:sectionId" element={<TeacherAttendance />} /> 
        <Route path="/teacher-grades/:section" element={<TeacherGrades />} />
        
        {/* NEW ROUTES - With subject parameter */}
        <Route path="/teacher/:subject/attendance/:sectionId" element={<TeacherAttendance />} />
        <Route path="/teacher/grades/:section/:subject" element={<TeacherGrades />} />
        <Route path="/teacher/grades/:section/:subject/:studentId" element={<GradeBreakdown />} />
        <Route path="/teacher/grades/:section/:subject/input" element={<InputGrades />} />
        
        <Route path="/behavior-logs" element={<BehaviorLogs />} />
        <Route path="/class-announcements" element={<ClassAnnouncements/>} />
        <Route path="/teacher-forms" element={<TeacherForms/>} />
        <Route path="/announcements" element={<Announcements/>} />
      </Routes>
    </Router>
  );
}

export default App;
