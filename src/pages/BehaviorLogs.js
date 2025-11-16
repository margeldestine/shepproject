import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./BehaviorLogs.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";
import SimpleTable from "../components/SimpleTable";

export default function Behavior() {
  const navigate = useNavigate();

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  // ✅ Modal state
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { key: "date", label: "Date" },
    { key: "student", label: "Student" },
    { key: "incident", label: "Incident" },
    { key: "action", label: "Action Taken" }
  ];

  const data = [
    { date: "Sep 19, 2025", student: "Francis Abelgas", incident: "Left class without permission", action: "Counseled" },
    { date: "Sep 20, 2025", student: "Danise Bianca Catamco", incident: "Disturbing other students", action: "Warning Issued" }
  ];

  return (
    <>
    <TeacherLayout active="behavior-logs" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <div className="header-box">
            <h2>Behavior — G2 Faith</h2>
            <button onClick={() => setShowModal(true)}>Add Behavior</button>
          </div>

          <SimpleTable columns={columns} data={data} tableClassName="attendance-table" />
        </div>
      </TeacherLayout>

      {showModal && (
        <Modal
          open={showModal}
          title="Add Behavior"
          onClose={() => setShowModal(false)}
          overlayClassName="behavior-modal-overlay"
          modalClassName="behavior-modal"
          headerClassName="modal-header"
        >
          <form className="modal-form">
            <input type="date" placeholder="Date" />
            <input type="text" placeholder="Student Name" />
            <textarea placeholder="Incident"></textarea>
            <textarea placeholder="Action Taken"></textarea>

            <div className="modal-actions">
              <button type="button" className="back-btn" onClick={() => setShowModal(false)}>Back</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
