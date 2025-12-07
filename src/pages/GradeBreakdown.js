import React, { useState, useEffect } from "react";
import "../styles/TeacherGrades.css";
import { useNavigate, useParams } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import { getDetailedGrades } from "../api/assessmentsApi";
import { getStudentData } from "../api/studentApi";

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

export default function GradeBreakdown() {
  const navigate = useNavigate();
  const { section, subject, studentId } = useParams();
  const [quarter, setQuarter] = useState(1);
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const SUBJECT_ID = getSubjectId(subject);
  const subjectName = getSubjectName(SUBJECT_ID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const students = await getStudentData();
        const found = students.find((s) => s.student_id === parseInt(studentId));
        setStudent(found);

        const data = await getDetailedGrades(studentId, SUBJECT_ID, quarter);
        setGrades(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching breakdown:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, SUBJECT_ID, quarter]);

  // Group grades by assessment type (based on assessment_name keywords)
  const groupBy = (keyword) =>
    grades.filter((g) => g.assessment_name?.toLowerCase().includes(keyword));

  const calcAvg = (list) =>
    list.length > 0
      ? (list.reduce((s, g) => s + g.grade_value, 0) / list.length).toFixed(1)
      : "0.0";

  const quizzes = groupBy("quiz");
  const exams = groupBy("exam");
  
  // Performance tasks - check multiple keywords
  const perfTasks = grades.filter((g) => {
    const name = g.assessment_name?.toLowerCase() || "";
    return name.includes("lab") || name.includes("project") || 
           name.includes("performance") || name.includes("task");
  });
  
  // Assignments - check multiple keywords
  const assignments = grades.filter((g) => {
    const name = g.assessment_name?.toLowerCase() || "";
    return name.includes("homework") || name.includes("assignment") || 
           name.includes("seatwork");
  });

  const renderSection = (title, list) => (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ color: "#630000", marginBottom: "0.5rem", fontWeight: "700" }}>
        {title}
      </h3>
      <table className="grades-table">
        <tbody>
          {list.length > 0 ? (
            <>
              {list.map((g) => (
                <tr key={g.grade_id}>
                  <td style={{ textAlign: "left", width: "50%" }}>
                    {g.assessment_name}
                  </td>
                  <td style={{ textAlign: "center", width: "25%" }}>
                    {g.recorded_at ? new Date(g.recorded_at).toLocaleDateString() : "N/A"}
                  </td>
                  <td style={{ textAlign: "center", width: "25%", fontWeight: "600" }}>
                    {g.grade_value}
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>
                <td colSpan="2" style={{ textAlign: "right", paddingRight: "1rem" }}>
                  Subtotal:
                </td>
                <td style={{ textAlign: "center", color: "#630000" }}>
                  {calcAvg(list)}
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "#999", padding: "1rem" }}>
                No assessments recorded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

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
          <div>
            <h2 style={{ margin: 0 }}>
              Name: {student?.first_name} {student?.last_name}
            </h2>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0 0 0" }}>
              Subject: {subjectName} | Section: {section}
            </p>
          </div>
          <select 
            value={quarter} 
            onChange={(e) => setQuarter(Number(e.target.value))}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#fff7d1",
              color: "#4a0000",
              fontWeight: "600",
              fontSize: "0.95rem",
              cursor: "pointer"
            }}
          >
            <option value={1}>Q1</option>
            <option value={2}>Q2</option>
            <option value={3}>Q3</option>
            <option value={4}>Q4</option>
          </select>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {renderSection("QUIZZES", quizzes)}
          {renderSection("EXAMS", exams)}
          {renderSection("PERFORMANCE TASKS", perfTasks)}
          {renderSection("ASSIGNMENTS", assignments)}
        </div>

        <button
          onClick={() => navigate(`/teacher/grades/${section}/${subject || 'science'}`)}
          style={{
            margin: "1rem 1.5rem",
            padding: "0.6rem 1.5rem",
            backgroundColor: "#630000",
            color: "#f1c93d",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem"
          }}
        >
          Back to Grades Overview
        </button>
      </div>
    </TeacherLayout>
  );
}