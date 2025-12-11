import "../styles/Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Attendance.css";
import "../styles/Reminders.css";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import ParentHeader from "../components/ParentHeader";
import BackButton from "../components/BackButton";
import RemindersModal from "../components/RemindersModal";
import AssignmentModal from "../components/AssignmentModal";
import DetailModal from "../components/DetailModal";
import { announcements } from "../data/announcements";
import { parentUser } from "../data/users";
import { attendanceCopy } from "../data/parentAttendance";
import presentIcon from "../assets/present.png";
import { getParentByUserId } from "../api/parentApi";
import { getAttendanceByStudent, getAttendanceByStudentAndDate } from "../api/attendanceApi";

function Attendance() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentId, setStudentId] = useState(null);
  const today = useMemo(() => new Date(), []);
  const pad = (n) => String(n).padStart(2, '0');
  const toYMD = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState(toYMD(today.getFullYear(), today.getMonth(), today.getDate()));
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const bcRef = useRef(null);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  const openAssignmentDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentModalOpen(true);
  };

  const openDetailModal = (item) => {
    setSelectedDetail(item);
    setDetailModalOpen(true);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const uid = localStorage.getItem("userId");
        if (!uid) {
          setError("Please log in to view attendance");
          setLoading(false);
          return;
        }
        const parent = await getParentByUserId(parseInt(uid, 10));
        const sid = parent?.student_id || parent?.studentId;
        if (!sid) {
          setError("No student linked to this parent account");
          setLoading(false);
          return;
        }
        if (mounted) setStudentId(Number(sid));
      } catch (e) {
        setError(e?.message || "Failed to load parent/student link");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!studentId) return;
      try {
        setLoading(true);
        setError("");
        console.log('[ATT] Fetching all attendance for studentId:', studentId);
        const all = await getAttendanceByStudent(studentId);
        if (!mounted) return;
        setAttendanceRecords(Array.isArray(all) ? all : []);
        console.log('[ATT] Fetching attendance by date:', { studentId, selectedDateStr });
        const dayRecords = await getAttendanceByStudentAndDate(studentId, selectedDateStr);
        console.log('[ATT] API returned dayRecords:', dayRecords, 'type:', typeof dayRecords, 'isArray:', Array.isArray(dayRecords));
        if (!mounted) return;
        let rec = Array.isArray(dayRecords) ? (dayRecords[0] || null) : (dayRecords || null);
        if (!rec) {
          // Fallback: try to match from all records by normalized date
          const match = (Array.isArray(all) ? all : []).find((r) => normalizeDateStr(r) === selectedDateStr);
          if (match) {
            console.log('[ATT] Fallback matched record from all by date:', match);
            rec = match;
          } else {
            console.log('[ATT] No record found for selected date');
          }
        }
        console.log('[ATT] Setting currentAttendance to:', rec);
        setCurrentAttendance(rec || null);
      } catch (e) {
        setError(e?.message || "Failed to load attendance");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [studentId, selectedDateStr]);

  useEffect(() => {
    bcRef.current = new BroadcastChannel('attendance-updates');
    const onMsg = async (ev) => {
      const ids = ev?.data?.studentIds || [];
      const msgDate = ev?.data?.date;
      if (!Array.isArray(ids) || ids.length === 0) return;
      if (studentId && ids.some((id) => Number(id) === Number(studentId))) {
        try {
          setLoading(true);
          setError("");
          console.log('[ATT-BC] Broadcast update for studentId:', studentId, 'msgDate:', msgDate);
          const all = await getAttendanceByStudent(studentId);
          setAttendanceRecords(Array.isArray(all) ? all : []);
          const useDate = msgDate || selectedDateStr;
          const dayRecords = await getAttendanceByStudentAndDate(studentId, useDate);
          console.log('[ATT-BC] API returned dayRecords:', dayRecords);
          let rec = Array.isArray(dayRecords) ? (dayRecords[0] || null) : (dayRecords || null);
          if (!rec) {
            const match = (Array.isArray(all) ? all : []).find((r) => normalizeDateStr(r) === useDate);
            if (match) {
              console.log('[ATT-BC] Fallback matched record from all by date:', match);
              rec = match;
            }
          }
          console.log('[ATT-BC] Setting currentAttendance to:', rec);
          setCurrentAttendance(rec || null);
        } catch (e) {
          setError(e?.message || "Failed to load attendance");
        } finally {
          setLoading(false);
        }
      }
    };
    bcRef.current.addEventListener('message', onMsg);
    return () => {
      try { bcRef.current && bcRef.current.removeEventListener('message', onMsg); } catch {}
      try { bcRef.current && bcRef.current.close(); } catch {}
    };
  }, [studentId, selectedDateStr]);

  const monthLabel = useMemo(() => {
    const d = new Date(currentYear, currentMonth, 1);
    return d.toLocaleString(undefined, { month: "long", year: "numeric" });
  }, [currentYear, currentMonth]);

  const getDaysInMonth = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (y, m) => {
    return new Date(y, m, 1).getDay();
  };
  const daysArray = useMemo(() => {
    const days = getDaysInMonth(currentYear, currentMonth);
    const offset = getFirstDayOfMonth(currentYear, currentMonth);
    const arr = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= days; d++) arr.push(d);
    return arr;
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    const m = currentMonth - 1;
    const nextMonth = m < 0 ? 11 : m;
    const nextYear = m < 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    const selectedDay = parseInt(selectedDateStr.split('-')[2], 10);
    const maxDay = getDaysInMonth(nextYear, nextMonth);
    setSelectedDateStr(toYMD(nextYear, nextMonth, Math.min(selectedDay, maxDay)));
  };
  const handleNextMonth = () => {
    const m = currentMonth + 1;
    const nextMonth = m > 11 ? 0 : m;
    const nextYear = m > 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    const selectedDay = parseInt(selectedDateStr.split('-')[2], 10);
    const maxDay = getDaysInMonth(nextYear, nextMonth);
    setSelectedDateStr(toYMD(nextYear, nextMonth, Math.min(selectedDay, maxDay)));
  };
  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDateStr(toYMD(currentYear, currentMonth, day));
  };

  const normalizeDateStr = (src) => {
    const s = (src?.date || src?.attendance_date || src?.recorded_at || src).toString();
    const iso = s.includes("T") ? s.split("T")[0] : s.substring(0, 10);
    return iso;
  };
  const hasAttendanceOnDay = (day) => {
    const d = toYMD(currentYear, currentMonth, day);
    return attendanceRecords.some((r) => normalizeDateStr(r) === d);
  };

  const statusLabel = (() => {
    const raw = (
      currentAttendance?.status ||
      currentAttendance?.attendance_status ||
      currentAttendance?.attendanceStatus ||
      currentAttendance?.att_status ||
      ""
    ).toString();
    if (!raw) return "No record";
    const t = raw.trim();
    const norm = t.toLowerCase();
    if (norm === "present" || norm === "absent" || norm === "late") return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
    // Handle enum-like values (e.g., PRESENT)
    if (["present", "absent", "late"].includes(norm)) return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
    if (["PRESENT", "ABSENT", "LATE"].includes(t)) return t.charAt(0) + t.slice(1).toLowerCase();
    return t;
  })();
  const dateLabel = useMemo(() => {
    return selectedDateStr;
  }, [selectedDateStr]);
  const showPresentIcon = statusLabel.toLowerCase() === "present";

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName={parentUser.name} showReminders onOpenReminders={() => setRemindersOpen(true)} />

      {}
      <ParentLayout active="attendance" panelClassName="attendance-panel" contentClassName="attendance-content-enter">
        <div className="att-shell">
          <ParentHeader title={attendanceCopy.headerTitle} />

          <div className="att-body">
            {}
            <div className="calendar-card">
              <div className="calendar-top">
                <span onClick={handlePrevMonth} style={{ cursor: "pointer" }}>‹</span>
                <span>{monthLabel}</span>
                <span onClick={handleNextMonth} style={{ cursor: "pointer" }}>›</span>
              </div>

              <div className="calendar-grid">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (d) => (
                    <div className="weekday" key={d}>
                      {d}
                    </div>
                  )
                )}
                {daysArray.map((d, idx) => (
                  <div
                    className={`day ${d && parseInt(selectedDateStr.split('-')[2], 10) === d ? "active" : ""} ${d && hasAttendanceOnDay(d) ? "marked" : ""}`}
                    key={idx}
                    onClick={() => handleDayClick(d)}
                  >
                    {d || ""}
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="status-card">
              <div className="status-title">Attendance Status</div>
              <div className="status-row">
                <span className="status-key">Date:</span>
                <span className="status-value">{dateLabel}</span>
              </div>
              <div className="status-row">
                <span className="status-key">Status:</span>
                <span className="status-value">
                  {loading ? "Loading..." : statusLabel}
                  {showPresentIcon && <img src={presentIcon} alt="Present" className="status-icon" />}
                </span>
              </div>
              {}
            </div>
          </div>

          <BackButton onClick={() => navigate("/dashboard")} />
        </div>
      </ParentLayout>

      {}
      {remindersOpen && (
        <RemindersModal
          open={remindersOpen}
          onClose={() => setRemindersOpen(false)}
          onOpenAssignmentDetails={openAssignmentDetails}
          onOpenDetail={openDetailModal}
          announcements={announcements}
        />
      )}

      {}
      {assignmentModalOpen && selectedAssignment && (
        <AssignmentModal
          open={assignmentModalOpen}
          assignment={selectedAssignment}
          onClose={() => setAssignmentModalOpen(false)}
        />
      )}

      {}
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

export default Attendance;
