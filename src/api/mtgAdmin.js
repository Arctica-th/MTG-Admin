import axios from "axios";

export const mtgApi = axios.create({
  // baseURL: "http://destinydraw.com/dd-api",
  baseURL: process.env.REACT_APP_BASE_URL_API,
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

mtgApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      console.log("logout call");

      window.localStorage.removeItem("token");

      // window.alert("Please login");
      // window.location.replace("/login");
    }
    return error;
  }
);
