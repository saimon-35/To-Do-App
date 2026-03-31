import axiosInstance from "./axiosInstance";

// ✅ Get tasks
export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};

// ✅ Add task
export const addTask = async (title) => {
  const res = await axiosInstance.post("/tasks", { title });
  return res.data;
};

// ✅ Delete task
export const deleteTask = async (id) => {
  await axiosInstance.delete(`/tasks/${id}`);
};

// ✅ Update task (toggle completed)
export const updateTask = async (id, completed) => {
  const res = await axiosInstance.put(`/tasks/${id}`, {
    completed: !completed,
  });
  return res.data;
};