import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { theme } from "@themes/theme";

interface InputProps extends TextInputProps {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ style, error, ...rest }) => {
  return (
    <TextInput
      style={[styles.input, error && styles.error, style]}
      placeholderTextColor={theme.colors.textSecondary}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.xs,
    paddingHorizontal: theme.spacing.md,
    ...theme.typography.body1,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  error: {
    borderColor: theme.colors.error,
  },
});
