import React, { useState, useEffect } from "react";
import "../styles/TeacherGrades.css";
import "../styles/Add.css";
import { useNavigate, useParams } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import FiltersBar from "../components/FiltersBar";
import DataTable from "../components/DataTable";
import { getGradesBySection, createGrade } from "../api/gradesApi";
import { getStudentData } from "../api/studentApi";
import { getAllSubjects } from "../api/subjectsApi";
import { gradingPeriods } from "../data/grades";

// Map section names to IDs (same as attendance)
const SECTION_MAP = {
  "G2Faith": 1,
  "G2Hope": 2,
  "G2Love": 3
};

export default function TeacherGrades() {
  const navigate = useNavigate();
  const { section } = useParams(); // Get section from URL
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(gradingPeriods[0]);
  const [subjectsMap, setSubjectsMap] = useState({});
  const [form, setForm] = useState({
    studentId: "",
    period: gradingPeriods[0],
    science: "",
    mathematics: "",
    reading: "",
    language: "",
  });

  useEffect(() => {
    const fetchGrades = async () => {
      if (!section) {
        setError("No section specified");
        setLoading(false);
        return;
      }

      const sectionId = SECTION_MAP[section] || parseInt(section, 10);
      if (!sectionId || Number.isNaN(sectionId)) {
        setError(`Invalid section: ${section}`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [allStudents, sectionGrades, subjects] = await Promise.all([
          getStudentData(),
          getGradesBySection(sectionId),
          getAllSubjects(),
        ]);

        const subjMap = {};
        const normalize = (v) => String(v || "").toLowerCase().trim();
        (Array.isArray(subjects) ? subjects : []).forEach((s) => {
          const rawName = s.name || s.subject_name || s.title || "";
          const n = normalize(rawName);
          const id = s.subject_id || s.id;
          if (n && id) subjMap[n] = id;
        });
        const idFor = (canon) => {
          if (subjMap[canon]) return subjMap[canon];
          const found = Object.entries(subjMap).find(([k]) => {
            if (canon === "mathematics") return k.includes("math");
            return k.includes(canon);
          });
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

  const quarterNumber = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 }[selectedPeriod] || 1;
  const subjectIdToName = (id) => {
    const entries = Object.entries(subjectsMap);
    for (const [name, subjId] of entries) {
      if (subjId === id) return name;
    }
    return null;
  };

  const rows = students.map((s) => {
    const entries = gradesData.filter((g) => (
      (g.student_id || g.studentId) === s.id &&
      parseInt(g.grading_period || g.gradingPeriod || 0, 10) === quarterNumber
    ));
    const bySubject = {};
    entries.forEach((g) => {
      const sid = g.subject_id || g.subjectId;
      const name = (g.subject_name || g.subjectName || subjectIdToName(sid) || "").toString().toLowerCase();
      const val = g.grade_value || g.gradeValue || 0;
      if (name) bySubject[name] = Number(val) || 0;
    });
    const sci = bySubject["science"] || 0;
    const math = bySubject["mathematics"] || 0;
    const read = bySubject["reading"] || 0;
    const lang = bySubject["language"] || 0;
    const avg = ((sci + math + read + lang) / 4).toFixed(2);
    return {
      student: s.name,
      science: sci,
      mathematics: math,
      reading: read,
      language: lang,
      average: avg,
    };
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGrades = async () => {
    const studentId = parseInt(form.studentId, 10);
    if (!studentId) {
      alert("Please select a student");
      return;
    }
    const periodNum = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 }[form.period] || 1;
    const payloads = [];
    const nameToId = subjectsMap;
    let invalid = false;
    const tryAdd = (key, subjName) => {
      const valStr = String(form[key] ?? "").trim();
      if (valStr === "") return;
      const num = Number(valStr);
      if (!Number.isFinite(num) || num < 0 || num > 100) {
        alert("Grade must be between 0 and 100");
        invalid = true;
        return;
      }
      const subjId = nameToId[subjName];
      const base = {
        student_id: studentId,
        grading_period: periodNum,
        grade_value: num,
      };
      if (subjId) {
        payloads.push({ ...base, subject_id: subjId });
      } else {
        payloads.push({ ...base, subject_name: subjName });
      }
    };
    tryAdd("science", "science");
    tryAdd("mathematics", "mathematics");
    tryAdd("reading", "reading");
    tryAdd("language", "language");

    if (invalid) return;

    if (payloads.length === 0) {
      alert("Enter at least one subject grade");
      return;
    }

    try {
      await Promise.all(payloads.map((p) => createGrade(p)));
      setShowModal(false);
      // Refresh
      const sectionId = SECTION_MAP[section] || parseInt(section, 10);
      const freshSection = await getGradesBySection(sectionId);
      setGradesData(Array.isArray(freshSection) ? freshSection : []);
      alert("Grades saved");
    } catch (err) {
      console.error("Failed to save grades", err);
      alert("Failed to save grades: " + (err?.message || "Unknown error"));
    }
  };

  if (loading) {
    return (
      <TeacherLayout active="grades" containerClassName="teacher-grades-container">
        <div className="grades-container">
          <p>Loading grades...</p>
        </div>
      </TeacherLayout>
    );
  }

  if (error) {
    return (
      <TeacherLayout active="grades" containerClassName="teacher-grades-container">
        <div className="grades-container">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <>
      <TeacherLayout active="grades" containerClassName="teacher-grades-container">
        <div className="grades-container">
          <TeacherHeader
            title={`Grades - ${section}`}
            headerClassName="grades-header header-box"
            buttonLabel="Input grades"
            onButtonClick={() => setShowModal(true)}
          />

          <FiltersBar>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {gradingPeriods.map((period, index) => (
                <option key={index}>{period}</option>
              ))}
            </select>
          </FiltersBar>

          <DataTable
            tableClassName="grades-table"
            columns={[
              { key: "student", label: "Student", width: "30%", align: "left" },
              { key: "science", label: "Science", width: "14%", align: "center" },
              { key: "mathematics", label: "Mathematics", width: "14%", align: "center" },
              { key: "reading", label: "Reading", width: "14%", align: "center" },
              { key: "language", label: "Language", width: "14%", align: "center" },
              { key: "average", label: "Average", width: "14%", align: "center" }
            ]}
            data={rows}
          />
        </div>
      </TeacherLayout>

      {showModal && (
        <div className="action-modal-overlay">
          <div className="action-modal">
            <div className="modal-header">
              <h3>Input Grades</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="form-group">
                <label>Student Name</label>
                <select name="studentId" value={form.studentId} onChange={handleFormChange}>
                  <option value="">Select a student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Grading Period</label>
                <select name="period" value={form.period} onChange={handleFormChange}>
                  {gradingPeriods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                  ))}
                </select>
              </div>

              <div className="grades-input-grid">
                {["Science", "Mathematics", "Reading", "Language"].map(
                  (subject) => (
                    <div className="form-group" key={subject}>
                      <label>{subject}</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0-100"
                        name={subject.toLowerCase()}
                        value={form[subject.toLowerCase()]}
                        onChange={handleFormChange}
                      />
                    </div>
                  )
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="action-btn action-btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Back
                </button>
                <button className="action-btn-dark action-btn-sm" onClick={handleSaveGrades}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
