import { axios } from "../config/axios";

export const UsersAPI = {
  login: async ({ email, password }) => {
    const response = await axios.post(
      "/auth/local",
      JSON.stringify({
        identifier: email,
        password: password,
      })
    );
    return JSON.parse(response.data);
  },
};
