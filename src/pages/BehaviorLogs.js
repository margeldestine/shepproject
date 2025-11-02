import React from "react";
import { LogOut, Settings } from "lucide-react";
import "./BehaviorLogs.css";
import { useNavigate } from "react-router-dom";

export default function Behavior() {
  const navigate = useNavigate();

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  return (
    <div className="teacher-attendance-container">
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
          <button onClick={() => navigate("/teacher-attendance/1")}>Attendance</button>
          <button onClick={() => navigate("/teacher-grades")}>Grades</button>
          <button className="active" onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button onClick={() => navigate("/teacher-forms")}>Forms</button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

      <main className="teacher-main">
        <div className="top-right-actions">
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
          <div className="header-box">
            <h2>Behavior — G2 Faith</h2>
            <button>Add Behavior</button>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Incident</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sep 19, 2025</td>
                <td>Francis Abelgas</td>
                <td>Left class without permission</td>
                <td>Counseled</td>
              </tr>
              <tr>
                <td>Sep 20, 2025</td>
                <td>Danise Bianca Catamco</td>
                <td>Disturbing other students</td>
                <td>Warning Issued</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
