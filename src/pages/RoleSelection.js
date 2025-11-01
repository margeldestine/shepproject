import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import shepbg from "../assets/shepbg.png";
import "./RoleSelection.css";

function RoleSelection() {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    navigate("/teacher");
  };

  const handleParentClick = () => {
    navigate("/parent-id");
  };

  return (
    <div
      className="role-selection-bg"
      style={{ backgroundImage: `url(${shepbg})` }}
    >
      <div className="role-overlay"></div>
      <div className="role-container">
        <h2>Which best describes you?</h2>

        <div className="role-buttons">
        <Button className="role-btn" onClick={handleTeacherClick}>
          Staff/Teacher
        </Button>

        <Button className="role-btn" onClick={handleParentClick}>
          Parent/Guardian
        </Button>
      </div>
      
        <p className="role-text">
          Already have an account?{" "}
          <a href="/" className="role-link">
            Sign in
          </a>
        </p>
      </div>
      </div>
  );
}

export default RoleSelection;
