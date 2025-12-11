import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, InputAdornment, CircularProgress } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import shepbg from "../assets/shepbg.png";
import { validateStudentNumber, registerParent, registerTeacher } from "../api/authApi";
import { getParentData } from "../api/parentApi";
import { getStudentData } from "../api/studentApi";
import { useAuth } from "../context/AuthContext";
import "../styles/RoleSelection.css";

function ParentIdInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = String(location.state?.role || "PARENT").trim().toUpperCase();
  const { loginUser } = useAuth();

  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");
  const [validationState, setValidationState] = useState("idle"); // idle, loading, valid, invalid
  const [registering, setRegistering] = useState(false);
  

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
    if (role.includes("TEACHER")) {
      setValidationState("valid");
      setError("");
      return;
    }
    try {
      setValidationState("loading");
      setError("");
      const res = await validateStudentNumber(v);
      if (res && res.exists) {
        // Resolve target student ID from student number first
        let targetStudentId = null;
        try {
          const students = await getStudentData();
          console.log('[VALIDATE] All students:', students);
          const student = Array.isArray(students) ? students.find((s) => String(s.student_number || '').trim() === v) : null;
          targetStudentId = student ? (student.student_id || student.id) : null;
          console.log('[VALIDATE] Target student:', student);
          console.log('[VALIDATE] Target student_id:', targetStudentId);
        } catch (e) {
          console.error('[VALIDATE] Error fetching students:', e);
        }
        if (!targetStudentId) {
          setValidationState('invalid');
          setError('Student number not found. Please check and try again.');
          return;
        }

        try {
          const parents = await getParentData();
          console.log('[VALIDATE] Raw API response:', parents);
          console.log('[VALIDATE] First parent structure:', parents?.[0]);
          console.log('[VALIDATE] Fields available:', parents?.[0] ? Object.keys(parents[0]) : 'none');
          const list = Array.isArray(parents) ? parents : (parents?.items || parents?.data || parents?.rows || []);
          console.log('[VALIDATE] Parsed parent list:', list);
          try { console.log('[VALIDATE] Raw parent data sample:', JSON.stringify((Array.isArray(parents) ? parents?.[0] : (list?.[0] || parents)), null, 2)); } catch {}

          const alreadyLinked = list.some((p) => {
            const pStudentId = p.student_id || p.studentId;
            const hasUser = p.user_id || p.userId || (p.user && (p.user.user_id || p.user.id)) || p.parent_user_id || p.parentUserId;
            const matches = pStudentId && Number(pStudentId) === Number(targetStudentId);
            console.log('[VALIDATE] Checking parent:', { parent_id: p.parent_id || p.parentId || p.id, user_id: hasUser, student_id: pStudentId, raw_parent: p, targetStudentId, matches });
            const isLinked = !!hasUser && !!pStudentId && Number(pStudentId) === Number(targetStudentId);
            if (isLinked) {
              console.log('[VALIDATE] ⚠️ FOUND LINKED PARENT:', p);
            }
            return isLinked;
          });
          console.log('[VALIDATE] Already linked?', alreadyLinked);

          if (alreadyLinked) {
            setValidationState('invalid');
            setError('This student is already linked to a parent account.');
            return;
          }
        } catch {}
        setValidationState('valid');
        setError('');
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

  const handleNavigate = async () => {
    if (!schoolId.trim()) {
      setError(role.includes("TEACHER") ? "Please enter your school ID number." : "Please enter your child's school ID number.");
      return;
    }

    if (!role.includes("TEACHER") && validationState !== "valid") {
      setError("Please validate the student number first.");
      return;
    }

    setError("");
    if (role.includes("TEACHER")) {
      try {
        setRegistering(true);
        setError("");
        let temp = {};
        try { temp = JSON.parse(localStorage.getItem("tempUser") || "{}"); } catch { temp = {}; }
        if (!temp.email || !temp.password) {
          throw new Error("Registration data not found. Please sign up again.");
        }
        const payload = {
          firstName: temp.firstName,
          lastName: temp.lastName,
          email: temp.email,
          password: temp.password,
          role: "TEACHER",
          teacherIdNumber: schoolId.trim()
        };
        const authData = await registerTeacher(payload);
        loginUser(authData);
        try { localStorage.removeItem("tempUser"); } catch {}
        navigate("/teacher");
      } catch (e) {
        setError(e?.message || "Teacher registration failed");
      } finally {
        setRegistering(false);
      }
      return;
    }
    try {
      setRegistering(true);
      let temp = {};
      try { temp = JSON.parse(localStorage.getItem("tempUser") || "{}"); } catch { temp = {}; }

      console.log("=== PARENT REGISTRATION DEBUG ===");
      console.log("Temp user data:", temp);
      console.log("Student number:", schoolId.trim());

      const payload = {
        firstName: temp.firstName,
        lastName: temp.lastName,
        email: temp.email,
        password: temp.password,
        role: "PARENT",
        studentNumber: schoolId.trim(),
      };

      console.log("Payload being sent:", payload);
      try {
        const parents = await getParentData();
        console.log('[SUBMIT] Raw API response:', parents);
        const list = Array.isArray(parents) ? parents : (parents?.items || parents?.data || parents?.rows || []);
        console.log('[SUBMIT] Parsed parent list:', list);
        try { console.log('[SUBMIT] Raw parent data sample:', JSON.stringify((Array.isArray(parents) ? parents?.[0] : (list?.[0] || parents)), null, 2)); } catch {}
        const snum = schoolId.trim();
        let sid = null;
        try {
          const students = await getStudentData();
          console.log('[SUBMIT] All students:', students);
          const match = Array.isArray(students)
            ? students.find((s) => String(s.student_number || '').trim() === snum)
            : null;
          sid = match ? (match.student_id || match.id) : null;
          console.log('[SUBMIT] Target student:', match);
          console.log('[SUBMIT] Target student_id:', sid);
        } catch (e) {
          console.error('[SUBMIT] Error fetching students:', e);
        }
        if (!sid) {
          setError('Student number not found. Please check and try again.');
          setRegistering(false);
          return;
        }
        const alreadyLinked = list.some((p) => {
          const pSid = p.student_id || p.studentId;
          const hasUser = p.user_id || p.userId || (p.user && (p.user.user_id || p.user.id)) || p.parent_user_id || p.parentUserId;
          const matches = pSid != null && Number(pSid) === Number(sid);
          console.log('[SUBMIT] Checking parent:', { parent_id: p.parent_id || p.parentId || p.id, user_id: hasUser, student_id: pSid, raw_parent: p, targetStudentId: sid, matches });
          const isLinked = !!hasUser && !!pSid && Number(pSid) === Number(sid);
          if (isLinked) {
            console.log('[SUBMIT] ⚠️ FOUND LINKED PARENT:', p);
          }
          return isLinked;
        });
        console.log('[SUBMIT] Already linked?', alreadyLinked);
        if (alreadyLinked) {
          setError('This student is already linked to a parent account.');
          setRegistering(false);
          return;
        }
      } catch {}

      let authData = await registerParent(payload);
      const snum = schoolId.trim();
      if (!authData.studentFirstName || !authData.studentLastName || !authData.studentId) {
        try {
          const list = await getStudentData();
          const match = Array.isArray(list)
            ? list.find(s => String(s.student_number || "").trim() === snum)
            : null;
          if (match) {
            authData = {
              ...authData,
              studentId: authData.studentId || match.student_id || match.id,
              studentNumber: authData.studentNumber || match.student_number,
              studentFirstName: authData.studentFirstName || match.first_name,
              studentLastName: authData.studentLastName || match.last_name,
              studentGradeLevel: authData.studentGradeLevel || match.grade_level,
            };
          } else {
            authData = { ...authData, studentNumber: authData.studentNumber || snum };
          }
        } catch {
          authData = { ...authData, studentNumber: authData.studentNumber || snum };
        }
      }

      console.log("=== REGISTRATION RESPONSE ===");
      console.log("Full authData:", authData);
      console.log("studentFirstName:", authData.studentFirstName);
      console.log("studentLastName:", authData.studentLastName);
      console.log("studentId:", authData.studentId);
      console.log("=== END DEBUG ===");

      loginUser(authData);
      try { localStorage.removeItem("tempUser"); } catch {}
      navigate("/dashboard");
    } catch (e) {
      console.error("Registration error:", e);
      const msg = (e && e.status === 409)
        ? "This student is already linked to a parent account."
        : (String(e?.message || "").toLowerCase().includes("already") && String(e?.message || "").toLowerCase().includes("linked"))
        ? "This student is already linked to a parent account."
        : (e?.message || "Registration failed");
      setError(msg);
    } finally {
      setRegistering(false);
    }
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
            disabled={role.includes("TEACHER") ? (!schoolId || registering) : (validationState !== "valid" || registering)}
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
