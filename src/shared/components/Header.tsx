import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@themes/theme";
import { BackButton } from "./BackButton";

export const Header = () => {
  return (
    <View style={styles.header}>
      <BackButton />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 44,
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    paddingHorizontal: theme.spacing.md,
  },
});
