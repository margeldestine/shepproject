import React, { useState } from "react";
import "./Forms.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal.js";
import DetailModal from "../components/DetailModal";
import BackButton from "../components/BackButton";
import { announcements } from "../data/announcements";
import { events } from "../data/forms";

function Forms() {
  const navigate = useNavigate();
  const [eventsOpen, setEventsOpen] = useState(true);
  const [showMeeting, setShowMeeting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [response, setResponse] = useState(null);
  const [remindersOpen, setRemindersOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

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

  const meeting = events[0]; // Only PTA meeting for now

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />
      <ParentTopbar userName="Ritchie Marie" showReminders onOpenReminders={() => setRemindersOpen(true)} />

      <ParentLayout active="forms" panelClassName="forms-panel" contentClassName="forms-content-enter">
        <div className="forms-shell">
          <div className="forms-header">
            <strong>Parental Consent and Authorization Forms</strong>
            <span>● ● ●</span>
          </div>

          <div className="forms-card">
            <div
              className={`category ${eventsOpen ? "open" : ""}`}
              onClick={() => setEventsOpen((v) => !v)}
              role="button"
              aria-expanded={eventsOpen}
            >
              <div className="left">
                <span className="star">★</span>
                <span>Events</span>
              </div>
              <span className="arrow">›</span>
            </div>

            {eventsOpen && (
              <>
                <div
                  className={`subitem ${showMeeting ? "open" : ""}`}
                  onClick={() => {
                    setShowMeeting((v) => {
                      const next = !v;
                      if (next) {
                        setShowConfirm(false);
                        setResponse(null);
                      }
                      return next;
                    });
                  }}
                  role="button"
                  aria-label="Open PTA Meeting form"
                  title="PTA Meeting"
                >
                  <span>{meeting.title}</span>
                  <span className="arrow">›</span>
                </div>

                {showMeeting && (
                  <>
                    {!showConfirm ? (
                      <div className="meeting-panel">
                        <div className="meeting-header">Meeting Details</div>
                        <div className="meeting-body">
                          <div className="meeting-grid">
                            <div className="field">
                              <label>Appointed By</label>
                              <div className="box">{meeting.appointedBy}</div>
                            </div>
                            <div className="field">
                              <label>Date</label>
                              <div className="box">{meeting.date}</div>
                            </div>
                            <div className="field">
                              <label>Time</label>
                              <div className="box">{meeting.time}</div>
                            </div>
                            <div className="field">
                              <label>Location</label>
                              <div className="box">{meeting.location}</div>
                            </div>
                            <div className="field" style={{ gridColumn: "1 / -1" }}>
                              <label>Purpose</label>
                              <div className="box">{meeting.purpose}</div>
                            </div>
                          </div>
                          <div className="meeting-footer">
                            <button className="next-btn" onClick={() => setShowConfirm(true)}>Next ›</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="confirm-panel fade-enter">
                        <div className="confirm-header">Meeting Confirmation Form</div>
                        <div className="confirm-body">
                          <p>{meeting.confirmationMessage}</p>
                          <div className="checklist">
                            <div className="label">Please check one:</div>
                            <div className="check-row">
                              <input
                                id="resp-yes"
                                type="checkbox"
                                checked={response === "yes"}
                                onChange={() => setResponse(response === "yes" ? null : "yes")}
                              />
                              <label htmlFor="resp-yes">I will attend the conference at this time.</label>
                            </div>
                            <div className="check-row">
                              <input
                                id="resp-no"
                                type="checkbox"
                                checked={response === "no"}
                                onChange={() => setResponse(response === "no" ? null : "no")}
                              />
                              <label htmlFor="resp-no">I am unable to make it at the scheduled time.</label>
                            </div>
                          </div>
                          <div className="attach-row">
                            <button className="attach-btn">Attach e-signature here</button>
                          </div>
                          <div className="submit-row">
                            <button className="submit-btn">Submit ›</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <BackButton onClick={() => navigate("/dashboard")} />
          </div>
        </div>
      </ParentLayout>

      {remindersOpen && (
        <RemindersModal
          open={remindersOpen}
          onClose={() => setRemindersOpen(false)}
          onOpenAssignmentDetails={openAssignmentDetails}
          onOpenDetail={openDetailModal}
          announcements={announcements}
        />
      )}

      {assignmentModalOpen && selectedAssignment && (
        <AssignmentModal
          open={assignmentModalOpen}
          assignment={selectedAssignment}
          onClose={() => setAssignmentModalOpen(false)}
        />
      )}

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

export default Forms;
