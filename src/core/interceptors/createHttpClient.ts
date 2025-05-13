import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

type AppConfig = {
  apiUrl: string;
  environment: "local" | "development" | "production";
};

const config = Constants.expoConfig?.extra as AppConfig | undefined;

if (!config?.apiUrl) {
  throw new Error("API URL não definida nas variáveis de ambiente.");
}

export const createHttpClient = (token: boolean = false): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (token) {
    axiosInstance.interceptors.request.use(async (requestConfig) => {
      try {
        const authData = await AsyncStorage.getItem("auth-storage");

        if (authData) {
          const { token } = JSON.parse(authData);

          if (token) {
            console.log("🔐 Token adicionado:", token);
            requestConfig.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error("Erro ao recuperar o token:", error);
      }

      return requestConfig;
    });
  }

  return axiosInstance;
};
