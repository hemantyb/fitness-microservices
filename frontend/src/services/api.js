import axios from "axios";

const API_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (userId) {
    config.headers["X-User-ID"] = userId;
  }
  return config;
});

export const getActivities = () => api.get("/activites");
export const addAcitiviy = (activity) => api.get("/activities", activity);
export const getActivityDetail = (id) =>
  api.get(`recommendations/activity/${id}`);
