const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/behavior-logs`;

export async function getAllBehaviorLogs() {
  const res = await fetch(BASE_URL, { mode: "cors" });
  return res.json();
}

export async function createBehaviorLog(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "cors",
  });
  return res.json();
}

export async function updateBehaviorLog(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "cors",
  });
  return res.json();
}

export async function deleteBehaviorLog(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    mode: "cors",
  });
  try {
    return await res.json();
  } catch {
    return { ok: res.ok };
  }
}

