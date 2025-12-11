import React, { useState, useEffect } from "react";
import "../styles/TeacherGrades.css";
import "../styles/Add.css";
import { useNavigate, useParams } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import FiltersBar from "../components/FiltersBar";
import DataTable from "../components/DataTable";
import GradeBreakdown from "../components/GradeBreakdown";
import { createGrade, getGradesBySection, updateGrade, deleteGrade, getAllGrades } from "../api/gradesApi";
import { getAllSubjects } from "../api/subjectsApi";
import { getStudentData } from "../api/studentApi";
import { subjects, sections } from "../data/teacherDashboard";
import { gradingPeriods } from "../data/grades";

// Map section names to IDs (same as attendance)
const getSectionId = (param) => {
  const p = (param || "").toLowerCase();
  if (p.includes("faith")) return 1;
  if (p.includes("hope")) return 2;
  if (p.includes("love")) return 3;
  return parseInt(param, 10) || 1;
};

export default function TeacherGrades() {
  const navigate = useNavigate();
  const { section } = useParams(); // e.g. "G2Faith" or "G2FaithMath"
  
  // Determine Subject and Display Name from the URL param using the dashboard data
  const currentSectionMeta = sections
    .flatMap(s => s.list.map(l => ({ ...l, subjectName: s.subject })))
    .find(l => l.id === section);

  const subjectName = currentSectionMeta ? currentSectionMeta.subjectName : "Science";
  const displaySectionName = currentSectionMeta ? currentSectionMeta.name : section;

  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectsMap, setSubjectsMap] = useState({});
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [breakdownData, setBreakdownData] = useState(null);
  
  const [form, setForm] = useState({
    studentId: "",
    period: gradingPeriods[0],
    gradeValue: "",
  });

  useEffect(() => {
    const fetchGrades = async () => {
      if (!section) {
        setError("No section specified");
        setLoading(false);
        return;
      }

      const sectionId = getSectionId(section);
      
      try {
        setLoading(true);
        const [allStudents, sectionGrades, allSubjects] = await Promise.all([
          getStudentData(),
          getAllGrades(),
          getAllSubjects(),
        ]);

        // Build Subject Map
        const subjMap = {};
        const normalize = (v) => String(v || "").toLowerCase().trim();
        (Array.isArray(allSubjects) ? allSubjects : []).forEach((s) => {
          const rawName = s.name || s.subject_name || s.title || "";
          const n = normalize(rawName);
          const id = s.subject_id || s.id;
          if (n && id) subjMap[n] = id;
        });
        
        // Ensure standard subjects exist
        const idFor = (canon) => {
          if (subjMap[canon]) return subjMap[canon];
          const found = Object.entries(subjMap).find(([k]) => k.includes(canon));
          return found ? found[1] : undefined;
        };
        subjMap["science"] = idFor("science") || subjMap["science"] || 1;
        subjMap["mathematics"] = idFor("mathematics") || subjMap["mathematics"] || 2;
        subjMap["reading"] = idFor("reading") || subjMap["reading"] || 3;
        subjMap["language"] = idFor("language") || subjMap["language"] || 4;
        setSubjectsMap(subjMap);

        const sectionStudents = (Array.isArray(allStudents) ? allStudents : [])
          .filter((s) => Number(s.section_id || s.sectionId) === Number(sectionId))
          .map((s) => ({
            id: s.student_id,
            name: `${s.first_name} ${s.last_name}`,
          }));
        
        setStudents(sectionStudents);
        setGradesData(Array.isArray(sectionGrades) ? sectionGrades : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching grades:", err);
        setError("Failed to load grades");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [section]);

  const subjectIdToName = (id) => {
    const entries = Object.entries(subjectsMap);
    for (const [name, subjId] of entries) {
      if (subjId === id) return name;
    }
    return null;
  };

  // Filter grades for the CURRENT SUBJECT only
  const currentSubjectKey = subjectName.toLowerCase();
  const currentSubjectId = subjectsMap[currentSubjectKey];

  const handleGradeClick = async (studentId, studentName, quarter) => {
    if (!quarter) return;

    let sourceGrades = gradesData;

    try {
      // Fetch fresh grades to ensure persistence
      const freshGrades = await getAllGrades();
      if (Array.isArray(freshGrades)) {
        setGradesData(freshGrades);
        sourceGrades = freshGrades;
      }
    } catch (err) {
      console.error("Failed to refresh grades before opening breakdown:", err);
    }

    // Filter grades for this student and the current subject
    const studentGrades = sourceGrades.filter((g) => {
      const gSid = g.student_id || g.studentId;
      const gSubjId = g.subject_id || g.subjectId;
      const gSubjName = (g.subject_name || g.subjectName || subjectIdToName(gSubjId) || "").toString().toLowerCase();
      
      // Match Student
      if (gSid !== studentId) return false;

      // Match Subject (by ID or Name)
      if (currentSubjectId && Number(gSubjId) === Number(currentSubjectId)) return true;
      // Strict name match fallback
      if (gSubjName === currentSubjectKey) return true;
      
      return false;
    });

    setBreakdownData({ 
      studentId, 
      studentName, 
      subjectId: currentSubjectId, 
      subjectName: subjectName, 
      sectionName: displaySectionName, 
      quarter,
      existingGrades: studentGrades
    });
    setShowBreakdown(true);
  };

  const rows = React.useMemo(() => students.map((s) => {
    // Filter grades for this student and the current subject
    const studentGrades = gradesData.filter((g) => {
      const gSid = g.student_id || g.studentId;
      const gSubjId = g.subject_id || g.subjectId;
      const gSubjName = (g.subject_name || g.subjectName || subjectIdToName(gSubjId) || "").toString().toLowerCase();
      
      // Match Student
      if (gSid !== s.id) return false;

      // Match Subject (by ID or Name)
      if (currentSubjectId && Number(gSubjId) === Number(currentSubjectId)) return true;
      // Strict name match fallback
      if (gSubjName === currentSubjectKey) return true;
      
      return false;
    });

    const getGrade = (q) => {
      const quarterGrades = studentGrades.filter(g => 
        parseInt(g.grading_period || g.gradingPeriod || 0, 10) === q 
      );
      
      if (quarterGrades.length === 0) return null;

      const cats = { QUIZZES: [], EXAMS: [], PERFORMANCE: [], ASSIGNMENTS: [] };
      
      quarterGrades.forEach(g => {
        let name = (g.assessment_name || g.assessmentName || g.name || g.title || g.description || "").toString();
        // Try to use explicit category field if available
        let category = g.category || g.type || null;
        
        // If not found, deduce from name
        if (!category) {
            if (name.startsWith('[QUIZ]')) category = 'QUIZZES';
            else if (name.startsWith('[EXAM]')) category = 'EXAMS';
            else if (name.startsWith('[PERF]')) category = 'PERFORMANCE';
            else if (name.startsWith('[ASG]')) category = 'ASSIGNMENTS';
            else {
                 const lowerName = name.toLowerCase();
                 if (lowerName.includes('quiz')) category = 'QUIZZES';
                 else if (lowerName.includes('exam')) category = 'EXAMS';
                 else if (lowerName.includes('task') || lowerName.includes('project') || lowerName.includes('lab') || lowerName.includes('report') || lowerName.includes('performance')) category = 'PERFORMANCE';
                 else if (lowerName.includes('assignment') || lowerName.includes('homework')) category = 'ASSIGNMENTS';
            }
        }
        
        if (category && cats[category]) {
            cats[category].push({
                score: parseFloat(g.grade_value || g.gradeValue) || 0,
                max: parseFloat(g.max_score || g.maxScore) || 100
            });
        }
      });

      let totalWeighted = 0;
      const weights = { QUIZZES: 0.3, EXAMS: 0.3, PERFORMANCE: 0.3, ASSIGNMENTS: 0.1 };

      Object.keys(cats).forEach(key => {
        const items = cats[key];
        if (items.length > 0) {
            // Step 1: Calculate the category average (Sum of all items / Number of items)
            const totalScore = items.reduce((a, b) => a + b.score, 0);
            const rawAvg = totalScore / items.length;
            
            // Match GradeBreakdown rounding logic (1 decimal place)
            const categoryAvg = parseFloat(rawAvg.toFixed(1));

            // Step 2: Multiply by the category weight
            totalWeighted += categoryAvg * weights[key];
        }
      });

      return Math.round(totalWeighted);
    };

    const q1 = getGrade(1);
    const q2 = getGrade(2);
    const q3 = getGrade(3);
    const q4 = getGrade(4);

    // Calculate Final (Average of all quarters, missing treated as 0)
    const q1Num = Number.isFinite(q1) ? q1 : 0;
    const q2Num = Number.isFinite(q2) ? q2 : 0;
    const q3Num = Number.isFinite(q3) ? q3 : 0;
    const q4Num = Number.isFinite(q4) ? q4 : 0;
    const final = Math.round((q1Num + q2Num + q3Num + q4Num) / 4);


    return {
      id: s.id,
      student: s.name,
      q1: q1 != null ? q1 : "",
      q2: q2 != null ? q2 : "",
      q3: q3 != null ? q3 : "",
      q4: q4 != null ? q4 : "",
      final: final
    };
  }), [students, gradesData, currentSubjectId, currentSubjectKey]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGrade = async () => {
    // Logic moved to Breakdown component
  };

  if (loading) {
    return (
    <TeacherLayout active="grades" containerClassName="teacher-grades-container" showBackButton={true}>
      <div className="grades-container">
          <p>Loading grades...</p>
        </div>
      </TeacherLayout>
    );
  }

  if (error) {
    return (
      <TeacherLayout active="grades" containerClassName="teacher-grades-container" showBackButton={true}>
        <div className="grades-container">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </TeacherLayout>
    );
  }

  if (showBreakdown && breakdownData) {
    return (
      <TeacherLayout active="grades" containerClassName="teacher-grades-container" showBackButton={true}>
        <GradeBreakdown
          studentId={breakdownData.studentId}
          studentName={breakdownData.studentName}
          subjectId={breakdownData.subjectId}
          subjectName={breakdownData.subjectName}
          sectionName={breakdownData.sectionName}
          quarter={breakdownData.quarter}
          savedGrades={breakdownData.existingGrades}
          onClose={async () => {
            setShowBreakdown(false);
            try {
              const freshGrades = await getAllGrades();
              if (Array.isArray(freshGrades)) setGradesData(freshGrades);
            } catch (e) { console.error("Failed to refresh grades", e); }
          }}
          onQuarterChange={(q) => setBreakdownData(prev => ({ ...prev, quarter: q }))}
        />
      </TeacherLayout>
    );
  }

  return (
    <>
      <TeacherLayout active="grades" containerClassName="teacher-grades-container" showBackButton={true}>
        <div className="grades-container">
          <TeacherHeader
            title={`${subjectName} - ${displaySectionName}`}
            headerClassName="grades-header header-box"
          />

          <DataTable
            tableClassName="grades-table"
            onRowClick={(row) => handleGradeClick(row.id, row.student, 1)}
            columns={[
              { key: "student", label: "Student", width: "30%", align: "left" },
              { 
                key: "q1", 
                label: "Q1", 
                width: "14%", 
                align: "center",
                render: (row) => (
                  <span 
                    style={{ cursor: 'pointer', color: '#6f0d0d', fontWeight: 'bold' }}
                    onClick={(e) => { e.stopPropagation(); handleGradeClick(row.id, row.student, 1); }}
                  >
                    {row.q1}
                  </span>
                )
              },
              { 
                key: "q2", 
                label: "Q2", 
                width: "14%", 
                align: "center",
                render: (row) => (
                  <span 
                    style={{ cursor: 'pointer', color: '#6f0d0d', fontWeight: 'bold' }}
                    onClick={(e) => { e.stopPropagation(); handleGradeClick(row.id, row.student, 2); }}
                  >
                    {row.q2}
                  </span>
                )
              },
              { 
                key: "q3", 
                label: "Q3", 
                width: "14%", 
                align: "center",
                render: (row) => (
                  <span 
                    style={{ cursor: 'pointer', color: '#6f0d0d', fontWeight: 'bold' }}
                    onClick={(e) => { e.stopPropagation(); handleGradeClick(row.id, row.student, 3); }}
                  >
                    {row.q3}
                  </span>
                )
              },
              { 
                key: "q4", 
                label: "Q4", 
                width: "14%", 
                align: "center",
                render: (row) => (
                  <span 
                    style={{ cursor: 'pointer', color: '#6f0d0d', fontWeight: 'bold' }}
                    onClick={(e) => { e.stopPropagation(); handleGradeClick(row.id, row.student, 4); }}
                  >
                    {row.q4}
                  </span>
                )
              },
              { key: "final", label: "Final", width: "14%", align: "center", render: (row) => <strong>{row.final}</strong> }
            ]}
            data={rows}
          />
        </div>
      </TeacherLayout>
    </>
  );
}
