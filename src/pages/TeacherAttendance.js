import React from "react";
import { LogOut } from "lucide-react";
import "./TeacherAttendance.css";
import { useNavigate } from "react-router-dom";


export default function TeacherAttendance() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        navigate("/");
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
          <button className="active">Attendance</button>
          <button>Grades</button>
          <button>Behavior Logs</button>
          <button>Class Announcements</button>
          <button>Forms</button>
        </div>
      </aside>

      {/* === MAIN SECTION === */}
      <main className="teacher-main">
        {/* ✅ SIGN OUT BUTTON */}
        <div className="top-right-actions" onClick={handleSignOut}>
        <LogOut size={16} />
        <span>Sign out</span>
        </div>


        <div className="attendance-container">
          <h2 className="attendance-header">Attendance — G2 Faith</h2>

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
