import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, InputAdornment } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import shepbg from "../assets/shepbg.png";
import "../styles/RoleSelection.css";

function ParentIdInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = String(location.state?.role || "PARENT").trim().toUpperCase();

  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");

  const validPattern1 = /^\d{4}-\d{5}$/;
  const validPattern2 = /^\d{2}-\d{4}-\d{3}$/;

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^[\d-]*$/.test(value)) {
      setSchoolId(value);
    }
  };

  const handleNavigate = () => {
    if (!schoolId.trim()) {
      setError(role.includes("TEACHER") ? "Please enter your school ID number." : "Please enter your child’s school ID number.");
      return;
    }

    if (!validPattern1.test(schoolId) && !validPattern2.test(schoolId)) {
      setError("Invalid format. Use ****-***** or **-****-***.");
      return;
    }

    setError("");
    navigate(role.includes("TEACHER") ? "/teacher" : "/dashboard");
  };

  return (
    <div
      className="role-selection-bg"
      style={{
        backgroundImage: `url(${shepbg})`,
      }}
    >
      {}
      <div className="role-overlay"></div>

      {}
      <div className="role-container">
        <h2>{role.includes("TEACHER") ? "Please enter your ID number" : "Please enter your child’s school ID number"}</h2>

        {}
        <div className="role-input-box">
          <TextField
            variant="outlined"
            placeholder="School ID Number"
            fullWidth
            value={schoolId}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(6px)",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "#bbb" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "#ddd" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
              "& .MuiFormHelperText-root": { color: "#ff7777ff" },
            }}
          />
        </div>

        {}
        <Button className="role-btn" onClick={handleNavigate}>
          Enter
        </Button>
      </div>
    </div>
  );
}

export default ParentIdInput;
