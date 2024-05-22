import axios from "axios";

export const axiosInstance = axios.create({
  // https://nua-backend-skqc.onrender.com/

  baseURL: "https://nua-backend-skqc.onrender.com/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
