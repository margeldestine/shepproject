import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import TopRightActions from "./TopRightActions";

export default function TeacherLayout({
  active,
  containerClassName = "teacher-container",
  showBackButton = false,
  backTo = "/teacher",
  children
}) {
  return (
    <div className={containerClassName}>
      <TeacherSidebar active={active} />
      <main className="teacher-main">
        <TopRightActions showBackButton={showBackButton} backTo={backTo} />
        {children}
      </main>
    </div>
  );
}