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
import GradeBreakdown from "../components/GradeBreakdown";
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
  const [summary, setSummary] = useState({ Q1: null, Q2: null, Q3: null, Q4: null, Finals: null });
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);

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
        const list = Array.isArray(data) ? data : [];
        setGrades(list);
        const sid = user?.studentId || user?.student_id;
        const own = sid ? list.filter((g) => Number(g.student_id || g.studentId) === Number(sid)) : list;
        const norm = (src) => {
          const raw = (src.grading_period || src.gradingPeriod || "").toString().toLowerCase();
          if (raw.includes("final")) return "Finals";
          if (raw.includes("q1") || raw.includes("1")) return "Q1";
          if (raw.includes("q2") || raw.includes("2")) return "Q2";
          if (raw.includes("q3") || raw.includes("3")) return "Q3";
          if (raw.includes("q4") || raw.includes("4")) return "Q4";
          return "";
        };
        const buckets = { Q1: [], Q2: [], Q3: [], Q4: [], Finals: [] };
        own.forEach((g) => {
          const p = norm(g);
          if (p && buckets[p]) {
            const val = Number(g.grade_value || g.gradeValue);
            if (Number.isFinite(val)) buckets[p].push(val);
          }
        });
        const avg = (arr) => (arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length) : null);
        const q1Avg = avg(buckets.Q1);
        const q2Avg = avg(buckets.Q2);
        const q3Avg = avg(buckets.Q3);
        const q4Avg = avg(buckets.Q4);
        const explicitFinal = avg(buckets.Finals);
        const quarterAvgs = [q1Avg, q2Avg, q3Avg, q4Avg].filter((v) => v != null);
        const finalsAvg = quarterAvgs.length ? (quarterAvgs.reduce((a, b) => a + b, 0) / quarterAvgs.length) : null;
        setSummary({
          Q1: q1Avg,
          Q2: q2Avg,
          Q3: q3Avg,
          Q4: q4Avg,
          Finals: explicitFinal != null ? explicitFinal : finalsAvg,
        });

        // Build subject options for breakdown view
        const subjectsMap = new Map();
        own.forEach((g) => {
          const id = g.subject_id || g.subjectId;
          const name = (g.subject_name || g.subjectName || "").toString();
          if (id) subjectsMap.set(Number(id), name || `Subject ${id}`);
        });
        const options = Array.from(subjectsMap.entries()).map(([id, name]) => ({ id, name: name || "Science" }));
        const defaultOption = options[0] || { id: 1, name: "Science" };
        setSelectedSubject(defaultOption);
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
            {loading && <p>Loading grades...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Grading Period</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Q1", value: summary.Q1 },
                    { label: "Q2", value: summary.Q2 },
                    { label: "Q3", value: summary.Q3 },
                    { label: "Q4", value: summary.Q4 },
                    { label: "Finals", value: summary.Finals },
                  ].map((row) => (
                  <tr
                    key={row.label}
                    onClick={() => {
                      const q = row.label.startsWith("Q") ? parseInt(row.label.replace("Q", ""), 10) : selectedQuarter;
                      setSelectedQuarter(Number.isFinite(q) ? q : 1);
                      setShowBreakdown(true);
                    }}
                    style={{ cursor: row.label !== "Finals" ? "pointer" : "default" }}
                  >
                      <td>{row.label}</td>
                      <td>{row.value != null ? Math.round(row.value) : "—"}</td>
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

      {showBreakdown && selectedSubject && (
        <GradeBreakdown
          studentId={user?.studentId || user?.student_id}
          studentName={`${user?.studentFirstName || ""} ${user?.studentLastName || ""}`.trim() || parentUser.name}
          subjectId={selectedSubject.id}
          subjectName={selectedSubject.name}
          sectionName={user?.studentGradeLevel ? `Grade ${user.studentGradeLevel}` : ""}
          quarter={selectedQuarter}
          savedGrades={grades.filter((g) => Number(g.student_id || g.studentId) === Number(user?.studentId || user?.student_id) && Number(g.subject_id || g.subjectId) === Number(selectedSubject.id))}
          readOnly={true}
          hideSubjectInfo={true}
          onClose={() => setShowBreakdown(false)}
          onQuarterChange={(q) => setSelectedQuarter(q)}
        />
      )}
    </div>
  );
}

export default Grades;
