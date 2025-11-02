import React from "react";
import { LogOut } from "lucide-react";
import "./TeacherGrades.css"; 
import { useNavigate } from "react-router-dom";

export default function TeacherGrades() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/");
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
          <button className="active" onClick={() => navigate("/teacher-grades")}>Grades</button>
          <button onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button onClick={() => navigate("/forms")}>Forms</button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

      <main className="teacher-main">
        <div className="top-right-actions" onClick={handleSignOut}>
          <LogOut size={16} />
          <span>Sign out</span>
        </div>

        <div className="grades-container">
        <div className="grades-header header-box">
            <h2>Grades</h2>
            <button className="input-grade-btn">Input grades</button>
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
                <td>Danise Bianca Catamco</td>
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
    </div>
  );
}
