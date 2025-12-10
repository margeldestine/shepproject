const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/attendance`;

export async function getAllAttendance() {
  const res = await fetch(BASE_URL, { mode: "cors" });
  return res.json();
}

export async function createAttendance(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "cors",
  });
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

