// PrivateLayout.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "@themes/theme";

import { HomeRoutes } from "@modules/home/routes/home.routes";
import { MoodRoutes } from "@modules/mood/routes/mood.routes";
import { RoutineRoutes } from "@modules/routine/routes/routine.routes";
import { ProfileRoutes } from "@modules/profile/routes/profile.routes";

const Tab = createBottomTabNavigator();

export const PrivateLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Humor"
        component={MoodRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="emoticon-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Rotinas"
        component={RoutineRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="calendar-clock" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
