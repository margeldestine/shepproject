import React from "react";
import "./Events.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import ParentTopbar from "../components/ParentTopbar";
import { EventCard } from "../components/EventsCard";
import BackButton from "../components/BackButton";

function Events() {
  const navigate = useNavigate();

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

      <ParentTopbar userName="Ritchie Marie" />

      {}
      <main className="events-panel">
        <section className="events-content-enter">
          {}
          <h2 className="events-title">Upcoming Events for Academic Year 2025 - 2026</h2>

          <div className="events-shell">
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event.id} date={event.date} title={event.title} />
              ))}
            </div>
            {}
            <div className="events-footer">
              <button className="next-btn">Next →</button>
            </div>
          </div>

          <BackButton onClick={() => navigate("/dashboard")} />
        </section>
      </main>
    </div>
  );
}

export default Events;