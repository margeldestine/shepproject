import { useNavigate } from "react-router-dom";
import shepbg from "../assets/shepbg.png";
import "../styles/RoleSelection.css";

function RoleChoice() {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    try { localStorage.setItem("selectedRole", "TEACHER"); } catch {}
    navigate("/parent-id", { state: { role: "TEACHER" } });
  };

  const handleParentClick = () => {
    try { localStorage.setItem("selectedRole", "PARENT"); } catch {}
    navigate("/parent-id", { state: { role: "PARENT" } });
  };

  return (
    <div className="role-selection-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="role-overlay"></div>
      <div className="role-container">
        <h2>Which best describes you?</h2>
        <div className="role-buttons">
          <button className="role-btn" onClick={handleTeacherClick}>Staff/Teacher</button>
          <button className="role-btn" onClick={handleParentClick}>Parent/Guardian</button>
        </div>
        <p className="role-text">
          Already have an account? <a href="/" className="role-link">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default RoleChoice;
