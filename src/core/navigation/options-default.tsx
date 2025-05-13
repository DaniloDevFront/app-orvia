import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

interface Props {
  navigation: any;
  showReturn?: boolean;
  title?: string;
}

export function getDefaultHeaderOptions({ navigation, showReturn = true, title }: Props): NativeStackNavigationOptions {
  return {
    headerShown: true,
    headerShadowVisible: true,
    headerTitle: title,
    headerLeft: showReturn
      ? () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={18} />
          </TouchableOpacity>
        )
      : undefined,
  };
}
