import { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask } from "../api/tasks";
import "../styles/todo.css"; // ✅ Import your CSS

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleAdd = () => {
    if (!input.trim()) return;

    addTask(input).then((data) => {
      setTasks([...tasks, data.task]);
      setInput("");
    });
  };

  const handleDelete = (id) => {
    deleteTask(id).then(() => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    });
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-section">
        <input
          id="todo-input"   // ✅ matches CSS
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button id="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul id="todo-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>

            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;