import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../views/ProfileScreen";
import { getDefaultHeaderOptions } from "@core/navigation/options-default";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const ProfileRoutes = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={getDefaultHeaderOptions({ navigation, showReturn: false })}
      />
    </Stack.Navigator>
  );
};
