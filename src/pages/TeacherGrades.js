import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./TeacherGrades.css";
import { useNavigate } from "react-router-dom";

export default function TeacherGrades() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="teacher-grades-container">
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
          <button className="active" onClick={() => navigate("/teacher-grades")}>
            Grades
          </button>
          <button onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button onClick={() => navigate("/teacher-forms")}>Forms</button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

      <main className="teacher-main">
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

        <div className="grades-container">
          <div className="grades-header header-box">
            <h2>Grades</h2>
            <button className="input-grade-btn" onClick={() => setShowModal(true)}>
              Input grades
            </button>
          </div>

          <div className="filters">
            <select>
              <option>1st Grading</option>
              <option>2nd Grading</option>
              <option>3rd Grading</option>
              <option>4th Grading</option>
            </select>
          </div>

          <table className="grades-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Science</th>
                <th>Mathematics</th>
                <th>Reading</th>
                <th>Language</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Karylle Amad</td>
                <td>95</td>
                <td>90</td>
                <td>93</td>
                <td>85</td>
                <td>91</td>
              </tr>
              <tr>
                <td>Rusty Summer Daclan</td>
                <td>95</td>
                <td>90</td>
                <td>89</td>
                <td>94</td>
                <td>92</td>
              </tr>
              <tr>
                <td>Margel Destine Krizia Galo</td>
                <td>89</td>
                <td>93</td>
                <td>94</td>
                <td>83</td>
                <td>90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal moved outside teacher-main */}
      {showModal && (
        <div className="grade-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="grade-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Input Grades</h3>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="form-group">
                <label>Student Name</label>
                <select>
                  <option>Select a student</option>
                  <option>Karylle Amad</option>
                  <option>Rusty Summer Daclan</option>
                  <option>Margel Destine Krizia Galo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Grading Period</label>
                <select>
                  <option>1st Grading</option>
                  <option>2nd Grading</option>
                  <option>3rd Grading</option>
                  <option>4th Grading</option>
                </select>
              </div>

              <div className="grades-input-grid">
                <div className="form-group">
                  <label>Science</label>
                  <input type="number" min="0" max="100" placeholder="0-100" />
                </div>
                <div className="form-group">
                  <label>Mathematics</label>
                  <input type="number" min="0" max="100" placeholder="0-100" />
                </div>
                <div className="form-group">
                  <label>Reading</label>
                  <input type="number" min="0" max="100" placeholder="0-100" />
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <input type="number" min="0" max="100" placeholder="0-100" />
                </div>
              </div>

              <div className="modal-actions">
                <button className="back-btn" onClick={() => setShowModal(false)}>Back</button>
                <button className="save-btn">Save Grades</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
