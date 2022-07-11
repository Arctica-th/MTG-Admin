import axios from "axios";

export const mtgApi = axios.create({
  baseURL: "http://destinydraw.com/dd-api",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
