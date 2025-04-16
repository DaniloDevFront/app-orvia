import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@shared/components/Button";
import { Input } from "@shared/components/Input";
import { colors, spacing, typography } from "@themes/theme";
import { Container } from "@shared/components/Container";

type NavigationProp = NativeStackNavigationProp<any>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <Container>
      <Text style={styles.subtitle}>Digite seu e-mail e enviaremos instruções para redefinir sua senha.</Text>

      <Input
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error}
      />

      <Button title="Enviar instruções" onPress={handleSubmit} style={styles.button} />

      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Voltar para o login</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xxl,
  },
  input: {
    marginBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.lg,
  },
  loginLink: {
    alignItems: "center",
  },
  loginText: {
    color: colors.primary,
    ...typography.body,
  },
});
