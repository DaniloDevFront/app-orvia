import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthStore } from "@state/stores";
import { colors, spacing, typography } from "@themes/theme";
import { Button } from "@shared/components/Button";
import { Input } from "@shared/components/Input";
import { Container } from "@shared/components";

type NavigationProp = NativeStackNavigationProp<any>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      navigation.navigate("Home");
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <Container>
      <Text style={styles.title}>Criar Conta</Text>

      <Input
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        error={error}
      />

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

      <Button title="Cadastrar" onPress={handleRegister} style={styles.button} />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xxl,
    marginTop: spacing.xxl,
  },
  input: {
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  loginText: {
    color: colors.textSecondary,
    ...typography.body,
  },
  loginLink: {
    color: colors.primary,
    ...typography.body,
  },
});
