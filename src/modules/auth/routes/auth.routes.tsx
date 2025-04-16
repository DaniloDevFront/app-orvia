import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "../views/WelcomeScreen";
import { LoginScreen } from "../views/LoginScreen";
import { RegisterScreen } from "../views/RegisterScreen";
import { ForgotPasswordScreen } from "../views/ForgotPasswordScreen";
import { getDefaultHeaderOptions } from "@core/navigation/options-default";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={getDefaultHeaderOptions({ navigation, showReturn: true })}
      />
    </Stack.Navigator>
  );
};
