import React from "react";
import { LogOut, Settings } from "lucide-react";
import "./TeacherAttendance.css";
import { useNavigate } from "react-router-dom";

export default function TeacherAttendance() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="teacher-attendance-container">
      {/* === SIDEBAR === */}
      <aside className="teacher-sidebar">
        <div className="sidebar-header">
          <h1>SHEP</h1>
          <p>Teacher Dashboard</p>
        </div>

        <div className="teacher-info">
          <div className="avatar" />
          <div>
            <p className="teacher-name">Francaryllese Dacabaleam</p>
            <p className="teacher-role">Teacher</p>
          </div>
        </div>

        <div className="sidebar-links">
          <button className="active" onClick={() => navigate("/teacher-attendance/1")}>
            Attendance
          </button>
          <button onClick={() => navigate("/teacher-grades")}>Grades</button>
          <button onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button onClick={() => navigate("/teacher-forms")}>Forms</button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

      {/* === MAIN SECTION === */}
      <main className="teacher-main">
        {/* ✅ SETTINGS + SIGN OUT (Dashboard Style) */}
        <div
          className="top-right-actions"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* Settings button first */}
          <button
            onClick={handleSettings}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>

          {/* Sign out button next */}
          <button
            onClick={handleSignOut}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>

        <div className="attendance-container">
          <h2 className="attendance-header header-box">Attendance — G2 Faith</h2>

          <div className="filters">
            <select>
              <option>Date</option>
            </select>
            <select>
              <option>Grade-2 Faith</option>
            </select>
            <button className="mark-all-btn">Mark All Present</button>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Dela Cruz</td>
                <td>
                  <select>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                  </select>
                </td>
                <td>
                  <input type="text" placeholder="Add remark..." />
                </td>
              </tr>
              <tr>
                <td>Maria Santos</td>
                <td>
                  <select>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                  </select>
                </td>
                <td>
                  <input type="text" placeholder="Add remark..." />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
