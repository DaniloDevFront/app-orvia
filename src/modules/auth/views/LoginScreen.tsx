import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthStore } from "@state/stores";
import { theme } from "@themes/theme";
import { Button } from "@shared/components/Button";
import { Input } from "@shared/components/Input";
import { Container } from "@shared/components";
import { biometricService } from "../services/biometric.service";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@state/stores";

type NavigationProp = NativeStackNavigationProp<any>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const available = await biometricService.isBiometricAvailable();
      setIsBiometricAvailable(available);

      if (available) {
        const hasBiometricSecret = await biometricService.hasBiometricSecret();
        if (hasBiometricSecret) {
          handleBiometricLogin();
        }
      }
    } catch (error) {
      console.error("Erro ao verificar disponibilidade biométrica:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);

      if (isBiometricAvailable) {
        Alert.alert("Login Biométrico", "Deseja ativar o login biométrico para este dispositivo?", [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: async () => {
              try {
                console.log("Iniciando ativação do login biométrico...");
                const secret = await biometricService.generateBiometricSecret();
                console.log("Segredo biométrico gerado:", secret);

                console.log("Enviando segredo para API...");
                await biometricService.enableBiometricLogin(secret);
                console.log("Segredo salvo com sucesso");

                Alert.alert("Sucesso", "Login biométrico ativado com sucesso!");
              } catch (error: any) {
                console.error("Erro detalhado na ativação biométrica:", error);
                Alert.alert(
                  "Erro",
                  `Não foi possível ativar o login biométrico: ${error?.message || "Erro desconhecido"}`
                );
              }
            },
          },
        ]);
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const response = await biometricService.loginWithBiometrics();

      await AsyncStorage.setItem("auth-storage", JSON.stringify({ token: response.access_token }));
      await useUserStore.getState().findUserByToken();
      useAuthStore.setState({ isAuthenticated: true });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar o login biométrico.");
      console.error(error);
    }
  };

  return (
    <Container>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Orvia</Text>
      </View>

      <Text style={styles.title}>Entrar</Text>

      <Input
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error}
      />

      <Input
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={error}
      />

      <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <Button onPress={handleLogin} style={styles.button}>
        <Text>Entrar</Text>
      </Button>

      {/* TODO: Implementar login social, deixar comentado TEMPORARIAMENTE */}
      {/* <LoginSocial setError={setError} /> */}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  logo: {
    fontWeight: "700",
    lineHeight: 40,
    color: theme.colors.primary,
    letterSpacing: 2,
    fontSize: 42,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: theme.spacing.xxl,
    textAlign: "center",
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: theme.spacing.xl,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    ...theme.typography.caption,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  biometricButtonText: {
    ...theme.typography.body1,
    color: theme.colors.primary,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  registerText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body1,
  },
  registerLink: {
    color: theme.colors.primary,
    ...theme.typography.body1,
  },
});
