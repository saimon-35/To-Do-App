import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

const axiosInstance = axios.create({
  baseURL: API
});

// 🔥 Request: start loader + detect slow request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Start loading event
  window.dispatchEvent(new Event("api-request-start"));

  // Mark request start time
  config.metadata = { startTime: new Date() };

  return config;
});

// 🔥 Response: stop loader
axiosInstance.interceptors.response.use(
  (response) => {
    window.dispatchEvent(new Event("api-request-end"));
    return response;
  },
  async (error) => {
    window.dispatchEvent(new Event("api-request-end"));

    const originalRequest = error.config;

    // ⛔ handle cold start + slow request also passes here
    if (!error.response) {
      console.log("Server might be sleeping (Render cold start)");
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
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
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;