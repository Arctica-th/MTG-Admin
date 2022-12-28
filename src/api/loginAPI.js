import axios from "axios";

export const loginAPI = axios.create({
  baseURL: "http://destinydraw.com/dd-api-admin",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

loginAPI.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
