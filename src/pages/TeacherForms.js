import React from "react";
import { LogOut, Settings } from "lucide-react";
import "./TeacherForms.css";
import { useNavigate } from "react-router-dom";

export default function TeacherForms() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

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
          <button onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button className="active" onClick={() => navigate("/teacher-forms")}>
            Forms
          </button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

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
          <div className="header-box">
            <h2>Teacher Forms — G2 Faith</h2>
            <button>Create New Form</button>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Form Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Responses</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Parent-Teacher Meeting Form</td>
                <td>Meeting</td>
                <td>Active</td>
                <td>12</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Student Progress Report</td>
                <td>Report</td>
                <td>Closed</td>
                <td>30</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Behavior Evaluation Form</td>
                <td>Behavior</td>
                <td>Active</td>
                <td>15</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Learning Materials Request</td>
                <td>Request</td>
                <td>Pending</td>
                <td>8</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Classroom Observation Form</td>
                <td>Observation</td>
                <td>Active</td>
                <td>20</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
