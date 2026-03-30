const BASE_URL = "http://localhost:5000";

export const getTasks = () => {
  return fetch(`${BASE_URL}/tasks`).then(res => res.json());
};

export const addTask = (title) => {
  return fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(res => res.json());
};

export const deleteTask = (id) => {
  return fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
};