import axios from "axios";

export const mtgApi = axios.create({
  baseURL: "http://destinydraw.com/dd-api",
  headers: {
    "Content-Type": "application/json",
  },
});
