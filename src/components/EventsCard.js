import React from "react";

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