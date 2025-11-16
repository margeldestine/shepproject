import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AnnouncementModal from "../components/AnnouncementModal";
import { announcements } from "../data/announcements";
import ParentTopbar from "../components/ParentTopbar";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import ParentProfileCard from "../components/ParentProfileCard";

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

  // Assignment modal state
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Detail modal state for alerts, events, announcements
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  const openAssignmentDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentModalOpen(true);
  };

  const openDetailModal = (item) => {
    setSelectedDetail(item);
    setDetailModalOpen(true);
  };

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName="Ritchie Marie" showReminders onOpenReminders={() => setRemindersOpen(true)} />

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
            <ParentProfileCard />

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

      {/* REMINDERS MODAL */}
      {remindersOpen && (
        <RemindersModal
          open={remindersOpen}
          onClose={() => setRemindersOpen(false)}
          onOpenAssignmentDetails={openAssignmentDetails}
          onOpenDetail={openDetailModal}
          announcements={announcements}
        />
      )}

      {/* ASSIGNMENT DETAIL MODAL */}
      {assignmentModalOpen && selectedAssignment && (
        <AssignmentModal
          open={assignmentModalOpen}
          assignment={selectedAssignment}
          onClose={() => setAssignmentModalOpen(false)}
        />
      )}

      {/* DETAIL MODAL FOR ALERTS, EVENTS, ANNOUNCEMENTS */}
      {detailModalOpen && selectedDetail && (
        <DetailModal
          open={detailModalOpen}
          detail={selectedDetail}
          onClose={() => setDetailModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
