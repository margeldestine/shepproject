const BASE_URL = "http://localhost:8080/api/subjects";

export async function getAllSubjects() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createSubject(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

