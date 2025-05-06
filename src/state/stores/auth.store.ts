import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "@state/services/auth.service";
import { useUserStore } from ".";

interface AuthState {
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  // loginWithFacebook: () => Promise<void>;
  // loginWithGoogle: () => Promise<void>;
  // loginWithApple: () => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<string | null>;
}

interface AuthStorageData {
  token: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  login: async (email, password) => {
    const { access_token } = await authService.login(email, password);

    await AsyncStorage.setItem(
      "auth-storage",
      JSON.stringify({ token: access_token })
    );

    if (access_token) {
      await useUserStore.getState().findUserByToken();
    }

    set({ isAuthenticated: true });
  },

  // loginWithFacebook: async () => {
  //   try {
  //     const { access_token } = await authService.loginWithFacebook();

  //     await AsyncStorage.setItem(
  //       "auth-storage",
  //       JSON.stringify({ token: access_token })
  //     );

  //     if (access_token) {
  //       await useUserStore.getState().findUserByToken();
  //     }

  //     set({ isAuthenticated: true });
  //   } catch (error) {
  //     console.error('Erro no login com Facebook:', error);
  //     throw error;
  //   }
  // },

  // loginWithGoogle: async () => {
  //   try {
  //     const { access_token } = await authService.loginWithGoogle();

  //     await AsyncStorage.setItem(
  //       "auth-storage",
  //       JSON.stringify({ token: access_token })
  //     );

  //     if (access_token) {
  //       await useUserStore.getState().findUserByToken();
  //     }

  //     set({ isAuthenticated: true });
  //   } catch (error) {
  //     console.error('Erro no login com Google:', error);
  //     throw error;
  //   }
  // },

  // loginWithApple: async () => {
  //   try {
  //     const { access_token } = await authService.loginWithApple();

  //     await AsyncStorage.setItem(
  //       "auth-storage",
  //       JSON.stringify({ token: access_token })
  //     );

  //     if (access_token) {
  //       await useUserStore.getState().findUserByToken();
  //     }

  //     set({ isAuthenticated: true });
  //   } catch (error) {
  //     console.error('Erro no login com Apple:', error);
  //     throw error;
  //   }
  // },

  register: async (name, email, phone, password) => {
    const response = await authService.register(name, email, phone, password);

    if (response?.status === 201) {
      useAuthStore.getState().login(email, password);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("auth-storage");
    set({ isAuthenticated: false });
  },

  checkAuth: async (): Promise<string | null> => {
    const authData = await AsyncStorage.getItem("auth-storage");

    if (authData) {
      const { token } = JSON.parse(authData) as AuthStorageData;

      set({ isAuthenticated: !!token });

      return token;
    }

    return null;
  },
}));
