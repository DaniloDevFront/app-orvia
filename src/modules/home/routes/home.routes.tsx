import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../views/HomeScreen";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
