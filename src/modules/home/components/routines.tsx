import { Card } from "@shared/components";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { theme } from "@themes/theme";
import { useRoutineStore } from "@state/stores";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Mapeamento estático dos ícones locais
const localIcons: Record<string, any> = {
  "assets/ico-academy.png": require("../../../../assets/ico-academy.png"),
  // Adicione outros ícones aqui conforme necessário
};

type NavigationProp = NativeStackNavigationProp<any>;

export const Routines = () => {
  const navigation = useNavigation<NavigationProp>();
  const { routines } = useRoutineStore();
  const todayRoutines = routines;

  return (
    <View>
      <Text style={styles.sectionTitle}>Rotina do dia</Text>

      <Card style={{ paddingVertical: 12 }}>
        {todayRoutines.map((routine) => (
          <View key={routine.id} style={styles.routineItem}>
            {routine.icon && (
              <Image
                source={
                  typeof routine.icon === "string" && routine.icon.startsWith("http")
                    ? { uri: routine.icon }
                    : localIcons[routine.icon] || null
                }
                style={styles.routineIcon}
              />
            )}

            <View style={{ flex: 1, justifyContent: "space-between", flexWrap: "nowrap", flexDirection: "row" }}>
              <View>
                <Text style={styles.routineName}>{routine.name}</Text>
                <Text style={styles.routineTime}>{routine.time}</Text>
              </View>

              <Text style={styles.routineDays}>{routine.weekDays.join(", ")}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Rotinas", { screen: "NewRoutine" })}
        >
          <Text style={styles.addButtonText}>+ Adicionar rotina</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  routineItem: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  routineIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  routineName: {
    ...theme.typography.body1,
    fontWeight: "600",
    marginBottom: 3,
  },
  routineTime: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  routineDays: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  addButton: {
    marginTop: theme.spacing.md,
  },
  addButtonText: {
    color: theme.colors.primary,
    ...theme.typography.body1,
    fontSize: 14,
  },
});
