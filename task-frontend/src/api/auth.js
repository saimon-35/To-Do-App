import axiosInstance from "./axiosInstance";

// Register API
export const registerUser = (data) => {
  return axiosInstance.post(`/register`, data);
};

// Login API
export const loginUser = (data) => {
  return axiosInstance.post(`/login`, data);
};