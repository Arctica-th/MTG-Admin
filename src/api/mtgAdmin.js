import axios from "axios";

export const mtgApi = axios.create({
  baseURL: "http://destinydraw.com/dd-api",
  headers: {
    "Content-Type": "application/json",
  },
});

mtgApi.interceptors.request.use(
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
