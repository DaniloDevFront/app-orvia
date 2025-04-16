import { theme } from "@themes/theme";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
      <Icon name="arrow-left" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};
