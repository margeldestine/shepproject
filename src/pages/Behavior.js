import "./Behavior.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import ParentHeader from "../components/ParentHeader";
import BackButton from "../components/BackButton";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import { announcements } from "../data/announcements";

function Behavior() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const openAssignmentDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentModalOpen(true);
  };

  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const openDetailModal = (item) => {
    setSelectedDetail(item);
    setDetailModalOpen(true);
  };

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName="Ritchie Marie" showReminders onOpenReminders={() => setRemindersOpen(true)} />

      {}
      <ParentLayout active="behavior" panelClassName="behavior-panel" contentClassName="behavior-content-enter">
        <div className="record-shell">
          <ParentHeader title="Behavior Record" headerClassName="parent-section-header" />
          <div className="record-card">
            <div className="record-title">September 19, 2025</div>
            <div className="record-meta">Incident: Left class without permission</div>
            <div className="record-body">
              <p>
                Teacher's remarks: Francaryllese was reminded of classroom discipline and proper protocols.
                The matter has been addressed through counseling.
              </p>
              <p>Action: Counseled</p>
            </div>
          </div>
          <BackButton onClick={() => navigate("/dashboard")} />
        </div>
      </ParentLayout>

      {}
      {remindersOpen && (
        <RemindersModal
          open={remindersOpen}
          onClose={() => setRemindersOpen(false)}
          onOpenAssignmentDetails={openAssignmentDetails}
          onOpenDetail={openDetailModal}
          announcements={announcements}
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

export default Behavior;
