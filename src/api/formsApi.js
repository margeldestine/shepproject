const BASE_URL = "http://localhost:8080/api/forms";

export async function getAllForms() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createForm(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateForm(formId, data) {
  const res = await fetch(`${BASE_URL}/${formId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteForm(formId) {
  const res = await fetch(`${BASE_URL}/${formId}`, {
    method: "DELETE",
  });
  return res.text();
}