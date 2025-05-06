import React, { useEffect } from "react";
import { theme } from "@themes/theme";
import { Text, StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { useEmotionStore, useRoutineStore, useFeedbackStore, useSuggestionStore } from "@state/stores";
import { Container } from "@shared/components";
import { Mood, Suggestion, Routines, Feedback } from "../components";

export const HomeScreen: React.FC = () => {
  const { emotions, getEmotions } = useEmotionStore();
  const { getRoutines } = useRoutineStore();
  const { getFeedbacks } = useFeedbackStore();
  const { findSuggestions } = useSuggestionStore();

  useEffect(() => {
    getEmotions();
    getRoutines();
    getFeedbacks();
  }, []);

  useEffect(() => {
    if (emotions[0]) {
      findSuggestions(emotions[0].type);
    }
  }, [emotions]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <ScrollView>
        <Container style={styles.container}>
          <Text style={styles.title}>Olá,</Text>

          <View style={{ flexDirection: "column", gap: 24 }}>
            <Mood />
            <Routines />
            <Suggestion />
            <Feedback />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9F9FF",
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
});
