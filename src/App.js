import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import Behavior from "./pages/Behavior";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import ParentIdInput from "./pages/ParentIdInput";
import SubjectDetails from "./pages/SubjectDetails";
import About from "./pages/About";
import Forms from "./pages/Forms";
import FormDetail from "./pages/FormDetail";
import Settings from "./pages/Settings";



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
      </Routes>
    </Router>
  );
}

export default App;
