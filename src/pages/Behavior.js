  import "../styles/Behavior.css";
  import "../styles/Dashboard.css";
  import "../styles/Reminders.css";
  import shepbg from "../assets/shepbg.png";
  import { useNavigate } from "react-router-dom";
  import React, { useState, useEffect, useRef } from "react";
  import ParentTopbar from "../components/ParentTopbar";
  import ParentLayout from "../components/ParentLayout";
  import ParentHeader from "../components/ParentHeader";
  import BackButton from "../components/BackButton";
  import RemindersModal from "../components/RemindersModal";
  import AssignmentModal from "../components/AssignmentModal";
  import DetailModal from "../components/DetailModal";
  import { announcements } from "../data/announcements";
  import { behaviorCopy } from "../data/copy";
  import { parentUser } from "../data/users";
  import { useAuth } from "../context/AuthContext";
  import { getBehaviorLogsByStudent } from "../api/behaviorApi";
  import { getStudentData } from "../api/studentApi";
  import { getAllBehaviorLogs } from "../api/behaviorLogsApi";

  function Behavior() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [remindersOpen, setRemindersOpen] = useState(false);
    const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [logs, setLogs] = useState(() => {
      try {
        const cached = JSON.parse(localStorage.getItem('currentStudentLogs') || '[]');
        return Array.isArray(cached) ? cached : [];
      } catch {
        return [];
      }
    });
    const resolvedSidRef = useRef(null);

    useEffect(() => {
      let mounted = true;
      const tryFetch = async () => {
        setLoading(true);
        setError("");
        let sid = user?.studentId || user?.student_id;
        if (!sid) {
          try { const cached = localStorage.getItem('currentStudentId'); if (cached) sid = Number(cached); } catch {}
        }
        if (resolvedSidRef.current && Number(resolvedSidRef.current) === Number(sid || 0)) {
          setLoading(false);
          return;
        }
        if (!sid) {
          try {
            const list = await getStudentData();
            const fname = (user?.studentFirstName || user?.student_first_name || "").toString().trim().toLowerCase();
            const lname = (user?.studentLastName || user?.student_last_name || "").toString().trim().toLowerCase();
            const match = Array.isArray(list) ? list.find((s) => {
              const sf = String(s.first_name || s.firstName || "").trim().toLowerCase();
              const sl = String(s.last_name || s.lastName || "").trim().toLowerCase();
              return fname && lname && sf === fname && sl === lname;
            }) : null;
            if (match && (match.student_id != null || match.id != null)) {
              sid = match.student_id || match.id;
              try { localStorage.setItem('currentStudentId', String(sid)); } catch {}
            }
          } catch {}
        }
        if (!sid) {
          setLoading(false);
          return;
        }
        resolvedSidRef.current = Number(sid);
        try {
          const list = await getBehaviorLogsByStudent(Number(sid));
          if (!mounted) return;
          let mapped = Array.isArray(list)
            ? [...list]
                .sort((a, b) => {
                  const da = new Date(a.incident_date || a.date || a.recorded_at || 0).getTime();
                  const db = new Date(b.incident_date || b.date || b.recorded_at || 0).getTime();
                  return db - da;
                })
                .map((it) => ({
                  date: it.incident_date || it.date || "",
                  incident: it.description || it.incident || "",
                  teacherRemarks: it.teacherRemarks || it.remarks || it.description || "",
                  actionTaken: it.type || it.actionTaken || it.action || "",
                }))
            : [];
          if (mapped.length === 0) {
            const all = await getAllBehaviorLogs();
            const fname = (user?.studentFirstName || user?.student_first_name || "").toString().trim().toLowerCase();
            const lname = (user?.studentLastName || user?.student_last_name || "").toString().trim().toLowerCase();
            const filtered = Array.isArray(all)
              ? all.filter((it) => {
                  const idMatch = Number(it.student_id || it.studentId) === Number(sid);
                  const sf = String(it?.student?.first_name || it?.studentFirstName || "").trim().toLowerCase();
                  const sl = String(it?.student?.last_name || it?.studentLastName || "").trim().toLowerCase();
                  const nameMatch = fname && lname && sf === fname && sl === lname;
                  return idMatch || nameMatch;
                })
              : [];
            mapped = filtered
              .sort((a, b) => {
                const da = new Date(a.incident_date || a.date || a.recorded_at || 0).getTime();
                const db = new Date(b.incident_date || b.date || b.recorded_at || 0).getTime();
                return db - da;
              })
              .map((it) => ({
                date: it.incident_date || it.date || "",
                incident: it.description || it.incident || "",
                teacherRemarks: it.teacherRemarks || it.remarks || it.description || "",
                actionTaken: it.type || it.actionTaken || it.action || "",
              }));
          }
          setLogs(mapped);
          try { localStorage.setItem('currentStudentLogs', JSON.stringify(mapped)); } catch {}
          setLoading(false);
        } catch (e) {
          if (!mounted) return;
          setError(e?.message || "Failed to load behavior logs");
          setLoading(false);
        }
      };
      tryFetch();
      return () => { mounted = false; };
    }, [user?.studentId, user?.student_id]);

    const openAssignmentDetails = (assignment) => {
      setSelectedAssignment(assignment);
      setAssignmentModalOpen(true);
    };

    const openDetailModal = (item) => {
      setSelectedDetail(item);
      setDetailModalOpen(true);
    };

    const handleSignOut = () => {
      navigate("/");
    };

    const handleSettings = () => {
      navigate("/settings");
    };

    return (
      <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
        <div className="dash-overlay" />

        <ParentTopbar
          userName={parentUser.name}
          showReminders
          onOpenReminders={() => setRemindersOpen(true)}
          onSignOut={handleSignOut}
          onSettings={handleSettings}
        />
        <ParentLayout
          active="behavior"
          panelClassName="behavior-panel"
          contentClassName="behavior-content-enter"
        >
          <div className="record-shell">
            <ParentHeader
              title={behaviorCopy.headerTitle}
              headerClassName="parent-section-header"
            />

            {loading && (
              <div className="record-card">
                <div className="record-body">Loading behavior logs...</div>
              </div>
            )}
            {!loading && error && (
              <div className="record-card">
                <div className="record-body">{error}</div>
              </div>
            )}
            {!loading && !error && logs.length === 0 && (
              <div className="record-card">
                <div className="record-body">No behavior logs yet.</div>
              </div>
            )}
            {!loading && !error && logs.length > 0 && (
              <>
                {logs.map((record, idx) => (
                  <div key={idx} className="record-card">
                    <div className="record-title">{record.date}</div>
                    <div className="record-meta">Incident: {record.incident}</div>
                    <div className="record-body">
                      <p>Teacher's remarks: {record.teacherRemarks}</p>
                      <p>Action: {record.actionTaken}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            <BackButton onClick={() => navigate("/dashboard")} />
          </div>
        </ParentLayout>

        {remindersOpen && (
          <RemindersModal
            open={remindersOpen}
            onClose={() => setRemindersOpen(false)}
            onOpenAssignmentDetails={openAssignmentDetails}
            onOpenDetail={openDetailModal}
            announcements={announcements}
          />
        )}

        {assignmentModalOpen && selectedAssignment && (
          <AssignmentModal
            open={assignmentModalOpen}
            assignment={selectedAssignment}
            onClose={() => setAssignmentModalOpen(false)}
          />
        )}

        {detailModalOpen && selectedDetail && (
          <DetailModal
            open={detailModalOpen}
            detail={selectedDetail}
            onClose={() => setDetailModalOpen(false)}
          />
        )}
      </div>
    );
  }

  export default Behavior;
