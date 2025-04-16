import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input, Card, Container } from "@shared/components";
import { theme } from "@themes/theme";
import { useRoutineStore } from "@state/stores";

type NavigationProp = NativeStackNavigationProp<any>;

const weekDays = [
  { key: "DOM", label: "Dom" },
  { key: "SEG", label: "Seg" },
  { key: "TER", label: "Ter" },
  { key: "QUA", label: "Qua" },
  { key: "QUI", label: "Qui" },
  { key: "SEX", label: "Sex" },
  { key: "SAB", label: "Sáb" },
];

export const NewRoutineScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addRoutine } = useRoutineStore();

  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [time, setTime] = useState("08:00");
  const [address, setAddress] = useState("");

  const handleDayPress = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = async () => {
    try {
      await addRoutine({
        userId: "1", // Será dinâmico quando tivermos autenticação
        name,
        weekDays: selectedDays,
        time,
        latitude: 0, // Será obtido do endereço
        longitude: 0, // Será obtido do endereço
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <Text style={styles.label}>Nome</Text>
        <Input value={name} onChangeText={setName} placeholder="Ex: Academia" style={styles.input} />

        <Text style={styles.label}>Dias</Text>
        <View style={styles.daysContainer}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day.key}
              style={[styles.dayButton, selectedDays.includes(day.key) && styles.dayButtonSelected]}
              onPress={() => handleDayPress(day.key)}
            >
              <Text style={[styles.dayText, selectedDays.includes(day.key) && styles.dayTextSelected]}>
                {day.label[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Horário</Text>
        <Input value={time} onChangeText={setTime} placeholder="08:00" style={styles.input} />

        <Text style={styles.label}>Endereço</Text>
        <Input value={address} onChangeText={setAddress} placeholder="Digite o endereço" style={styles.input} />
      </Card>

      <Button title="Adicionar" onPress={handleSubmit} style={styles.button} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  backButton: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  backText: {
    fontSize: 24,
    color: theme.colors.text,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xl,
  },
  label: {
    ...theme.typography.body1,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  input: {
    marginBottom: theme.spacing.lg,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayText: {
    ...theme.typography.body1,
    color: theme.colors.text,
  },
  dayTextSelected: {
    color: theme.colors.background,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
});
