import React, { useState } from "react";
import "./TeacherGrades.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import ModalActions from "../components/ModalActions";
import TeacherHeader from "../components/TeacherHeader";
import FiltersBar from "../components/FiltersBar";

export default function TeacherGrades() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

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
            <option>1st Grading</option>
            <option>2nd Grading</option>
            <option>3rd Grading</option>
            <option>4th Grading</option>
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
            <tr>
              <td>Karylle Amad</td>
              <td>95</td>
              <td>90</td>
              <td>93</td>
              <td>85</td>
              <td>91</td>
            </tr>
            <tr>
              <td>Rusty Summer Daclan</td>
              <td>95</td>
              <td>90</td>
              <td>89</td>
              <td>94</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Margel Destine Krizia Galo</td>
              <td>89</td>
              <td>93</td>
              <td>94</td>
              <td>83</td>
              <td>90</td>
            </tr>
          </tbody>
        </table>
      </div>
    </TeacherLayout>

      {}
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
                <option>Karylle Amad</option>
                <option>Rusty Summer Daclan</option>
                <option>Margel Destine Krizia Galo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Grading Period</label>
              <select>
                <option>1st Grading</option>
                <option>2nd Grading</option>
                <option>3rd Grading</option>
                <option>4th Grading</option>
              </select>
            </div>

            <div className="grades-input-grid">
              <div className="form-group">
                <label>Science</label>
                <input type="number" min="0" max="100" placeholder="0-100" />
              </div>
              <div className="form-group">
                <label>Mathematics</label>
                <input type="number" min="0" max="100" placeholder="0-100" />
              </div>
              <div className="form-group">
                <label>Reading</label>
                <input type="number" min="0" max="100" placeholder="0-100" />
              </div>
              <div className="form-group">
                <label>Language</label>
                <input type="number" min="0" max="100" placeholder="0-100" />
              </div>
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
