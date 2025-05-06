import React from "react";
import { Container } from "@shared/components";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@shared/components/Button";
import { theme } from "@themes/theme";

type NavigationProp = NativeStackNavigationProp<any>;

export const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao App</Text>
        <Image source={require("../../../../assets/welcome/meditation.png")} style={styles.image} />
        <Text style={styles.subtitle}>Gerencie suas rotinas, registre seu humor e acompanhe seu progresso</Text>
        <Button onPress={() => navigation.navigate("Login")} style={styles.button}>
          <Text>Começar</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xxl,
    textAlign: "center",
  },
  subtitle: {
    ...theme.typography.body1,
    textAlign: "center",
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.xxl,
    color: theme.colors.textSecondary,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  button: {
    width: "100%",
  },
});
