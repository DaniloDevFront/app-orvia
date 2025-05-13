import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Card, MoodEmoji, Container } from "@shared/components";
import { theme } from "@themes/theme";
import { useEmotionStore } from "@state/stores";
import { EmotionType } from "@shared/enums";

type NavigationProp = NativeStackNavigationProp<any>;

const moods = ["veryBad", "bad", "neutral", "good", "veryGood"] as const;

export const MoodRegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addEmotion } = useEmotionStore();

  const [selectedMood, setSelectedMood] = useState<(typeof moods)[number] | null>(null);
  const [note, setNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;

    try {
      await addEmotion({
        userId: "1",
        date: new Date().toISOString(),
        type: selectedMood === "veryGood" ? EmotionType.HAPPY : EmotionType.NEUTRAL,
        text: note,
        sentiment: selectedMood === "veryGood" ? 1 : 0,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRecording = () => {
    // Implementar gravação de voz
    setIsRecording(!isRecording);
  };

  return (
    <Container>
      <Text style={styles.title}>Como você está se sentindo?</Text>

      <Card style={styles.moodCard}>
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <MoodEmoji
              key={mood}
              type={mood}
              size={40}
              selected={selectedMood === mood}
              onPress={() => setSelectedMood(mood)}
            />
          ))}
        </View>
      </Card>

      <Card style={styles.noteCard}>
        <TextInput
          style={styles.noteInput}
          placeholder="Insira uma nota opcional"
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </Card>

      <TouchableOpacity style={[styles.recordButton, isRecording && styles.recordingButton]} onPress={toggleRecording}>
        <Text style={styles.recordButtonText}>{isRecording ? "Gravando..." : "Gravar nota de voz"}</Text>
      </TouchableOpacity>

      <Button onPress={handleSubmit} style={styles.button} disabled={!selectedMood}>
        <Text>Salvar</Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.title,
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  moodCard: {
    marginBottom: theme.spacing.lg,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteCard: {
    marginBottom: theme.spacing.lg,
  },
  noteInput: {
    ...theme.typography.body,
    minHeight: 100,
    textAlignVertical: "top",
    padding: 0,
  },
  recordButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: theme.spacing.md,
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  recordingButton: {
    backgroundColor: theme.colors.primary + "20",
  },
  recordButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
  },
  button: {
    marginTop: "auto",
  },
});
