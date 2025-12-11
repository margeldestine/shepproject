import "../styles/Dashboard.css";
import "../styles/Reminders.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnnouncementModal from "../components/AnnouncementModal";
import { announcements as staticAnnouncements } from "../data/announcements";
import { dashboardCopy } from "../data/copy";
import ParentTopbar from "../components/ParentTopbar";
import { parentUser } from "../data/users";
import { useAuth } from "../context/AuthContext";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import ParentProfileCard from "../components/ParentProfileCard";
import AnnouncementCard from "../components/AnnouncementCard";
import EventsCard from "../components/EventsCard";
import BackButton from "../components/BackButton";
import { getAllCommunications } from "../api/communicationApi";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", date: "", description: "" });
  const [showAll, setShowAll] = useState(false);
  const [remindersOpen, setRemindersOpen] = useState(false);
  const [apiAnnouncements, setApiAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [announcementsError, setAnnouncementsError] = useState("");

  const openModal = (title, date, description) => {
    setModalContent({ title, date, description });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

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

  useEffect(() => {
    let mounted = true;
    const fetchAnnouncements = async () => {
      try {
        setLoadingAnnouncements(true);
        setAnnouncementsError("");
        const list = await getAllCommunications();
        const mapped = (Array.isArray(list) ? list : []).map((c) => ({
          id: c.communication_id || c.id,
          title: c.title || "",
          date: c.event_date || c.eventDate || c.posted_At || c.posted_at || c.date || "",
          preview: c.description || c.content || c.details || "",
          full: c.details || c.description || c.content || "",
        }));
        if (mounted) setApiAnnouncements(mapped);
      } catch (e) {
        if (mounted) setAnnouncementsError(e?.message || "Failed to load announcements");
      } finally {
        if (mounted) setLoadingAnnouncements(false);
      }
    };
    fetchAnnouncements();
    return () => { mounted = false; };
  }, []);

  const dashboardAnnouncements = apiAnnouncements.length ? apiAnnouncements : staticAnnouncements;

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName={user ? `${user.firstName} ${user.lastName}` : "Parent Name"} showReminders onOpenReminders={() => setRemindersOpen(true)} />

      <main className="dash-grid">
        <section className="dash-main">
          <div className="hero">
            <div className="hero-text">
              <h1>
                {dashboardCopy.titleLine1}
                <br /> {dashboardCopy.titleLine2}
              </h1>
              <p>
                {dashboardCopy.subtitle}
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
            {(showAll ? dashboardAnnouncements : dashboardAnnouncements.slice(0, 3)).map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                variant="dashboard"
                showEdit={false}
                detailsLabel="Read More"
                onDetails={() => openModal(item.title, item.date, item.full)}
              />
            ))}
          </div>

          {showAll && (
            <BackButton className="back-pill" onClick={() => setShowAll(false)}>
              Back
            </BackButton>
          )}
        </section>

        <aside className="dash-side">
          <div className="sidebar-panel">
            <ParentProfileCard />

            {}
            <EventsCard onClick={() => navigate("/events")} />
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

      {}
      {remindersOpen && (
        <RemindersModal
          open={remindersOpen}
          onClose={() => setRemindersOpen(false)}
          onOpenAssignmentDetails={openAssignmentDetails}
          onOpenDetail={openDetailModal}
          announcements={dashboardAnnouncements}
        />
      )}

      {}
      {assignmentModalOpen && selectedAssignment && (
        <AssignmentModal
          open={assignmentModalOpen}
          assignment={selectedAssignment}
          onClose={() => setAssignmentModalOpen(false)}
        />
      )}

      {}
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
