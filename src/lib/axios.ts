import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
export const axiosInstance = axios.create({
  // https://nua-backend-skqc.onrender.com/

  baseURL: URL,
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
