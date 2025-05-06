import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, MoodEmoji } from "@shared/components";
import { theme } from "@themes/theme";
import { useEmotionStore } from "@state/stores";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<any>;

export const Mood = () => {
  const navigation = useNavigation<NavigationProp>();
  const { emotions } = useEmotionStore();

  const todayEmotion = emotions[0];

  return (
    <View>
      <Text style={styles.sectionTitle}>Humor de Hoje</Text>

      <View>
        {todayEmotion ? (
          <View style={styles.container}>
            <MoodEmoji type={todayEmotion.type === "happy" ? "veryGood" : "neutral"} size={48} />
            <Text>{todayEmotion.text}</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>Nenhum registro hoje</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    // ...theme.typography.body1,
    color: theme.colors.textSecondary,
  },
  addButton: {
    // marginTop: 6,
  },
});
