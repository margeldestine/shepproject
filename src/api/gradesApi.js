const BASE_URL = "http://localhost:8080/api/grades";

export async function getAllGrades() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch grades");
  }
  return res.json();
}

export async function createGrade(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create grade");
  }
  return res.json();
}
