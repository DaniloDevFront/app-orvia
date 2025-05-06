import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "@themes/theme";

const emojis = {
  veryBad: "😢",
  bad: "😕",
  neutral: "😐",
  good: "🙂",
  veryGood: "😄",
};

interface Props {
  type: keyof typeof emojis;
  size?: number;
  selected?: boolean;
  onPress?: () => void;
}

export const MoodEmoji: React.FC<Props> = ({ type, size = 40, selected = false, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, selected && styles.selected]} onPress={onPress} disabled={!onPress}>
      <Text style={[styles.emoji, { fontSize: size }]}>{emojis[type]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  selected: {
    backgroundColor: theme.colors.primary + "20",
  },
  emoji: {
    textAlign: "center",
  },
});
