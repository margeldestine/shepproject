import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import ParentIdInput from "./pages/ParentIdInput";
import About from "./pages/About";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parent-id" element={<ParentIdInput />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
