import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherUser } from "../data/users";
import { teacherDashboardCopy } from "../data/copy";
import { getTeacherData } from "../api/teacherApi";

function TeacherSidebar({ active }) {
  const navigate = useNavigate();
  const [name, setName] = useState(teacherUser.name);
  const [role, setRole] = useState(teacherUser.role || "Teacher");
  useEffect(() => {
    let mounted = true;
    getTeacherData()
      .then((data) => {
        if (!mounted) return;
        setName(data?.name || teacherUser.name);
        setRole(data?.role || teacherUser.role || "Teacher");
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);
  const isActive = (key) => (active === key ? "active" : "");

  return (
    <aside className="teacher-sidebar">
      <div className="sidebar-header">
        <h1>SHEP</h1>
        <p>{teacherDashboardCopy.headerTitle}</p>
      </div>
      <div className="teacher-info">
        <div className="avatar" />
        <div>
          <p className="teacher-name">{name}</p>
          <p className="teacher-role">{role}</p>
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
