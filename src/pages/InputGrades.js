import React, { useState, useEffect } from "react";
import "../styles/TeacherGrades.css";
import { useNavigate, useParams } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import { getStudentData } from "../api/studentApi";
import { createAssessment } from "../api/assessmentsApi";

const SECTION_MAP = { 
  "G2Faith": 1, 
  "G2Hope": 2, 
  "G2Love": 3 
};

// Dynamic subject ID mapping
const getSubjectId = (subjectParam) => {
  const subjectMap = {
    "science": 1,
    "mathematics": 2,
    "reading": 3,
    "language": 4
  };
  return subjectMap[subjectParam?.toLowerCase()] || 1;
};

const getSubjectName = (subjectId) => {
  const nameMap = {
    1: "Science",
    2: "Mathematics",
    3: "Reading",
    4: "Language"
  };
  return nameMap[subjectId] || "Science";
};

export default function InputGrades() {
  const navigate = useNavigate();
  const { section, subject } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    studentId: "",
    quarter: 1,
    assessments: [{ name: "", score: "" }],
  });

  const SUBJECT_ID = getSubjectId(subject);
  const subjectName = getSubjectName(SUBJECT_ID);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const sectionId = SECTION_MAP[section];
        const all = await getStudentData();
        const filtered = all.filter((s) => Number(s.section_id) === sectionId);
        setStudents(filtered);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [section]);

  const addRow = () => {
    setForm((p) => ({
      ...p,
      assessments: [...p.assessments, { name: "", score: "" }],
    }));
  };

  const updateRow = (idx, field, value) => {
    setForm((p) => {
      const updated = [...p.assessments];
      updated[idx][field] = value;
      return { ...p, assessments: updated };
    });
  };

  const removeRow = (idx) => {
    setForm((p) => ({
      ...p,
      assessments: p.assessments.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async () => {
    if (!form.studentId) {
      alert("Please select a student");
      return;
    }

    const payloads = form.assessments
      .filter((a) => a.name && a.score)
      .map((a) => ({
        student_id: parseInt(form.studentId),
        subject_id: SUBJECT_ID,
        grading_period: form.quarter,
        assessment_name: a.name,
        grade_value: parseFloat(a.score),
      }));

    if (payloads.length === 0) {
      alert("Please add at least one assessment with name and score");
      return;
    }

    // Validate scores
    const invalidScores = payloads.filter(p => p.grade_value < 0 || p.grade_value > 100);
    if (invalidScores.length > 0) {
      alert("All scores must be between 0 and 100");
      return;
    }

    try {
      await Promise.all(payloads.map((p) => createAssessment(p)));
      alert(`Successfully saved ${payloads.length} assessment(s)!`);
      navigate(`/teacher/grades/${section}/${subject || 'science'}`);
    } catch (err) {
      console.error("Error saving assessments:", err);
      alert("Failed to save assessments: " + err.message);
    }
  };

  if (loading) {
    return (
      <TeacherLayout active="grades" containerClassName="teacher-grades-container" showBackButton={true}>
        <div className="grades-container">
          <p>Loading...</p>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout active="grades" containerClassName="teacher-grades-container" showBackButton={true}>
      <div className="grades-container">
        <div className="grades-header">
          <h2>Input Grades - {subjectName}</h2>
        </div>
        
        <div style={{ padding: "1.5rem" }}>
          {/* Student Selection */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ 
              fontWeight: "600", 
              display: "block", 
              marginBottom: "0.5rem",
              color: "#630000"
            }}>
              Select Student *
            </label>
            <select
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              style={{ 
                width: "100%", 
                padding: "0.6rem", 
                borderRadius: "6px", 
                border: "1px solid #bda76a",
                fontSize: "0.95rem"
              }}
            >
              <option value="">-- Select a student --</option>
              {students.map((s) => (
                <option key={s.student_id} value={s.student_id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Quarter Selection */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ 
              fontWeight: "600", 
              display: "block", 
              marginBottom: "0.5rem",
              color: "#630000"
            }}>
              Grading Period *
            </label>
            <select
              value={form.quarter}
              onChange={(e) => setForm({ ...form, quarter: Number(e.target.value) })}
              style={{ 
                width: "100%", 
                padding: "0.6rem", 
                borderRadius: "6px", 
                border: "1px solid #bda76a",
                fontSize: "0.95rem"
              }}
            >
              <option value={1}>Quarter 1</option>
              <option value={2}>Quarter 2</option>
              <option value={3}>Quarter 3</option>
              <option value={4}>Quarter 4</option>
            </select>
          </div>

          {/* Assessments Section */}
          <div style={{ 
            borderTop: "2px solid #ab8922", 
            paddingTop: "1rem", 
            marginTop: "1rem" 
          }}>
            <h3 style={{ 
              marginBottom: "0.8rem", 
              color: "#630000",
              fontSize: "1.1rem"
            }}>
              Assessments
            </h3>
            <p style={{ 
              fontSize: "0.85rem", 
              color: "#666", 
              marginBottom: "1rem" 
            }}>
              Add multiple assessments (e.g., Quiz 1, Midterm Exam, Lab Report, Homework 1)
            </p>

            {form.assessments.map((a, i) => (
              <div 
                key={i} 
                style={{ 
                  display: "flex", 
                  gap: "0.5rem", 
                  marginBottom: "0.8rem",
                  alignItems: "center"
                }}
              >
                <input
                  placeholder="Assessment name (e.g., Quiz 1, Midterm Exam)"
                  value={a.name}
                  onChange={(e) => updateRow(i, "name", e.target.value)}
                  style={{ 
                    flex: 2, 
                    padding: "0.6rem", 
                    borderRadius: "6px", 
                    border: "1px solid #bda76a",
                    fontSize: "0.9rem"
                  }}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Score (0-100)"
                  value={a.score}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d*\.?\d*$/.test(val)) {
                      updateRow(i, "score", val);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{ 
                    flex: 1, 
                    padding: "0.6rem", 
                    borderRadius: "6px", 
                    border: "1px solid #bda76a",
                    fontSize: "0.9rem"
                  }}
                />
                {form.assessments.length > 1 && (
                  <button
                    onClick={() => removeRow(i)}
                    style={{
                      padding: "0.6rem 0.8rem",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                    title="Remove this assessment"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addRow}
              style={{
                padding: "0.5rem 1.2rem",
                marginTop: "0.5rem",
                backgroundColor: "#ffd54f",
                color: "#630000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              + Add Another Assessment
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            marginTop: "2rem", 
            display: "flex", 
            gap: "1rem",
            borderTop: "1px solid #eee",
            paddingTop: "1.5rem"
          }}>
            <button
              onClick={() => navigate(`/teacher/grades/${section}/${subject || 'science'}`)}
              style={{
                padding: "0.7rem 1.8rem",
                backgroundColor: "#ccc",
                color: "#333",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "600"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: "0.7rem 1.8rem",
                backgroundColor: "#630000",
                color: "#f1c93d",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "600"
              }}
            >
              Save All Assessments
            </button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}