import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./TeacherForms.css";
import { useNavigate } from "react-router-dom";

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
    <div className="teacher-attendance-container">
      <aside className="teacher-sidebar">
        <div className="sidebar-header">
          <h1>SHEP</h1>
          <p>Teacher Dashboard</p>
        </div>

        <div className="teacher-info">
          <div className="avatar" />
          <div>
            <p className="teacher-name">Francaryllese Dacabaleam</p>
            <p className="teacher-role">Teacher</p>
          </div>
        </div>

        <div className="sidebar-links">
          <button onClick={() => navigate("/teacher-attendance/1")}>Attendance</button>
          <button onClick={() => navigate("/teacher-grades")}>Grades</button>
          <button onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button className="active" onClick={() => navigate("/teacher-forms")}>Forms</button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

      <main className="teacher-main">
        <div
          className="top-right-actions"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button onClick={handleSettings} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}>
            <Settings size={16} />
            <span>Settings</span>
          </button>

          <button onClick={handleSignOut} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}>
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>

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
          <div className="form-modal-overlay">
            <div className="form-modal">
              <div className="modal-header">
                <h3>Create New Form</h3>
                <button className="close-modal-btn" onClick={() => setShowNewFormModal(false)}><X size={20} /></button>
              </div>
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
            </div>
          </div>
        )}

        {/* --- View Modal --- */}
        {showViewModal && (
          <div className="form-modal-overlay">
            <div className="form-modal">
              <div className="modal-header">
                <h3>View Form</h3>
                <button className="close-modal-btn" onClick={() => setShowViewModal(null)}><X size={20} /></button>
              </div>
              <div className="modal-content">
                <p><strong>Title:</strong> {showViewModal.title}</p>
                <p><strong>Category:</strong> {showViewModal.category}</p>
                <p><strong>Status:</strong> {showViewModal.status}</p>
                <p><strong>Responses:</strong> {showViewModal.responses}</p>
              </div>
            </div>
          </div>
        )}

        {/* --- Edit Modal --- */}
        {showEditModal && (
          <div className="form-modal-overlay">
            <div className="form-modal">
              <div className="modal-header">
                <h3>Edit Form</h3>
                <button className="close-modal-btn" onClick={() => setShowEditModal(null)}><X size={20} /></button>
              </div>
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
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
