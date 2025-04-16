import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

interface Props extends ViewProps {
  children: React.ReactNode;
}

export const Container = ({ children, style, ...rest }: Props) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#ffffff",
  },
});
