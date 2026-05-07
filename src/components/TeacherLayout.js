import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import TopRightActions from "./TopRightActions";

export default function TeacherLayout({
  active,
  containerClassName = "teacher-container",
  showBackButton = false,
  backTo = "/teacher",
  onNavigateAttempt,
  children
}) {
  return (
    <div className={containerClassName}>
      <TeacherSidebar
        active={active}
        onNavigateAttempt={onNavigateAttempt}
      />
      <main className="teacher-main">
      <TopRightActions
        showBackButton={showBackButton}
        backTo={backTo}
        onNavigateAttempt={onNavigateAttempt}
      /> 
        {children}
      </main>
    </div>
  );
}