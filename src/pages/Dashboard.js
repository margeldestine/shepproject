import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AnnouncementModal from "../components/AnnouncementModal";
import { announcements } from "../data/announcements";
import { LogOut, Settings, Bell } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", date: "", description: "" });
  const [showAll, setShowAll] = useState(false);
  const [remindersOpen, setRemindersOpen] = useState(false);

  const openModal = (title, date, description) => {
    setModalContent({ title, date, description });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>

        <div className="about-actions">
          <button
            onClick={() => setRemindersOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <Bell size={16} />
            <span>Reminders</span>
          </button>

          <button
            onClick={handleSettings}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>

          <button
            onClick={handleSignOut}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
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

      {/* Reminders Modal */}
      {remindersOpen && (
        <div className="reminders-modal-overlay" onClick={() => setRemindersOpen(false)}>
          <div className="reminders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reminders-header">
              <h2>Reminders</h2>
              <button className="close-btn" onClick={() => setRemindersOpen(false)}>×</button>
            </div>
            
            <div className="reminders-content">
              {/* Assignments Section */}
              <div className="reminder-section">
                <h3>Assignments</h3>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>📖 English - Short Story Writing</small>
                  </div>
                </div>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Science</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>🔬 Science - Parts of a Plant</small>
                  </div>
                </div>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Filipino</strong>
                    <span>Due Oct 1, 2025 (Wednesday)</span>
                    <small>🇵🇭 Filipino - Aking Paboritang Pagkain</small>
                  </div>
                </div>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Oct 2, 2025 (Thursday)</span>
                    <small>📖 English - My Favorite Animal</small>
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              <div className="reminder-section">
                <h3>Alerts</h3>
                <div className="reminder-item red">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Attendance Alert</strong>
                    <span>Your Child has 3 Recorded Absences in October.</span>
                  </div>
                </div>
                <div className="reminder-item blue">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Permission Slip Due in 2 Days!</strong>
                    <span>Please submit your child's signed permission slip before the deadline.</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events Section */}
              <div className="reminder-section">
                <h3>Upcoming Events</h3>
                <div className="reminder-item red">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 9</strong>
                    <span>Sergio Osmeña Day</span>
                  </div>
                </div>
                <div className="reminder-item red">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 23</strong>
                    <span>Faculty-Admin Day</span>
                  </div>
                </div>
              </div>

              {/* Announcements Section */}
              <div className="reminder-section">
                <h3>Recent Announcements</h3>
                {announcements.slice(0, 3).map((item) => (
                  <div className="reminder-item gray" key={item.id}>
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
      )}
    </div>
  );
}

export default Dashboard;