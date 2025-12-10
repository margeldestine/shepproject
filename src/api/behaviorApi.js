const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/behavior-logs`;

export async function getBehaviorLogsByStudentId(studentId) {
  const res = await fetch(`${BASE_URL}/student/${studentId}`, { mode: "cors" });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Failed to fetch behavior logs";
    throw new Error(message);
  }
  const list = Array.isArray(data)
    ? data
    : (data && (data.logs || data.rows || data.items || data.content || data.data)) || [];
  return list;
}

export async function getBehaviorLogById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { mode: "cors" });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Failed to fetch behavior log";
    throw new Error(message);
  }
  return data;
}

// Aliases with names requested by the UI spec
export const getBehaviorLogsByStudent = getBehaviorLogsByStudentId;
export const getBehaviorLog = getBehaviorLogById;
