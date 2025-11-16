import React from "react";

// Single event entry for Events page grid (uses Events.css classes)
export function EventCard({ date, title }) {
  return (
    <div className="event-card">
      <div className="event-card-badge" />
      <div className="event-card-content">
        <strong>{date}</strong>
        <span>{title}</span>
      </div>
    </div>
  );
}

// Sidebar "Upcoming Events" card using existing Dashboard.css classes
// Sidebar Upcoming Events card (uses Dashboard.css classes)
export default function EventsCard({ onClick }) {
  return (
    <div className="events-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <h4>Upcoming Events</h4>
      <div className="event">
        <div className="event-badge" />
        <div className="event-body">
          <strong>September 9</strong>
          <span>Sergio Osmeña Day</span>
        </div>
      </div>
      <div className="event">
        <div className="event-badge" />
        <div className="event-body">
          <strong>September 23</strong>
          <span>Faculty-Admin Day</span>
        </div>
      </div>
    </div>
  );
}