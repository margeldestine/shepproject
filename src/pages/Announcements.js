import React, { useState } from "react";
import "../styles/Announcements.css";
import "../styles/Add.css"; // Reusable modal & buttons
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import ModalActions from "../components/ModalActions";
import BackButton from "../components/BackButton";
import AnnouncementCard from "../components/AnnouncementCard";
import { announcements } from "../data/announcements";

export default function Announcements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    alert("Announcement created!");
    setShowNewModal(false);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    alert("Announcement saved!");
    setEditAnnouncement(null);
  };

  return (
    <TeacherLayout active="announcements" containerClassName="teacher-attendance-container">
      <div className="announcements-container">
        <AnnouncementsHeader
          title="Announcements"
          onCreateNew={() => setShowNewModal(true)}
        />

        <div className="announcements-grid">
          {announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              onDetails={() => setSelectedAnnouncement(item)}
              onEdit={() => setEditAnnouncement(item)}
            />
          ))}
        </div>
      </div>

      {/* View Announcement */}
      {selectedAnnouncement && (
        <Modal
          open={!!selectedAnnouncement}
          title={selectedAnnouncement.title}
          onClose={() => setSelectedAnnouncement(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <p className="modal-date">{selectedAnnouncement.date}</p>
          <pre className="modal-details">{selectedAnnouncement.full}</pre>
        </Modal>
      )}

      {/* New Announcement */}
      {showNewModal && (
        <Modal
          open={showNewModal}
          title="New Announcement"
          onClose={() => setShowNewModal(false)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form onSubmit={handleCreateAnnouncement}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="Title" required />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea placeholder="Details" rows={5} required></textarea>
            </div>

            <div className="modal-actions modal-actions-reverse">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setShowNewModal(false)}
              >
                Back
              </button>
              <button type="submit" className="action-btn-dark action-btn-sm">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {editAnnouncement && (
        <Modal
          open={!!editAnnouncement}
          title="Edit Announcement"
          onClose={() => setEditAnnouncement(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form onSubmit={handleSaveAnnouncement}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" defaultValue={editAnnouncement.title} required />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea defaultValue={editAnnouncement.full} rows={5} required></textarea>
            </div>

            <div className="modal-actions modal-actions-reverse">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setEditAnnouncement(null)}
              >
                Back
              </button>
              <button type="submit" className="action-btn-dark action-btn-sm">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </TeacherLayout>
  );
}
