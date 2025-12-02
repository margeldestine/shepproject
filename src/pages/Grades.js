import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/Grades.css";
import "../styles/Reminders.css";
import shepbg from "../assets/shepbg.png";
import { subjectSlug } from "../data/subjectDetails";
import { announcements } from "../data/announcements";
import { rows } from "../data/grades";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import ParentHeader from "../components/ParentHeader";
import BackButton from "../components/BackButton";
import GradesTable from "../components/GradesTable";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import { parentUser } from "../data/users";
import { gradesCopy } from "../data/copy";

function Grades() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);
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

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar
        userName={parentUser.name}
        showReminders
        onOpenReminders={() => setRemindersOpen(true)}
      />

      <ParentLayout
        active="grades"
        panelClassName="grades-panel"
        contentClassName="grades-content-enter"
      >
        <div className="grades-shell">
          <ParentHeader
            title={gradesCopy.headerTitle}
            headerClassName="parent-section-header"
          />

          <div className="grades-card">
            <p className="click-hint">
              {gradesCopy.hint}
            </p>

            <GradesTable
              rows={rows}
              onRowClick={(area) => navigate(`/grades/${subjectSlug(area)}`)}
            />
          </div>

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

export default Grades;
