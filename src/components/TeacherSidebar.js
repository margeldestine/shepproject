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

  // UPDATED: Extract both subject and section from URL
  const extractFromPath = () => {
    // Try new pattern: /teacher/{subject}/attendance/{section}
    let match = location.pathname.match(/^\/teacher\/([^/]+)\/(attendance|grades)\/([^/]+)/);
    if (match) {
      return { subject: match[1], section: match[3] };
    }
    
    // Try new grade pattern: /teacher/grades/{section}/{subject}
    match = location.pathname.match(/^\/teacher\/grades\/([^/]+)\/([^/]+)/);
    if (match) {
      return { subject: match[2], section: match[1] };
    }
    
    // Fallback to old pattern: /teacher-attendance/{section} or /teacher-grades/{section}
    match = location.pathname.match(/^\/teacher-(attendance|grades)\/([^/]+)/);
    if (match) {
      return { subject: "science", section: match[2] }; // Default to science
    }
    
    return { subject: "science", section: "G2Faith" }; // Default fallback
  };

  const { subject, section } = extractFromPath();

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
        <button 
          className={isActive("attendance")} 
          onClick={() => navigate(`/teacher/${subject}/attendance/${section}`)}
        >
          Attendance
        </button>
        <button 
          className={isActive("grades")} 
          onClick={() => navigate(`/teacher/grades/${section}/${subject}`)}
        >
          Grades
        </button>
        <button 
          className={isActive("behavior-logs")} 
          onClick={() => navigate("/behavior-logs")}
        >
          Behavior Logs
        </button>
        <button 
          className={isActive("class-announcements")} 
          onClick={() => navigate("/class-announcements")}
        >
          Class Announcements
        </button>
      </div>
    </aside>
  );
}

export default memo(TeacherSidebar);
