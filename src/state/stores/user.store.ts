import { create } from "zustand";
import { User } from "@state/models";
import { userService } from "@state/services/user.service";

interface AuthState {
  user: User | null

  findUserById: (id: number) => Promise<void>;
  findUserByToken: () => Promise<void>;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,


  findUserById: async (id) => {
    const response = await userService.findUserByID(id);

    set({ user: response })
  },

  findUserByToken: async () => {
    const response = await userService.findUserByToken();

    set({ user: response })
  },
}));
