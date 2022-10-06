import { axios } from "../config/axios";

let jwtStrapiToken;
if (typeof window !== "undefined") {
  jwtStrapiToken = JSON.parse(window.localStorage.getItem("jwtStrapiToken"));
}

export const TasksAPI = {
  find: async () => {
    const response = await axios.get("/tasks?populate=*", {
      headers: { Authorization: `Bearer ${jwtStrapiToken}` },
    });
    return JSON.parse(response.data);
  },

  findOne: async ({ id }) => {
    const response = await axios.get(`/tasks/${id}?populate=*`, {
      headers: { Authorization: `Bearer ${jwtStrapiToken}` },
    });
    return JSON.parse(response.data);
  },
};
