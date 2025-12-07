import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/ClassAnnouncements.css";
import "../styles/BehaviorLogs.css";
import "../styles/Add.css"; 
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import { getAllCommunications, createCommunication, updateCommunication, deleteCommunication } from "../api/communicationApi";
import { getTeacherByUserId } from "../api/teacherApi";

export default function ClassAnnouncements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [teacherId, setTeacherId] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", details: "", eventDate: "" });
  const [editForm, setEditForm] = useState({ id: null, title: "", description: "", details: "", eventDate: "" });
  const [showEditAnnouncement, setShowEditAnnouncement] = useState(false);
  const [confirmDeleteAnnouncement, setConfirmDeleteAnnouncement] = useState(null);
  const [notice, setNotice] = useState({ text: "", type: "" });
  useEffect(() => {
    if (notice.text && notice.type === 'success') {
      const t = setTimeout(() => setNotice({ text: "", type: "" }), 2000);
      return () => clearTimeout(t);
    }
  }, [notice.text, notice.type]);
  const formatDate = (value) => {
    if (!value) return "";
    const s = typeof value === "string" ? value : String(value);
    const iso = s.includes(" ") && !s.includes("T") ? s.replace(" ", "T") : s;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return s;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  useEffect(() => {
    let mounted = true;
    const fetchInitial = async () => {
      try {
        let tId = null;
        try {
          const userId = parseInt(localStorage.getItem("userId") || "0", 10);
          if (userId) {
            const teacher = await getTeacherByUserId(userId);
            tId = teacher?.teacher_id || null;
          }
        } catch {}
        if (mounted) setTeacherId(tId);
        const list = await getAllCommunications();
        const mapped = (Array.isArray(list) ? list : []).map((c) => ({
          id: c.communication_id || c.id,
          title: c.title || "",
          description: c.description || c.content || "",
          details: c.details || "",
          date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
          teacher_id: c.teacher_id || null,
        }));
        const filtered = tId ? mapped.filter((a) => Number(a.teacher_id) === Number(tId)) : mapped;
        if (mounted) setAnnouncements(filtered);
      } catch {
        if (mounted) setAnnouncements([]);
      }
    };
    fetchInitial();
    return () => { mounted = false; };
  }, []);

  const handleSaveNewAnnouncement = async () => {
    if (!form.title || !form.description) {
      setNotice({ text: "Please provide title and description", type: "error" });
      return;
    }
    try {
      const payload = {
        teacher_id: teacherId || 0,
        title: form.title,
        description: form.description,
        details: form.details,
        event_date: form.eventDate ? form.eventDate + " 00:00:00" : "",
      };
      await createCommunication(payload);
      const list = await getAllCommunications();
      const mapped = (Array.isArray(list) ? list : []).map((c) => ({
        id: c.communication_id || c.id,
        title: c.title || "",
        description: c.description || c.content || "",
        details: c.details || "",
        date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
        teacher_id: c.teacher_id || null,
      }));
      const filtered = teacherId ? mapped.filter((a) => Number(a.teacher_id) === Number(teacherId)) : mapped;
      setAnnouncements(filtered);
      setShowNewAnnouncement(false);
      setForm({ title: "", description: "", details: "", eventDate: "" });
      setNotice({ text: "Announcement saved", type: "success" });
    } catch (e) {
      setNotice({ text: "Failed to save: " + (e?.message || "Unknown error"), type: "error" });
    }
  };

  const openEditAnnouncement = (item) => {
    setEditForm({
      id: item.id,
      title: item.title || "",
      description: item.description || "",
      details: item.details || "",
      eventDate: item.date ? String(item.date).slice(0, 10) : "",
    });
    setShowEditAnnouncement(true);
  };

  const handleUpdateAnnouncement = async () => {
    if (!editForm.id) return;
    if (!editForm.title || !editForm.description) {
      setNotice({ text: "Please provide title and description", type: "error" });
      return;
    }
    try {
      const payload = {
        teacher_id: teacherId || 0,
        title: editForm.title,
        description: editForm.description,
        details: editForm.details,
        event_date: editForm.eventDate ? editForm.eventDate + " 00:00:00" : "",
      };
      await updateCommunication(editForm.id, payload);
      const list = await getAllCommunications();
      const mapped = (Array.isArray(list) ? list : []).map((c) => ({
        id: c.communication_id || c.id,
        title: c.title || "",
        description: c.description || c.content || "",
        details: c.details || "",
        date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
        teacher_id: c.teacher_id || null,
      }));
      const filtered = teacherId ? mapped.filter((a) => Number(a.teacher_id) === Number(teacherId)) : mapped;
      setAnnouncements(filtered);
      setShowEditAnnouncement(false);
      setNotice({ text: "Announcement updated", type: "success" });
    } catch (e) {
      setNotice({ text: "Failed to update: " + (e?.message || "Unknown error"), type: "error" });
    }
  };

  const performDeleteAnnouncement = async () => {
    const item = confirmDeleteAnnouncement;
    if (!item) return;
    try {
      await deleteCommunication(item.id);
      const list = await getAllCommunications();
      const mapped = (Array.isArray(list) ? list : []).map((c) => ({
        id: c.communication_id || c.id,
        title: c.title || "",
        description: c.description || c.content || "",
        details: c.details || "",
        date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
        teacher_id: c.teacher_id || null,
      }));
      const filtered = teacherId ? mapped.filter((a) => Number(a.teacher_id) === Number(teacherId)) : mapped;
      setAnnouncements(filtered);
      setConfirmDeleteAnnouncement(null);
      setNotice({ text: "Announcement deleted", type: "success" });
    } catch (e) {
      setNotice({ text: "Failed to delete: " + (e?.message || "Unknown error"), type: "error" });
    }
  };

  return (
    <TeacherLayout
      active="class-announcements"
      containerClassName="teacher-attendance-container"
      showBackButton={true}
    >
      <div className="announcements-shell">
        <div className="announcements-container">
          {notice.text && (
            <div className={`notice-bar ${notice.type === 'error' ? 'notice-error' : notice.type === 'success' ? 'notice-success' : ''}`}>
              {notice.text}
            </div>
          )}
          <AnnouncementsHeader
            title="Class Specific Announcements"
            onCreateNew={() => setShowNewAnnouncement(true)}
          />

          <div className="announcements-grid">
            {announcements.map((item) => (
              <div className="announcement-card" key={item.id}>
                <div className="announcement-header">
                  <h3>{item.title}</h3>
                  <span className="announcement-date">{formatDate(item.date)}</span>
                </div>
                <p className="announcement-desc">{item.description}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="read-more-btn" onClick={() => setSelectedAnnouncement(item)}>Read More</button>
                  <button className="read-more-btn" onClick={() => openEditAnnouncement(item)}>Edit</button>
                  <button className="read-more-btn" onClick={() => setConfirmDeleteAnnouncement(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedAnnouncement && (
        <Modal
          open={!!selectedAnnouncement}
          title={selectedAnnouncement.title}
          onClose={() => setSelectedAnnouncement(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
          closeIcon={<X size={20} />}
          closeOnOverlayClick={false}
        >
          <p className="modal-date">{formatDate(selectedAnnouncement.date)}</p>
          <pre className="modal-details">{selectedAnnouncement.details || selectedAnnouncement.description}</pre>
        </Modal>
      )}


      {showNewAnnouncement && (
        <Modal
          open={showNewAnnouncement}
          title="New Announcement"
          onClose={() => setShowNewAnnouncement(false)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
          closeIcon={<X size={20} />}
          closeOnOverlayClick={false}
        >
          <div className="modal-content">
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" placeholder="Enter announcement title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" placeholder="Enter short description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea name="details" placeholder="Enter full details" rows={6} value={form.details} onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}></textarea>
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="eventDate" value={form.eventDate} onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))} />
            </div>

          <div className="modal-actions modal-actions-reverse">
            <button
              className="action-btn action-btn-sm"
              onClick={() => setShowNewAnnouncement(false)}
            >
              Back
            </button>
            <button
              className="action-btn-dark action-btn-sm"
              onClick={handleSaveNewAnnouncement}
            >
              Save
            </button>
          </div>
          </div>
        </Modal>
      )}

      {showEditAnnouncement && (
        <Modal
          open={showEditAnnouncement}
          title="Edit Announcement"
          onClose={() => setShowEditAnnouncement(false)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
          closeIcon={<X size={20} />}
          closeOnOverlayClick={false}
        >
          <div className="modal-content">
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" placeholder="Enter announcement title" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" placeholder="Enter short description" value={editForm.description} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea name="details" placeholder="Enter full details" rows={6} value={editForm.details} onChange={(e) => setEditForm((p) => ({ ...p, details: e.target.value }))}></textarea>
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="eventDate" value={editForm.eventDate} onChange={(e) => setEditForm((p) => ({ ...p, eventDate: e.target.value }))} />
            </div>

            <div className="modal-actions modal-actions-reverse">
              <button className="action-btn action-btn-sm" onClick={() => setShowEditAnnouncement(false)}>Back</button>
              <button className="action-btn-dark action-btn-sm" onClick={handleUpdateAnnouncement}>Save</button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDeleteAnnouncement && (
        <Modal
          open={!!confirmDeleteAnnouncement}
          title="Delete Announcement"
          onClose={() => setConfirmDeleteAnnouncement(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <div className="modal-content">
            <p>Are you sure you want to delete this announcement?</p>
            <div className="modal-actions">
              <button className="action-btn action-btn-sm" onClick={() => setConfirmDeleteAnnouncement(null)}>Back</button>
              <button className="action-btn-dark action-btn-sm" onClick={performDeleteAnnouncement}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </TeacherLayout>
  );
}
