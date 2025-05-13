import { Card } from "@shared/components";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { theme } from "@themes/theme";
import { useFeedbackStore } from "@state/stores";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<any>;

export const Feedback = () => {
  const { feedbacks } = useFeedbackStore();

  const todayFeedbacks = feedbacks;

  return (
    <View>
      <Text style={styles.sectionTitle}>Último Feedback</Text>

      <Card>
        {todayFeedbacks.map((feedback) => (
          <Text key={feedback.id} style={styles.feedbackText}>
            {feedback.text}
          </Text>
        ))}
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
  feedbackText: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.sm,
  },
  addButton: {
    marginTop: theme.spacing.md,
  },
  addButtonText: {
    color: theme.colors.primary,
    ...theme.typography.body1,
  },
});
