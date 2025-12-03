import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/ClassAnnouncements.css";
import "../styles/BehaviorLogs.css";
import "../styles/Add.css"; 
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import AnnouncementsHeader from "../components/AnnouncementsHeader";
import Modal from "../components/Modal";
import { getAllCommunications, createCommunication } from "../api/communicationApi";
import { getTeacherByUserId } from "../api/teacherApi";

export default function ClassAnnouncements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [teacherId, setTeacherId] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
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
        description: c.description || c.content || "",
        details: c.details || "",
        date: c.event_date || c.eventDate || c.posted_At || c.posted_at || "",
        teacher_id: c.teacher_id || null,
      }));
      const filtered = teacherId ? mapped.filter((a) => Number(a.teacher_id) === Number(teacherId)) : mapped;
      setAnnouncements(filtered);
      setShowNewAnnouncement(false);
      setForm({ title: "", description: "", details: "", eventDate: "" });
      alert("Announcement saved");
    } catch (e) {
      alert("Failed to save: " + (e?.message || "Unknown error"));
    }
  };

  return (
    <TeacherLayout
      active="class-announcements"
      containerClassName="teacher-attendance-container"
    >
      <div className="announcements-container">
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
              <button
                className="read-more-btn"
                onClick={() => setSelectedAnnouncement(item)}
              >
                Read More
              </button>
            </div>
          ))}
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
    </TeacherLayout>
  );
}
