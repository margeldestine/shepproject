import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, InputAdornment, CircularProgress } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import shepbg from "../assets/shepbg.png";
import { validateStudentNumber } from "../api/authApi";
import "../styles/RoleSelection.css";

function ParentIdInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = String(location.state?.role || "PARENT").trim().toUpperCase();

  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");
  const [validationState, setValidationState] = useState("idle"); // idle, loading, valid, invalid
  

  const handleValidate = async (value) => {
    const v = String(value || "").trim();
    if (!v) {
      setValidationState("idle");
      setError("");
      return;
    }
    const validPattern1 = /^\d{4}-\d{5}$/;
    const validPattern2 = /^\d{2}-\d{4}-\d{3}$/;
    if (!validPattern1.test(v) && !validPattern2.test(v)) {
      setValidationState("invalid");
      setError("Invalid format. Use ****-***** or **-****-***");
      return;
    }
    try {
      setValidationState("loading");
      setError("");
      const res = await validateStudentNumber(v);
      if (res && res.exists) {
        setValidationState("valid");
        setError("");
      } else {
        setValidationState("invalid");
        setError("Student number not found. Please check and try again.");
      }
    } catch (e) {
      setValidationState("invalid");
      const msg = e?.data?.error || e?.message || "Student number not found. Please check and try again.";
      setError(msg);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[\d-]*$/.test(value)) {
      setSchoolId(value);
      setValidationState("idle");
      setError("");
    }
  };

  const handleNavigate = () => {
    if (!schoolId.trim()) {
      setError(role.includes("TEACHER") ? "Please enter your school ID number." : "Please enter your child's school ID number.");
      return;
    }

    if (validationState !== "valid") {
      setError("Please validate the student number first.");
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
      <div className="role-overlay"></div>

      <div className="role-container">
        <h2>{role.includes("TEACHER") ? "Please enter your ID number" : "Please enter your child's school ID number"}</h2>

        <div className="role-input-box">
          <TextField
            variant="outlined"
            placeholder="School ID Number"
            fullWidth
            value={schoolId}
            onChange={handleChange}
            onBlur={(e) => handleValidate(e.target.value)}
            error={!!error}
            helperText={error || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {validationState === "loading" && <CircularProgress size={20} sx={{ color: "white" }} />}
                  {validationState === "valid" && <CheckCircle sx={{ color: "#4caf50" }} />}
                  {validationState === "invalid" && <ErrorOutline sx={{ color: "#f44336" }} />}
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
              "& .MuiFormHelperText-root": { 
                color: error ? "#ff7777ff" : validationState === "valid" ? "#4caf50" : "#ddd" 
              },
            }}
          />
          <Button 
            fullWidth
            className="role-btn" 
            onClick={handleNavigate}
            disabled={validationState !== "valid"}
            sx={{ mt: 0, width: '100%', maxWidth: 'none' }}
          >
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ParentIdInput;
