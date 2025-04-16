import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthStore } from "@state/stores";
import { theme } from "@themes/theme";
import { Button } from "@shared/components/Button";
import { Input } from "@shared/components/Input";
import { Container } from "@shared/components";

type NavigationProp = NativeStackNavigationProp<any>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <Container>
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

      <Button title="Entrar" onPress={handleLogin} style={styles.button} />

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
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.xxl,
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.lg,
  },
  registerText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  registerLink: {
    color: theme.colors.primary,
    ...theme.typography.body,
  },
});
