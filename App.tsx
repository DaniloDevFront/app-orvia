import React, { useEffect } from "react";
import "react-native-reanimated";
import { AppNavigator } from "./src/core/navigation/app-navigation";
import { useAuthStore, useUserStore } from "@state/stores";

export default function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { user, findUserByToken } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated && !user) {
      findUserByToken();
    }
  }, [isAuthenticated, user]);

  return <AppNavigator />;
}
