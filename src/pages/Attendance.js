import "./Attendance.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import { announcements } from "../data/announcements";

function Attendance() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

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

      {/* MAIN CONTENT */}
      <ParentLayout active="attendance" panelClassName="attendance-panel" contentClassName="attendance-content-enter">
        <div className="att-shell">
          <div className="att-header">
            <strong>Report on Learner's Attendance Record</strong>
            <span>● ● ●</span>
          </div>

          <div className="att-body">
            {/* CALENDAR */}
            <div className="calendar-card">
              <div className="calendar-top">
                <span>‹</span>
                <span>September 2025</span>
                <span>›</span>
              </div>

              <div className="calendar-grid">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (d) => (
                    <div className="weekday" key={d}>
                      {d}
                    </div>
                  )
                )}
                {[...Array(30)].map((_, i) => (
                  <div
                    className={`day ${i + 1 === 12 ? "active" : ""}`}
                    key={i}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* STATUS CARD */}
            <div className="status-card">
              <div className="status-title">Attendance Status</div>
              <div className="status-row">
                <span className="status-key">Date:</span>
                <span className="status-value">September 12, 2025</span>
              </div>
              <div className="status-row">
                <span className="status-key">Status:</span>
                <span className="status-value">Present ✅</span>
              </div>
              <div className="status-row">
                <span className="status-key">Remarks:</span>
                <span className="status-value">No remarks yet</span>
              </div>
            </div>
          </div>

          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Back
          </button>
        </div>
      </ParentLayout>

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

export default Attendance;
