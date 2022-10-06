import { Axios } from "axios";

export const axios = new Axios({
  baseURL: "https://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});
