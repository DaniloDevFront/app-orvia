import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, MoodEmoji, Button } from "@shared/components";
import { colors, spacing, typography } from "@themes/theme";
import { useEmotionStore, useRoutineStore, useFeedbackStore } from "@state/stores";
import { Container } from "@shared/components/Container";

type NavigationProp = NativeStackNavigationProp<any>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { emotions, getEmotions } = useEmotionStore();
  const { routines, getRoutines } = useRoutineStore();
  const { feedbacks, getFeedbacks } = useFeedbackStore();

  useEffect(() => {
    getEmotions();
    getRoutines();
    getFeedbacks();
  }, []);

  const todayEmotion = emotions[0]; // Pega a emoção mais recente
  const todayRoutines = routines; // No futuro, filtrar por data
  const todayFeedbacks = feedbacks; // No futuro, filtrar por data

  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <Container>
        <Text style={styles.title}>Olá,</Text>

        <Card>
          <Text style={styles.sectionTitle}>Humor de Hoje</Text>
          {todayEmotion ? (
            <View style={styles.moodContainer}>
              <MoodEmoji type={todayEmotion.type === "happy" ? "veryGood" : "neutral"} size={32} />
              <Text style={styles.moodText}>{todayEmotion.text}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>Nenhum registro hoje</Text>
          )}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Rotina</Text>
          {todayRoutines.map((routine) => (
            <View key={routine.id} style={styles.routineItem}>
              <View>
                <Text style={styles.routineName}>{routine.name}</Text>
                <Text style={styles.routineTime}>{routine.time}</Text>
              </View>
              <Text style={styles.routineDays}>{routine.weekDays.join(", ")}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("NewRoutine")}>
            <Text style={styles.addButtonText}>+ Adicionar rotina</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Feedback</Text>
          {todayFeedbacks.map((feedback) => (
            <Text key={feedback.id} style={styles.feedbackText}>
              {feedback.text}
            </Text>
          ))}
        </Card>

        <Button
          title="Registrar humor"
          onPress={() => navigation.navigate("MoodRegister")}
          style={styles.registerButton}
        />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.md,
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moodText: {
    ...typography.body,
    marginLeft: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  routineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  routineName: {
    ...typography.body,
    fontWeight: "600",
  },
  routineTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  routineDays: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  addButton: {
    marginTop: spacing.md,
  },
  addButtonText: {
    color: colors.primary,
    ...typography.body,
  },
  feedbackText: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  registerButton: {
    marginTop: spacing.lg,
  },
});
