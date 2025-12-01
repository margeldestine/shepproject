import React, { useState } from "react";
import "../styles/TeacherGrades.css";
import "../styles/Add.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import FiltersBar from "../components/FiltersBar";
import { students, gradingPeriods } from "../data/grades";

export default function TeacherGrades() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  return (
    <>
      <TeacherLayout active="grades" containerClassName="teacher-grades-container">
        <div className="grades-container">
          <TeacherHeader
            title="Grades"
            headerClassName="grades-header header-box"
            buttonLabel="Input grades"
            onButtonClick={() => setShowModal(true)}
          />

          <FiltersBar>
            <select>
              {gradingPeriods.map((period, index) => (
                <option key={index}>{period}</option>
              ))}
            </select>
          </FiltersBar>

          <table className="grades-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Science</th>
                <th>Mathematics</th>
                <th>Reading</th>
                <th>Language</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.grades.Science}</td>
                  <td>{s.grades.Mathematics}</td>
                  <td>{s.grades.Reading}</td>
                  <td>{s.grades.Language}</td>
                  <td>{s.grades.Average}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <select>
                  <option>Select a student</option>
                  {students.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Grading Period</label>
                <select>
                  {gradingPeriods.map((period, index) => (
                    <option key={index}>{period}</option>
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
                <button className="action-btn-dark action-btn-sm">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
