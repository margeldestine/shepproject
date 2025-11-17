import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./Announcements.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import AnnouncementCard from "../components/AnnouncementCard";
import { announcements } from "../data/announcements";

export default function Announcements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <TeacherLayout active="announcements" containerClassName="teacher-attendance-container">
      <div className="announcements-container">
        <AnnouncementsHeader title="Announcements" onCreateNew={() => setShowNewModal(true)} />

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

      {selectedAnnouncement && (
        <Modal
          open={!!selectedAnnouncement}
          title={selectedAnnouncement.title}
          onClose={() => setSelectedAnnouncement(null)}
          overlayClassName="announcement-modal-overlay"
          modalClassName="announcement-modal"
          headerClassName="modal-header"
        >
          <p className="modal-date">{selectedAnnouncement.date}</p>
          <pre className="modal-details">{selectedAnnouncement.full}</pre>
        </Modal>
      )}

      {showNewModal && (
        <Modal
          open={showNewModal}
          title="New Announcement"
          onClose={() => setShowNewModal(false)}
          overlayClassName="announcement-modal-overlay"
          modalClassName="announcement-modal"
          headerClassName="modal-header"
        >
          <input type="text" placeholder="Title" />
          <textarea placeholder="Details"></textarea>
          <button className="edit-btn" style={{ marginTop: "10px" }}>Create</button>
        </Modal>
      )}

      {editAnnouncement && (
        <Modal
          open={!!editAnnouncement}
          title="Edit Announcement"
          onClose={() => setEditAnnouncement(null)}
          overlayClassName="announcement-modal-overlay"
          modalClassName="announcement-modal"
          headerClassName="modal-header"
        >
          <input type="text" defaultValue={editAnnouncement.title} />
          <textarea defaultValue={editAnnouncement.full}></textarea>
          <button className="edit-btn" style={{ marginTop: "10px" }}>Save</button>
        </Modal>
      )}
    </TeacherLayout>
  );
}
