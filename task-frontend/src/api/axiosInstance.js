import axios from "axios";

const API = "http://127.0.0.1:5000";

const axiosInstance = axios.create({
  baseURL: API
});

// Request: attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response: handle expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem("refresh_token");

      try {
        const res = await axios.post(`${API}/refresh`, {}, {
          headers: {
            Authorization: `Bearer ${refresh_token}`
          }
        });

        localStorage.setItem("token", res.data.access_token);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access_token}`;

        return axiosInstance(originalRequest);

      } catch (err) {
        // Refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;