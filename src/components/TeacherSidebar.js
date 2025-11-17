import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

function TeacherSidebar({ active }) {
  const navigate = useNavigate();
  const isActive = (key) => (active === key ? "active" : "");

  return (
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
        <button className={isActive("attendance")} onClick={() => navigate("/teacher-attendance/1")}>Attendance</button>
        <button className={isActive("grades")} onClick={() => navigate("/teacher-grades")}>Grades</button>
        <button className={isActive("behavior-logs")} onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
        <button className={isActive("class-announcements")} onClick={() => navigate("/class-announcements")}>Class Announcements</button>
        <button className={isActive("forms")} onClick={() => navigate("/teacher-forms")}>Forms</button>
        <button className={isActive("announcements")} onClick={() => navigate("/announcements")}>Announcements</button>
      </div>
    </aside>
  );
}

export default memo(TeacherSidebar);