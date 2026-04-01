import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// Register API
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// Login API
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};