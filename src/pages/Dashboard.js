import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AnnouncementModal from "../components/AnnouncementModal";
import { announcements } from "../data/announcements";


function Dashboard() {

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", date: "", description: "" });
    const [showAll, setShowAll] = useState(false);

    const openModal = (title, date, description) => {
      setModalContent({ title, date, description });
      setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>

        <div className="about-actions">
          <button className="icon" aria-label="Settings" onClick={() => navigate("/settings")}>⚙️</button>
        </div>
      </header>


      <main className="dash-grid">
        <section className="dash-main">
          <div className="hero">
            <div className="hero-text">
              <h1>
                Connecting Schools, Parents, Teachers, and
                <br /> Students in One Platform
              </h1>
              <p>
                Easily manage events, track engagement, and stay in control of privacy. <br />Support student success every step of the way. 
              </p>
              <button
                className="about-btn-plain"
                onClick={() => navigate("/about")}
              >
                About
              </button>
            </div>
          </div>

          <div className="section-header">
            <h2>Announcements &amp; Updates</h2>
            {!showAll && (
              <button className="see-all" onClick={() => setShowAll(true)}>See All</button>
            )}
          </div>

          <div className="cards">
            {(showAll ? announcements : announcements.slice(0, 3)).map((item) => (
              <article className="card" key={item.id}>
                <h3><br />
                  {item.title}
                </h3>
                <small>{item.date}</small>
                <br />
                <p className="desc">{item.preview}</p>
                <br />
                <button
                  className="read-btn"
                  onClick={() => openModal(item.title, item.date, item.full)}
                >
                  Read More
                </button>
              </article>
            ))}
          </div>

          {showAll && (
            <button className="back-pill" onClick={() => setShowAll(false)}>
              Back
            </button>
          )}
        </section>

        <aside className="dash-side">
          <div className="sidebar-panel">
            <div className="profile-card">
              <div className="profile-avatar" />
              <h4>Francaryllese Dacabelam</h4>

              <div className="profile-actions">
                <button className="pill" onClick={() => navigate("/behavior")}>Behavior</button>
                <button className="pill" onClick={() => navigate("/attendance")}>Attendance</button>
                <button className="pill" onClick={() => navigate("/grades")}>View Grades</button>
                <button className="pill" onClick={() => navigate("/forms")}>Forms</button>
              </div>
            </div>

            {/* Upcoming Events (static prototype) */}
            <div className="events-card" onClick={() => navigate("/events")} style={{ cursor: "pointer" }}>
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
          </div>
        </aside>
      </main>
      <AnnouncementModal
        open={modalOpen}
        title={modalContent.title}
        date={modalContent.date}
        description={modalContent.description}
        onClose={closeModal}
      />
    </div>
  );
}

export default Dashboard;
