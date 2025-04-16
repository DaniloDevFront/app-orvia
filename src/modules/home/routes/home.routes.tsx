import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../views/HomeScreen";
import { NewRoutineScreen } from "@modules/routine/views/NewRoutineScreen";
import { getDefaultHeaderOptions } from "@core/navigation/options-default";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={getDefaultHeaderOptions({ navigation, showReturn: false })}
      />

      <Stack.Screen
        name="NewRoutine"
        component={NewRoutineScreen}
        options={getDefaultHeaderOptions({ navigation, showReturn: true })}
      />
    </Stack.Navigator>
  );
};
