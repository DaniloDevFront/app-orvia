import { createHttpClient } from "@core/interceptors/createHttpClient";
import { User } from "@state/models";

const http = createHttpClient();

export const userService = {
  async findUserByID(id: number): Promise<User> {
    const response = await http.get<User>(`/users/${id}`);
    return response.data;
  },

  async findUserByToken(): Promise<User> {
    const authHttp = createHttpClient(true);

    const response = await authHttp.get<User>(`/users/token`);
    return response.data;
  }
};
