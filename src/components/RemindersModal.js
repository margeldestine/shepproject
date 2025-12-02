import React from "react";
import CloseButton from "./CloseButton";
import { assignments, alerts, upcomingEvents } from "../data/reminders";

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
            {assignments.map((item, idx) => (
              <div
                key={idx}
                className="reminder-item yellow"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAssignmentDetails(item);
                }}
              >
                <div className="reminder-bar" />
                <div className="reminder-body">
                  <strong>{item.title}</strong>
                  <span>{item.dueLabel}</span>
                  <small>{item.subtitle}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="reminder-section">
            <h3>Alerts</h3>
            {alerts.map((item, idx) => (
              <div
                key={idx}
                className="reminder-item red"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(item);
                }}
              >
                <div className="reminder-bar" />
                <div className="reminder-body">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="reminder-section">
            <h3>Upcoming Events</h3>
            {upcomingEvents.map((item, idx) => (
              <div
                key={idx}
                className="reminder-item blue"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(item);
                }}
              >
                <div className="reminder-bar" />
                <div className="reminder-body">
                  <strong>{item.date}</strong>
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
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