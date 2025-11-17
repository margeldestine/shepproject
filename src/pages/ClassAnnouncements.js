import React, { useState } from "react";
import { X } from "lucide-react";
import "./ClassAnnouncements.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import ModalActions from "../components/ModalActions";
import BackButton from "../components/BackButton";

export default function ClassAnnouncements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);

  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      description:
        "We invite all parents to our quarterly meeting to discuss student progress.",
      date: "Sep 15, 2025",
      fullDetails:
        "Dear Parents,\n\nWe are pleased to invite you to our upcoming Parent-Teacher Meeting on September 15, 2025. During this session, we will discuss your child’s academic progress and provide updates about classroom activities and learning outcomes.\n\nYour participation is highly valued as it strengthens the collaboration between home and school.\n\nThank you,\nG2-Faith Class Adviser",
    },
    {
      id: 2,
      title: "Upcoming Class Activity",
      description:
        "Our next class activity will involve hands-on experiments in science and teamwork activities.",
      date: "Oct 25, 2025",
      fullDetails:
        "Our next class activity will take place on October 25, 2025. The activity aims to provide hands-on learning experiences aligned with our science curriculum. More information, including materials to bring and time slots, will be announced soon.\n\nThank you for your support!",
    },
    {
      id: 3,
      title: "Quarterly Exams",
      description:
        "Please be reminded that the quarterly exams will begin next week. Review your lessons well!",
      date: "Nov 3, 2025",
      fullDetails:
        "The Quarterly Exams for all subjects will start on November 3, 2025. A detailed schedule will be provided soon. Students are encouraged to review their notes, assignments, and handouts.\n\nLet’s aim for the best results — study hard and good luck!",
    },
    {
      id: 4,
      title: "Field Trip Announcement",
      description:
        "We’re excited to announce our upcoming educational field trip to the Science Discovery Center.",
      date: "Nov 18, 2025",
      fullDetails:
        "We’re thrilled to announce that our class will visit the Science Discovery Center on November 18, 2025. This activity supports experiential learning and helps students connect lessons to real-world science.\n\nPlease submit signed consent forms by November 10.",
    },
    {
      id: 5,
      title: "Christmas Rehearsal",
      description:
        "Our class will perform a short skit during the school’s Christmas program. Rehearsals start soon!",
      date: "Dec 5, 2025",
      fullDetails:
        "The school’s Christmas Program is fast approaching! Our class will perform a heartwarming short skit. Rehearsals will begin on December 5, 2025, after class hours.\n\nWe encourage everyone to participate and showcase your creativity and teamwork!",
    },
  ];

  return (
    <TeacherLayout active="class-announcements" containerClassName="teacher-attendance-container">
      <div className="announcements-container">
          <AnnouncementsHeader title="Class Specific Announcements" onCreateNew={() => setShowNewAnnouncement(true)} />

          <div className="announcements-grid">
            {announcements.map((item) => (
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

        {}
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

        {}
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
