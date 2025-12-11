import React, { useEffect, useState } from "react";
import { getStudentSubjectBreakdown } from "../api/gradesApi";
import "../styles/GradeBreakdown.css";

const CATEGORIES = [
  { id: "QUIZZES", label: "QUIZZES", weight: 0.3 },
  { id: "EXAMS", label: "EXAMS", weight: 0.3 },
  { id: "PERFORMANCE", label: "PERFORMANCE TASKS", weight: 0.3 },
  { id: "ASSIGNMENTS", label: "ASSIGNMENTS", weight: 0.1 },
];

export default function ParentGradeBreakdown({ studentId, quarter, onClose }) {
  const [assessments, setAssessments] = useState({
    QUIZZES: [],
    EXAMS: [],
    PERFORMANCE: [],
    ASSIGNMENTS: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      console.log('Fetching grades for:', { studentId, quarter });
      if (!studentId || !quarter) return;
      try {
        setLoading(true);
        setError(null);

        const subjectIds = [1, 2, 3, 4];
        const allGradesBySubject = await Promise.all(
          subjectIds.map((sid) => getStudentSubjectBreakdown(studentId, sid, quarter))
        );
        console.log('Raw API Response:', allGradesBySubject);

        const flattened = allGradesBySubject.flat().filter(Boolean);
        console.log('Flattened grades:', flattened);
        const grouped = {
          QUIZZES: [],
          EXAMS: [],
          PERFORMANCE: [],
          ASSIGNMENTS: [],
        };

        const currentQuarter = String(quarter);

        flattened.forEach((grade) => {
          if (String(grade.grading_period || grade.gradingPeriod) !== currentQuarter) return;
          let name = 
            grade.assessment_name || 
            grade.assessmentName || 
            grade.name || 
            grade.grade_name || 
            grade.gradeName || 
            "";
          let category = null;
          if (name.startsWith("[QUIZ]")) {
            category = "QUIZZES";
            name = name.replace("[QUIZ] ", "").replace("[QUIZ]", "");
          } else if (name.startsWith("[EXAM]")) {
            category = "EXAMS";
            name = name.replace("[EXAM] ", "").replace("[EXAM]", "");
          } else if (name.startsWith("[PERF]")) {
            category = "PERFORMANCE";
            name = name.replace("[PERF] ", "").replace("[PERF]", "");
          } else if (name.startsWith("[ASG]")) {
            category = "ASSIGNMENTS";
            name = name.replace("[ASG] ", "").replace("[ASG]", "");
          } else {
            const lower = name.toLowerCase();
            if (lower.includes("quiz")) category = "QUIZZES";
            else if (lower.includes("exam")) category = "EXAMS";
            else if (
              lower.includes("task") ||
              lower.includes("project") ||
              lower.includes("lab") ||
              lower.includes("report") ||
              lower.includes("performance")
            )
              category = "PERFORMANCE";
            else if (
              lower.includes("assignment") ||
              lower.includes("homework") ||
              lower.includes("seatwork")
            )
              category = "ASSIGNMENTS";
          }

          const parseDate = (val) => {
            if (!val) return '';
            const s = String(val);
            if (s.includes('T')) return s.split('T')[0];
            if (s.includes(' ')) return s.split(' ')[0];
            return s;
          };

          const item = {
            id: grade.grade_id || grade.gradeId || grade.id,
            name,
            date: parseDate(
              grade.date ||
              grade.grade_date ||
              grade.assessment_date ||
              grade.date_recorded ||
              grade.recorded_at
            ),
            score: Number(grade.grade_value || grade.gradeValue || grade.score || 0),
          };

          if (category && grouped[category]) grouped[category].push(item);
        });

        console.log('Final grouped assessments:', grouped);
        setAssessments(grouped);
      } catch (e) {
        console.error('Fetch error:', e);
        setError("Failed to load grades.");
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, [studentId, quarter]);

  const calculateSubtotal = (items) => {
    if (!items.length) return 0;
    const avg = items.reduce((sum, item) => sum + (Number(item.score) || 0), 0) / items.length;
    return Number(avg.toFixed(2));
  };

  const calculateFinal = () => {
    const WEIGHTS = {
      QUIZZES: 0.3,
      EXAMS: 0.3,
      PERFORMANCE: 0.3,
      ASSIGNMENTS: 0.1,
    };
    let total = 0;
    Object.keys(WEIGHTS).forEach((cat) => {
      const items = assessments[cat] || [];
      if (items.length) {
        const avg = items.reduce((sum, item) => sum + (Number(item.score) || 0), 0) / items.length;
        total += avg * WEIGHTS[cat];
      }
    });
    return total.toFixed(2);
  };

  const renderSection = (cat) => {
    const items = assessments[cat] || [];
    const subtotal = calculateSubtotal(items);
    return (
      <div className="breakdown-category">
        <div className="category-header-row">
          <div className="category-title">{CATEGORIES.find((c) => c.id === cat)?.label || cat}</div>
        </div>
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Assessment Name</th>
              <th>Date</th>
              <th className="score-col">Score</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td className="score-col">{item.score}</td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#999", padding: "1rem" }}>
                  No assessments recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="subtotal-row">Subtotal Average: {subtotal}</div>
      </div>
    );
  };

  return (
    <div className="grade-breakdown-overlay">
      <div className="grade-breakdown-container">
        <button className="close-breakdown-btn" onClick={onClose}>
          ← Back to Grades
        </button>

        <div className="breakdown-header">
          <h2>Quarter {quarter} Breakdown</h2>
          <div className="breakdown-meta">
            <span>All Subjects</span>
            <select className="quarter-select" value={quarter} disabled>
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  Q{q}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="breakdown-content">
          {CATEGORIES.map((c) => renderSection(c.id))}
        </div>

        <div className="final-average">Quarter Average: {calculateFinal()}</div>
      </div>
    </div>
  );
}

