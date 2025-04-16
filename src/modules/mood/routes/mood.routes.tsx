import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoodRegisterScreen } from "../views/MoodRegisterScreen";
import { getDefaultHeaderOptions } from "@core/navigation/options-default";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const MoodRoutes = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoodRegisterScreen"
        component={MoodRegisterScreen}
        options={getDefaultHeaderOptions({ navigation, showReturn: false })}
      />
    </Stack.Navigator>
  );
};
