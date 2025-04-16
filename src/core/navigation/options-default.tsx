import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

interface Props {
  navigation: any;
  showReturn?: boolean;
}

export function getDefaultHeaderOptions({ navigation, showReturn = true }: Props): NativeStackNavigationOptions {
  return {
    headerShown: true,
    headerShadowVisible: true,
    headerLeft: showReturn
      ? () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={18} />
          </TouchableOpacity>
        )
      : undefined,
  };
}
