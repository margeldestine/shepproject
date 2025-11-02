import React from "react";
import "./Events.css";
import "./Dashboard.css"; // reuse shared topbar/background styles
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  // Static events data matching the prototype
  const events = [
    { id: 1, date: "August 6", title: "Cebu Provincial Founding Anniversary" },
    { id: 2, date: "August 7", title: "Start of Classes" },
    { id: 3, date: "August 21", title: "Ninoy Aquino Day" },
    { id: 4, date: "August 25", title: "National Heroes Day" },
    { id: 5, date: "August 26", title: "Cebu Day" },
    { id: 6, date: "September 9", title: "Pres. Sergio Osmeña Day" },
    { id: 7, date: "September 23", title: "Faculty-Admin Day" },
    { id: 8, date: "October 31", title: "All Saints Day (Special Non - Working Day)" },
    { id: 9, date: "November 1", title: "All Saints Day(Special Non - Working Day)" },
    { id: 10, date: "November 2", title: "All Souls Day" },
    { id: 11, date: "November 30", title: "Bonifacio Day" },
    { id: 12, date: "December 6", title: "Founder's Day" }
  ];

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      {/* Top bar */}
      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>

        <div className="top-actions">
          <button className="icon-btn" aria-label="Notifications">🔔</button>
          <button className="icon-btn" aria-label="Settings">⚙️</button>
        </div>
      </header>

      {/* Full-width content (no sidebar) */}
      <main className="events-panel">
        <section className="events-content-enter">
          {/* Title outside the shell to match screenshot */}
          <h2 className="events-title">Upcoming Events for Academic Year 2025 - 2026</h2>

          <div className="events-shell">
            <div className="events-grid">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-card-badge" />
                  <div className="event-card-content">
                    <strong>{event.date}</strong>
                    <span>{event.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="events-footer">
              <button className="next-btn">Next →</button>
            </div>
          </div>

          <button className="back-btn" onClick={() => navigate("/dashboard")}>Back</button>
        </section>
      </main>
    </div>
  );
}

export default Events;