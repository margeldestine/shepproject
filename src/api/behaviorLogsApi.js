const BASE_URL = "http://localhost:8080/api/behavior-logs";

export async function getAllBehaviorLogs() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createBehaviorLog(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

