import axios from "axios";

export const loginAPI = axios.create({
  baseURL: "http://localhost:8443",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
