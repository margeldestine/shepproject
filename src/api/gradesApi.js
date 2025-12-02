const BASE_URL = "http://localhost:8080/api/grades";

export async function getAllGrades() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createGrade(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

