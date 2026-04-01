import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import Navbar from "./pages/Navbar";
import "./styles/loading.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [serverWakeMessage, setServerWakeMessage] = useState(false);

  useEffect(() => {
    let timer;

    const start = () => {
      setLoading(true);
      setServerWakeMessage(false);

      // 🔥 After 3 seconds → show "server waking up"
      timer = setTimeout(() => {
        setServerWakeMessage(true);
      }, 12000); // 12 seconds (match backend sleep time + buffer)
    };

    const end = () => {
      setLoading(false);
      setServerWakeMessage(false);
      clearTimeout(timer);
    };

    window.addEventListener("api-request-start", start);
    window.addEventListener("api-request-end", end);

    return () => {
      window.removeEventListener("api-request-start", start);
      window.removeEventListener("api-request-end", end);
    };
  }, []);

  return (
    <Router>
      {/* 🔥 GLOBAL LOADER */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>

          {serverWakeMessage ? (
            <p>Server is starting... Please wait (cold start)</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/todo"
          element={
            <>
              <Navbar />
              <Todo />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;