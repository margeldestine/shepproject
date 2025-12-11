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
import ParentGradeBreakdown from "./ParentGradeBreakdown";

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
  const [selectedQuarter, setSelectedQuarter] = useState(null);

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

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(quarter);
    setShowBreakdown(true);
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
        const initCats = () => ({ QUIZZES: [], EXAMS: [], PERFORMANCE: [], ASSIGNMENTS: [] });
        const buckets = { Q1: initCats(), Q2: initCats(), Q3: initCats(), Q4: initCats(), Finals: initCats() };
        const detectCategory = (name) => {
          const n = (name || "").toString();
          if (n.startsWith("[QUIZ]")) return "QUIZZES";
          if (n.startsWith("[EXAM]")) return "EXAMS";
          if (n.startsWith("[PERF]")) return "PERFORMANCE";
          if (n.startsWith("[ASG]")) return "ASSIGNMENTS";
          const lower = n.toLowerCase();
          if (lower.includes("quiz")) return "QUIZZES";
          if (lower.includes("exam")) return "EXAMS";
          if (lower.includes("task") || lower.includes("project") || lower.includes("lab") || lower.includes("report") || lower.includes("performance")) return "PERFORMANCE";
          if (lower.includes("assignment") || lower.includes("homework") || lower.includes("seatwork")) return "ASSIGNMENTS";
          return null;
        };
        own.forEach((g) => {
          const p = norm(g);
          if (!p || !buckets[p]) return;
          const val = Number(g.grade_value || g.gradeValue || g.score);
          if (!Number.isFinite(val)) return;
          const name = (g.assessment_name || g.assessmentName || g.name || g.title || g.description || "").toString();
          const cat = detectCategory(name);
          if (cat) buckets[p][cat].push(val);
        });
        const avg = (arr) => (arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length) : null);
        const WEIGHTS = { QUIZZES: 0.3, EXAMS: 0.3, PERFORMANCE: 0.3, ASSIGNMENTS: 0.1 };
        const weighted = (cats) => {
          const has = Object.values(cats).some((a) => a.length);
          if (!has) return null;
          let total = 0;
          Object.keys(WEIGHTS).forEach((k) => {
            const items = cats[k] || [];
            if (items.length) {
              const a = avg(items);
              if (a != null) total += a * WEIGHTS[k];
            }
          });
          return total;
        };
        const q1W = weighted(buckets.Q1);
        const q2W = weighted(buckets.Q2);
        const q3W = weighted(buckets.Q3);
        const q4W = weighted(buckets.Q4);
        const finalsExplicit = weighted(buckets.Finals);
        const present = [q1W, q2W, q3W, q4W].filter((v) => v != null);
        const finalsFromQuarters = present.length ? (present.reduce((a, b) => a + b, 0) / present.length) : null;
        setSummary({
          Q1: q1W,
          Q2: q2W,
          Q3: q3W,
          Q4: q4W,
          Finals: finalsExplicit != null ? finalsExplicit : finalsFromQuarters,
        });
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
                    { label: "Q1", value: summary.Q1, quarter: 1 },
                    { label: "Q2", value: summary.Q2, quarter: 2 },
                    { label: "Q3", value: summary.Q3, quarter: 3 },
                    { label: "Q4", value: summary.Q4, quarter: 4 },
                    { label: "Finals", value: summary.Finals, quarter: 5 },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      onClick={row.label !== "Finals" ? () => handleQuarterClick(row.quarter) : undefined}
                      style={{ cursor: row.label !== "Finals" ? "pointer" : "default" }}
                      className={row.label !== "Finals" ? "grade-row-clickable" : ""}
                    >
                      <td>{row.label}</td>
                      <td>{row.value != null ? Math.round(Number(row.value)) : "—"}</td>
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

      {showBreakdown && (
        <ParentGradeBreakdown
          studentId={user?.studentId || user?.student_id}
          quarter={selectedQuarter}
          onClose={() => setShowBreakdown(false)}
        />
      )}
    </div>
  );
}

export default Grades;
