import { createHttpClient } from "@core/interceptors/createHttpClient";
import { AxiosResponse } from "axios";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// // Configuração do Google Sign-In
// GoogleSignin.configure({
//   webClientId: 'YOUR_WEB_CLIENT_ID',
//   offlineAccess: true,
// });

const http = createHttpClient();

export const authService = {
  async login(email: string, password: string): Promise<any> {
    const response = await http.post<any>("/auth/login", { email, password });
    return response.data;
  },

  async register(
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<AxiosResponse<void>> {
    return http.post<void>("/auth/register", { name, email, phone, password });
  },

  // async loginWithFacebook(): Promise<any> {
  //   try {
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  //     if (result.isCancelled) {
  //       throw new Error('Usuário cancelou o login');
  //     }

  //     const data = await AccessToken.getCurrentAccessToken();
  //     if (!data) throw new Error('Falha ao obter token de acesso');

  //     const response = await http.post('/auth/facebook/token', {
  //       access_token: data.accessToken,
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error('Erro no login com Facebook:', error);
  //     throw error;
  //   }
  // },

  // async loginWithGoogle(): Promise<any> {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const { accessToken } = await GoogleSignin.signIn();

  //     if (!accessToken) {
  //       throw new Error('Falha ao obter token de acesso');
  //     }

  //     const response = await http.post('/auth/google/token', {
  //       access_token: accessToken,
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error('Erro no login com Google:', error);
  //     throw error;
  //   }
  // },

  // async loginWithApple(): Promise<any> {
  //   try {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });

  //     const { identityToken, email, fullName } = appleAuthRequestResponse;

  //     const response = await http.get('/auth/apple', {
  //       headers: { Authorization: `Bearer ${identityToken}` }
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error('Erro no login com Apple:', error);
  //     throw error;
  //   }
  // }
};
