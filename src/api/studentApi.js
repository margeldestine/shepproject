const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/students`;

export async function getStudentData() {
  const res = await fetch(BASE_URL, { mode: "cors" });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Failed to fetch students";
    throw new Error(message);
  }
  return data;
}

export async function createStudent(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "cors",
  });
  let payload = null;
  try { payload = await res.json(); } catch { payload = null; }
  if (!res.ok) {
    const message = (payload && (payload.message || payload.error)) || "Failed to create student";
    throw new Error(message);
  }
  return payload;
}
