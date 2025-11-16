// c:\Users\Margel\Desktop\shepproject\src\components\TeacherLayout.js
import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import TopRightActions from "./TopRightActions";

export default function TeacherLayout({
  active,
  containerClassName = "teacher-container",
  children
}) {
  return (
    <div className={containerClassName}>
      <TeacherSidebar active={active} />
      <main className="teacher-main">
        <TopRightActions />
        {children}
      </main>
    </div>
  );
}