import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { teacherDashboardCopy } from "../data/copy";
import { useAuth } from "../context/AuthContext";

function TeacherSidebar({ active }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  // Get name from auth context
  const displayName = (user?.firstName || user?.lastName)
    ? `${user?.firstName || ""}${user?.firstName && user?.lastName ? " " : ""}${user?.lastName || ""}`.trim()
    : user?.name || user?.email || "Teacher";

  // Determine role based on current route
  const displayRole = location.pathname.startsWith("/teacher")
    ? "Teacher"
    : (user?.role || "TEACHER").toString().toUpperCase().includes("TEACH")
    ? "Teacher"
    : "Parent";

  const isActive = (key) => (active === key ? "active" : "");

  const currentSection = (() => {
    const m = location.pathname.match(/^\/teacher-(attendance|grades)\/([^/]+)/);
    return m ? m[2] : null;
  })();

  return (
    <aside className="teacher-sidebar">
      <div className="sidebar-header">
        <h1>SHEP</h1>
        <p>{teacherDashboardCopy.headerTitle}</p>
      </div>
      <div className="teacher-info">
        <div className="avatar" />
        <div>
          <p className="teacher-name">{displayName}</p>
          <p className="teacher-role">{displayRole}</p>
        </div>
      </div>
      <div className="sidebar-links">
        <button className={isActive("attendance")} onClick={() => navigate(`/teacher-attendance/${currentSection || "G2Faith"}`)}>Attendance</button>
        <button className={isActive("grades")} onClick={() => navigate(`/teacher-grades/${currentSection || "G2Faith"}`)}>Grades</button>
        <button className={isActive("behavior-logs")} onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
        <button className={isActive("class-announcements")} onClick={() => navigate("/class-announcements")}>Class Announcements</button>
        <button className={isActive("forms")} onClick={() => navigate("/teacher-forms")}>Forms</button>
      </div>
    </aside>
  );
}

export default memo(TeacherSidebar);
