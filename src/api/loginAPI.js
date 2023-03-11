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

loginAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ error });
    if (error.response.status === 401 || error.response.status === 500) {
      console.log("logout call");

      window.localStorage.removeItem("token");

      window.alert("Please login");
      window.location.replace("/login");
    }
    return error;
  }
);
