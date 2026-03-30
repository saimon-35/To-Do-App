import axios from "axios";

const API = "http://127.0.0.1:5000";

// Register API
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// Login API
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};