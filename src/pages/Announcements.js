import React, { useState, useEffect } from "react";
import "../styles/Announcements.css";
import "../styles/Add.css"; // Reusable modal & buttons
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import ModalActions from "../components/ModalActions";
import BackButton from "../components/BackButton";
import AnnouncementCard from "../components/AnnouncementCard";
import { getAllCommunications, createCommunication } from "../api/communicationApi";
import { getTeacherByUserId } from "../api/teacherApi";

export default function Announcements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", details: "", eventDate: "" });
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
    const load = async () => {
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
          date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
          preview: c.description || c.content || "",
          full: c.details || c.description || "",
          teacher_id: c.teacher_id || null,
        }));
        const filtered = tId ? mapped.filter((a) => Number(a.teacher_id) === Number(tId)) : mapped;
        if (mounted) setItems(filtered);
      } catch {
        if (mounted) setItems([]);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert("Please provide title and description");
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
        date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
        preview: c.description || c.content || "",
        full: c.details || c.description || "",
        teacher_id: c.teacher_id || null,
      }));
      const filtered = teacherId ? mapped.filter((a) => Number(a.teacher_id) === Number(teacherId)) : mapped;
      setItems(filtered);
      setShowNewModal(false);
      setForm({ title: "", description: "", details: "", eventDate: "" });
      alert("Announcement created!");
    } catch (err) {
      alert("Failed to save: " + (err?.message || "Unknown error"));
    }
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    alert("Announcement saved!");
    setEditAnnouncement(null);
  };

  return (
    <TeacherLayout active="announcements" containerClassName="teacher-attendance-container">
      <div className="announcements-container">
        <AnnouncementsHeader
          title="Announcements"
          onCreateNew={() => setShowNewModal(true)}
        />

        <div className="announcements-grid">
          {items.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              onDetails={() => setSelectedAnnouncement(item)}
              onEdit={() => setEditAnnouncement(item)}
            />
          ))}
        </div>
      </div>

      {/* View Announcement */}
      {selectedAnnouncement && (
        <Modal
          open={!!selectedAnnouncement}
          title={selectedAnnouncement.title}
          onClose={() => setSelectedAnnouncement(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <p className="modal-date">{formatDate(selectedAnnouncement.date)}</p>
          <pre className="modal-details">{selectedAnnouncement.full}</pre>
        </Modal>
      )}

      {/* New Announcement */}
      {showNewModal && (
        <Modal
          open={showNewModal}
          title="New Announcement"
          onClose={() => setShowNewModal(false)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form onSubmit={handleCreateAnnouncement}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" placeholder="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" placeholder="Short description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea name="details" placeholder="Details" rows={5} value={form.details} onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}></textarea>
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="eventDate" value={form.eventDate} onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))} />
            </div>

            <div className="modal-actions modal-actions-reverse">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setShowNewModal(false)}
              >
                Back
              </button>
              <button type="submit" className="action-btn-dark action-btn-sm">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {editAnnouncement && (
        <Modal
          open={!!editAnnouncement}
          title="Edit Announcement"
          onClose={() => setEditAnnouncement(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form onSubmit={handleSaveAnnouncement}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" defaultValue={editAnnouncement.title} required />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea defaultValue={editAnnouncement.full} rows={5} required></textarea>
            </div>

            <div className="modal-actions modal-actions-reverse">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setEditAnnouncement(null)}
              >
                Back
              </button>
              <button type="submit" className="action-btn-dark action-btn-sm">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </TeacherLayout>
  );
}
