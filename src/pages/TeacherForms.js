import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./TeacherForms.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";

export default function TeacherForms() {
  const navigate = useNavigate();

  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null); // store row data
  const [showEditModal, setShowEditModal] = useState(null); // store row data

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  const forms = [
    { title: "Parent-Teacher Meeting Form", category: "Meeting", status: "Active", responses: 12 },
    { title: "Student Progress Report", category: "Report", status: "Closed", responses: 30 },
    { title: "Behavior Evaluation Form", category: "Behavior", status: "Active", responses: 15 },
    { title: "Learning Materials Request", category: "Request", status: "Pending", responses: 8 },
    { title: "Classroom Observation Form", category: "Observation", status: "Active", responses: 20 },
  ];

  return (
    <TeacherLayout active="forms" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <div className="header-box">
            <h2>Teacher Forms — G2 Faith</h2>
            <button onClick={() => setShowNewFormModal(true)}>Create New Form</button>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Form Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Responses</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((f, i) => (
                <tr key={i}>
                  <td>{f.title}</td>
                  <td>{f.category}</td>
                  <td>{f.status}</td>
                  <td>{f.responses}</td>
                  <td>
                    <button className="view-btn" onClick={() => setShowViewModal(f)}>View</button>
                    <button className="edit-btn" onClick={() => setShowEditModal(f)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- New Form Modal --- */}
        {showNewFormModal && (
          <Modal
            open={showNewFormModal}
            title="Create New Form"
            onClose={() => setShowNewFormModal(false)}
            overlayClassName="form-modal-overlay"
            modalClassName="form-modal"
            headerClassName="modal-header"
          >
            <div className="modal-content">
              <label>Title</label>
              <input type="text" placeholder="Form title" />
              <label>Category</label>
              <input type="text" placeholder="Category" />
              <label>Status</label>
              <input type="text" placeholder="Status" />
              <div className="modal-actions">
                <button className="back-btn" onClick={() => setShowNewFormModal(false)}>Cancel</button>
                <button className="save-btn">Save</button>
              </div>
            </div>
          </Modal>
        )}

        {/* --- View Modal --- */}
        {showViewModal && (
          <Modal
            open={!!showViewModal}
            title="View Form"
            onClose={() => setShowViewModal(null)}
            overlayClassName="form-modal-overlay"
            modalClassName="form-modal"
            headerClassName="modal-header"
          >
            <div className="modal-content">
              <p><strong>Title:</strong> {showViewModal.title}</p>
              <p><strong>Category:</strong> {showViewModal.category}</p>
              <p><strong>Status:</strong> {showViewModal.status}</p>
              <p><strong>Responses:</strong> {showViewModal.responses}</p>
            </div>
          </Modal>
        )}

        {/* --- Edit Modal --- */}
        {showEditModal && (
          <Modal
            open={!!showEditModal}
            title="Edit Form"
            onClose={() => setShowEditModal(null)}
            overlayClassName="form-modal-overlay"
            modalClassName="form-modal"
            headerClassName="modal-header"
          >
            <div className="modal-content">
              <label>Title</label>
              <input type="text" defaultValue={showEditModal.title} />
              <label>Category</label>
              <input type="text" defaultValue={showEditModal.category} />
              <label>Status</label>
              <input type="text" defaultValue={showEditModal.status} />
              <div className="modal-actions">
                <button className="back-btn" onClick={() => setShowEditModal(null)}>Cancel</button>
                <button className="save-btn">Save</button>
              </div>
            </div>
          </Modal>
        )}

    </TeacherLayout>
  );
}
