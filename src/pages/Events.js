import React from "react";
import "../styles/Events.css";
import "../styles/Dashboard.css"; 
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import ParentTopbar from "../components/ParentTopbar";
import { parentUser } from "../data/users";
import { EventCard } from "../components/EventsCard";
import BackButton from "../components/BackButton";
import { events } from "../data/events";
import { eventsCopy } from "../data/copy";

function Events() {
  const navigate = useNavigate();

  

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName={parentUser.name} />

      {}
      <main className="events-panel">
        <section className="events-content-enter">
          {}
          <h2 className="events-title">{eventsCopy.pageTitle}</h2>

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
