import axios from "axios";

export const mtgApi = axios.create({
  baseURL: "http://dd-api-service.destinydraw",
  headers: {
    "Content-Type": "application/json",
  },
});
