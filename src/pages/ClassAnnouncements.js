import React, { useState } from "react";
import { X } from "lucide-react";
import "./ClassAnnouncements.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import ModalActions from "../components/ModalActions";
import BackButton from "../components/BackButton";
import { classAnnouncements } from "../data/classAnnouncements";

export default function ClassAnnouncements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);

  return (
    <TeacherLayout active="class-announcements" containerClassName="teacher-attendance-container">
      <div className="announcements-container">
          <AnnouncementsHeader title="Class Specific Announcements" onCreateNew={() => setShowNewAnnouncement(true)} />

          <div className="announcements-grid">
            {classAnnouncements.map((item) => (
              <div className="announcement-card" key={item.id}>
                <div className="announcement-header">
                  <h3>{item.title}</h3>
                  <span className="announcement-date">{item.date}</span>
                </div>
                <p className="announcement-desc">{item.description}</p>
                <button
                  className="read-more-btn"
                  onClick={() => setSelectedAnnouncement(item)}
                >
                  Read More
                </button>
              </div>
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
            closeIcon={<X size={20} />}
            closeOnOverlayClick={false}
          >
            <p className="modal-date">{selectedAnnouncement.date}</p>
            <pre className="modal-details">{selectedAnnouncement.fullDetails}</pre>
          </Modal>
        )}

        {showNewAnnouncement && (
          <Modal
            open={showNewAnnouncement}
            title="New Announcement"
            onClose={() => setShowNewAnnouncement(false)}
            overlayClassName="announcement-modal-overlay"
            modalClassName="announcement-modal"
            headerClassName="modal-header"
            closeIcon={<X size={20} />}
            closeOnOverlayClick={false}
          >
            <div className="modal-content">
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Enter announcement title" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" placeholder="Enter short description" />
              </div>
              <div className="form-group">
                <label>Details</label>
                <textarea placeholder="Enter full details" rows={6}></textarea>
              </div>
              <ModalActions>
                <BackButton
                  className="back-btn"
                  onClick={() => setShowNewAnnouncement(false)}
                >
                  Cancel
                </BackButton>
                <button className="save-btn">Save</button>
              </ModalActions>
            </div>
          </Modal>
        )}

    </TeacherLayout>
  );
}