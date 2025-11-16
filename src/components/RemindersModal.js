// c:\Users\Margel\Desktop\shepproject\src\components\RemindersModal.js
import React from "react";
import CloseButton from "./CloseButton";

export default function RemindersModal({
  open,
  onClose,
  onOpenAssignmentDetails,
  onOpenDetail,
  announcements = []
}) {
  if (!open) return null;

  return (
    <div className="reminders-modal-overlay" onClick={onClose}>
      <div className="reminders-modal" onClick={(e) => e.stopPropagation()}>
        <div className="reminders-header">
          <h2>Reminders</h2>
          <CloseButton className="light" onClick={onClose} />
        </div>

        <div className="reminders-content">
          <div className="reminder-section">
            <h3>Assignments</h3>

            <div
              className="reminder-item yellow"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAssignmentDetails({
                  title: "Assignment in English",
                  due: "2025-09-26T23:59:00Z",
                  subject: "English - Short Story Writing",
                  description:
                    "Write a short story (500–800 words) based on the theme 'Unexpected Friendship'. Submission via Google Classroom.",
                });
              }}
            >
              <div className="reminder-bar" />
              <div className="reminder-body">
                <strong>Assignment in English</strong>
                <span>Due Sep 26, 2025 (Friday)</span>
                <small>📖 English - Short Story Writing</small>
              </div>
            </div>

            <div
              className="reminder-item yellow"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAssignmentDetails({
                  title: "Assignment in Science",
                  due: "2025-09-27T23:59:00Z",
                  subject: "Science - Flowering Plant Diagram",
                  description:
                    "Create a labeled diagram of a flowering plant and explain each part. Submission: Science class drop box.",
                });
              }}
            >
              <div className="reminder-bar" />
              <div className="reminder-body">
                <strong>Assignment in Science</strong>
                <span>Due Sep 27, 2025 (Saturday)</span>
                <small>🔬 Science - Flowering Plant Diagram</small>
              </div>
            </div>
          </div>

          <div className="reminder-section">
            <h3>Alerts</h3>
            <div
              className="reminder-item red"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail({
                  title: "Attendance Alert",
                  date: "October 2025",
                  description: "Your Child has 3 Recorded Absences in October.",
                });
              }}
            >
              <div className="reminder-bar" />
              <div className="reminder-body">
                <strong>Attendance Alert</strong>
                <span>Your Child has 3 Recorded Absences in October.</span>
              </div>
            </div>
          </div>

          <div className="reminder-section">
            <h3>Upcoming Events</h3>
            <div
              className="reminder-item blue"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail({
                  title: "Sergio Osmeña Day",
                  date: "September 9, 2025",
                  description:
                    "School holiday: Sergio Osmeña Day celebration...",
                });
              }}
            >
              <div className="reminder-bar" />
              <div className="reminder-body">
                <strong>September 9</strong>
                <span>Sergio Osmeña Day</span>
              </div>
            </div>
          </div>

          <div className="reminder-section">
            <h3>Recent Announcements</h3>
            {announcements
              .filter((item) => item.title === "Parent-Teacher Meeting")
              .slice(0, 1)
              .map((item) => (
                <div
                  className="reminder-item gray"
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail({
                      title: "Parent-Teacher Meeting",
                      date: item.date,
                      description:
                        "Join us for our quarterly Parent-Teacher Meeting where we will discuss student progress, address concerns, and share upcoming plans for the term.",
                    });
                  }}
                >
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>{item.title}</strong>
                    <span>{item.date}</span>
                    <small>{item.preview}</small>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}