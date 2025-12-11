const BASE_URL = "http://localhost:8080/api/parent";

export async function getParentData() {
  const res = await fetch(BASE_URL, { mode: "cors" });
  return res.json();
}

export async function getParentByUserId(userId) {
  const res = await fetch(`${BASE_URL}/getParentByUserId/${userId}`, { mode: "cors" });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Failed to fetch parent";
    throw new Error(message);
  }
  return data;
}

