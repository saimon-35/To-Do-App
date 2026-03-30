import React from "react";
import "../styles/Auth.css";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;