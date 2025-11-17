import "./Grades.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { subjectSlug } from "../data/subjectDetails";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import ParentHeader from "../components/ParentHeader";
import BackButton from "../components/BackButton";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal.js";
import DetailModal from "../components/DetailModal";
import GradesTable from "../components/GradesTable";
import React, { useState } from "react";
import { announcements } from "../data/announcements";

function Grades() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

  const rows = [
    { area: "Filipino", q1: 93, q2: 95, q3: 97, q4: 94, final: 95, remark: "PASSED" },
    { area: "English", q1: 93, q2: 98, q3: 90, q4: 97, final: 95, remark: "PASSED" },
    { area: "Mathematics", q1: 93, q2: 95, q3: 98, q4: 96, final: 95, remark: "PASSED" },
    { area: "Science", q1: 93, q2: 95, q3: 96, q4: 95, final: 95, remark: "PASSED" },
    { area: "Araling Panlipunan", q1: 93, q2: 96, q3: 97, q4: 93, final: 95, remark: "PASSED" },
    { area: "EsP", q1: 97, q2: 97, q3: 97, q4: 98, final: 97, remark: "PASSED" },
    { area: "TLE", q1: 97, q2: 99, q3: 96, q4: 95, final: 97, remark: "PASSED" },
    { area: "RHGP", q1: 100, q2: 100, q3: 100, q4: 96, final: 100, remark: "PASSED" },
  ];

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
      <ParentTopbar userName="Ritchie Marie" showReminders onOpenReminders={() => setRemindersOpen(true)} />

      <ParentLayout active="grades" panelClassName="grades-panel" contentClassName="grades-content-enter">
        <div className="grades-shell">
          {}
          <ParentHeader title="Learner's Academic Performance" headerClassName="parent-section-header" />
          <div className="grades-card">
            <p className="click-hint">Tip: Click any subject to view details</p>
            <GradesTable
              rows={rows}
              onRowClick={(area) => navigate(`/grades/${subjectSlug(area)}`)}
            />
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

export default Grades;