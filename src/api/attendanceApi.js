const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/attendance`;

export async function getAllAttendance() {
  const res = await fetch(BASE_URL, { mode: "cors" });
  return res.json();
}

export async function createAttendance(data) {
  // Convert date from "2025-12-10" to "2025-12-10 08:00:00" format
  const attendanceDateTime = data.attendance_date.includes(' ') 
    ? data.attendance_date 
    : `${data.attendance_date} 08:00:00`;
  
  const payload = {
    student_id: data.student_id,
    teacher_id: data.teacher_id,
    attendance_date: attendanceDateTime,
    status: data.status
  };

  console.log('Sending attendance payload:', payload);

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    mode: "cors",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Attendance save failed:', errorText);
    throw new Error(`Failed to save attendance: ${errorText}`);
  }

  return res.json();
}

export async function getAttendanceByStudent(studentId) {
  const res = await fetch(`${BASE_URL}/student/${studentId}`, { mode: "cors" });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Failed to fetch attendance by student";
    throw new Error(message);
  }
  return data;
}

export async function getAttendanceByStudentAndDate(studentId, date) {
  const res = await fetch(`${BASE_URL}/student/${studentId}/date/${date}`, { mode: "cors" });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Failed to fetch attendance for date";
    throw new Error(message);
  }
  return data;
}