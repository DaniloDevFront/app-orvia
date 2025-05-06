import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "@state/stores";
import { PublicLayout } from "./public-layout";
import { PrivateLayout } from "./private-layout";

import { SafeAreaProvider } from "react-native-safe-area-context";

export const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <SafeAreaProvider>
      <NavigationContainer>{isAuthenticated ? <PrivateLayout /> : <PublicLayout />}</NavigationContainer>
    </SafeAreaProvider>
  );
};
