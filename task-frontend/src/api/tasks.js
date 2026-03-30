import axios from "axios";

const API = "http://127.0.0.1:5000";

// 🔑 Get token
const getToken = () => localStorage.getItem("token");

// ✅ Get tasks
export const getTasks = async () => {
  const res = await axios.get(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

// ✅ Add task
export const addTask = async (title) => {
  const res = await axios.post(
    `${API}/tasks`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// ✅ Delete task
export const deleteTask = async (id) => {
  await axios.delete(`${API}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};