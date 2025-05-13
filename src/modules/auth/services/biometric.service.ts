import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { createHttpClient } from '@core/interceptors/createHttpClient';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = createHttpClient();
const BIOMETRIC_SECRET_KEY = "biometric_secret";

export const biometricService = {
  async isBiometricAvailable(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },

  async generateBiometricSecret(): Promise<string> {
    return Crypto.randomUUID();
  },

  async saveBiometricSecret(secret: string): Promise<void> {
    await SecureStore.setItemAsync(BIOMETRIC_SECRET_KEY, secret);
  },

  async getBiometricSecret(): Promise<string | null> {
    return await SecureStore.getItemAsync(BIOMETRIC_SECRET_KEY);
  },

  async hasBiometricSecret(): Promise<boolean> {
    const secret = await this.getBiometricSecret();
    return !!secret;
  },

  async authenticateWithBiometrics(): Promise<boolean> {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para continuar',
      fallbackLabel: 'Use sua senha',
    });
    return result.success;
  },

  async enableBiometricLogin(secret: string): Promise<void> {
    try {
      const authStorage = await AsyncStorage.getItem('auth-storage');
      const { token } = JSON.parse(authStorage || '{}');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await http.post('/auth/set-biometric',
        { biometricSecret: secret },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await this.saveBiometricSecret(secret);
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'Erro ao ativar login biométrico');
    }
  },

  async loginWithBiometrics(): Promise<{ access_token: string }> {
    const secret = await this.getBiometricSecret();
    if (!secret) {
      throw new Error('Login biométrico não configurado');
    }

    const isAuthenticated = await this.authenticateWithBiometrics();
    if (!isAuthenticated) {
      throw new Error('Autenticação biométrica falhou');
    }

    try {
      const response = await http.post<{ access_token: string }>('/auth/login/biometric', {
        biometricSecret: secret,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'Erro ao realizar login biométrico');
    }
  },

  async clearBiometricData(): Promise<void> {
    await SecureStore.deleteItemAsync(BIOMETRIC_SECRET_KEY);
  },
}; 