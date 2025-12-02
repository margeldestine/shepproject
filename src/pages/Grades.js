import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "../styles/Grades.css";
import "../styles/Reminders.css";
import shepbg from "../assets/shepbg.png";
import { subjectSlug } from "../data/subjectDetails";
import { announcements } from "../data/announcements";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import ParentHeader from "../components/ParentHeader";
import BackButton from "../components/BackButton";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import { parentUser } from "../data/users";
import { gradesCopy } from "../data/copy";
import { getAllGrades } from "../api/gradesApi";
import { useAuth } from "../context/AuthContext";

function Grades() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [remindersOpen, setRemindersOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    let mounted = true;
    async function loadGrades() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllGrades();
        if (!mounted) return;
        setGrades(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load grades.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadGrades();
    return () => {
      mounted = false;
    };
  }, []);

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

            {loading && <p>Loading grades...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Subject ID</th>
                    <th>Grading Period</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g.grade_id || g.gradeId || `${g.student_id || g.studentId}-${g.subject_id || g.subjectId}-${g.grading_period || g.gradingPeriod || ''}`}>
                      <td>{g.student_id || g.studentId}</td>
                      <td>{g.subject_id || g.subjectId}</td>
                      <td>{g.grading_period || g.gradingPeriod || g.recorded_at || g.recordedAt}</td>
                      <td>{g.grade_value || g.gradeValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
