import React from "react";
import "../styles/Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button>Register</button>

        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;