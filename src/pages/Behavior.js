  import "../styles/Behavior.css";
  import "../styles/Dashboard.css";
  import "../styles/Reminders.css";
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
  import { behavior } from "../data/behavior";
  import { behaviorCopy } from "../data/copy";
  import { parentUser } from "../data/users";

  function Behavior() {
    const navigate = useNavigate();

    const [remindersOpen, setRemindersOpen] = useState(false);
    const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const openAssignmentDetails = (assignment) => {
      setSelectedAssignment(assignment);
      setAssignmentModalOpen(true);
    };

    const openDetailModal = (item) => {
      setSelectedDetail(item);
      setDetailModalOpen(true);
    };

    const handleSignOut = () => {
      navigate("/");
    };

    const handleSettings = () => {
      navigate("/settings");
    };

    return (
      <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
        <div className="dash-overlay" />

        <ParentTopbar
          userName={parentUser.name}
          showReminders
          onOpenReminders={() => setRemindersOpen(true)}
          onSignOut={handleSignOut}
          onSettings={handleSettings}
        />
        <ParentLayout
          active="behavior"
          panelClassName="behavior-panel"
          contentClassName="behavior-content-enter"
        >
          <div className="record-shell">
            <ParentHeader
              title={behaviorCopy.headerTitle}
              headerClassName="parent-section-header"
            />

            {behavior.map((record, index) => (
              <div key={index} className="record-card">
                <div className="record-title">{record.date}</div>
                <div className="record-meta">Incident: {record.incident}</div>
                <div className="record-body">
                  <p>Teacher's remarks: {record.teacherRemarks}</p>
                  <p>Action: {record.action}</p>
                </div>
              </div>
            ))}

            <BackButton onClick={() => navigate("/dashboard")} />
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

  export default Behavior;
