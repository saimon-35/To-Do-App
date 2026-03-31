import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import Navbar from "./pages/Navbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Main App */}
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