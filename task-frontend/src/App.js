import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load from localStorage (like your original code)
 useEffect(() => {
  fetch("http://localhost:5000/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((err) => console.error(err));
}, []);

  // Save to localStorage
  const saveTasks = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  // Add task
  const addTask = () => {
  const todoText = input.trim();
  if (!todoText) return;

  fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todoText }),
  })
    .then((res) => res.json())
    .then((data) => {
      setTasks([...tasks, data.task]);
      setInput("");
    })
    .catch((err) => console.error(err));
};

  // Delete task
  const deleteTask = (id) => {
  fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setTasks(tasks.filter((item) => item.id !== id));
    })
    .catch((err) => console.error(err));
};

  // Toggle complete
  const toggleTask = (id) => {
  const task = tasks.find((item) => item.id === id);

  fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !task.completed }),
  })
    .then((res) => res.json())
    .then((updatedTask) => {
      setTasks(
        tasks.map((item) =>
          item.id === id ? updatedTask : item
        )
      );
    })
    .catch((err) => console.error(err));
};

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul id="todo-list">
        {tasks.map((item) => (
          <li key={item.id}>
            <span
              onClick={() => toggleTask(item.id)}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {item.title}
            </span>

            <button onClick={() => deleteTask(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;