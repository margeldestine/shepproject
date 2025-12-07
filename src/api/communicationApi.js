const BASE_URL = "http://localhost:8080/api/communication";

export async function getAllCommunications() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createCommunication(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCommunication(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let payload = null;
  try { payload = await res.json(); } catch { payload = null; }
  if (!res.ok) {
    const message = (payload && (payload.message || payload.error)) || "Failed to update announcement";
    throw new Error(message);
  }
  return payload;
}

export async function deleteCommunication(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  let payload = null;
  try { payload = await res.json(); } catch { payload = null; }
  if (!res.ok) {
    const message = (payload && (payload.message || payload.error)) || "Failed to delete announcement";
    throw new Error(message);
  }
  return payload || { ok: true };
}

