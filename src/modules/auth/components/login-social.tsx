import React from "react";
import { theme } from "@themes/theme";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  setError: (error: boolean) => void;
}

export const LoginSocial: React.FC<Props> = ({ setError }) => {
  const handleSocialLogin = async (provider: "facebook" | "google" | "apple") => {
    try {
      setError(false);

      // switch (provider) {
      //   case "facebook":
      //     await loginWithFacebook();
      //     break;
      //   case "google":
      //     await loginWithGoogle();
      //     break;
      //   case "apple":
      //     await loginWithApple();
      //     break;
      // }
    } catch (error) {
      setError(true);
      console.error(`Erro no login com ${provider}:`, error);
    }
  };

  return (
    <View style={styles.socialLoginContainer}>
      <Text style={styles.socialLoginText}>Ou entre com</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("facebook")}>
          <FontAwesome name="facebook" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("google")}>
          <FontAwesome name="google" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("apple")}>
          <FontAwesome name="apple" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialLoginContainer: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
  },
  socialLoginText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.lg,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    elevation: 2,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
