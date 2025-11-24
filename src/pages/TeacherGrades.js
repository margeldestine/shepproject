import React, { useState } from "react";
import "./TeacherGrades.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import ModalActions from "../components/ModalActions";
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
        <Modal
          open={showModal}
          title="Input Grades"
          onClose={() => setShowModal(false)}
          overlayClassName="grade-modal-overlay"
          modalClassName="grade-modal"
          headerClassName="modal-header"
        >
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
              {["Science", "Mathematics", "Reading", "Language"].map((subject) => (
                <div className="form-group" key={subject}>
                  <label>{subject}</label>
                  <input type="number" min="0" max="100" placeholder="0-100" />
                </div>
              ))}
            </div>

            <ModalActions>
              <BackButton className="back-btn" onClick={() => setShowModal(false)}>Back</BackButton>
              <button className="save-btn">Save Grades</button>
            </ModalActions>
          </div>
        </Modal>
      )}
    </>
  );
}
