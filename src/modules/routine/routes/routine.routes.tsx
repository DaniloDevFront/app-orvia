import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutineScreen } from "../views/RoutineScreen";
import { NewRoutineScreen } from "../views/NewRoutineScreen";
import { getDefaultHeaderOptions } from "@core/navigation/options-default";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const RoutineRoutes = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoutineScreen"
        component={RoutineScreen}
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
