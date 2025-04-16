import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRoutineStore } from "@state/stores/useRoutineStore";
import { theme } from "@themes/theme";
import { Container } from "@shared/components";

export const RoutineScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { routinesByMonth, getRoutinesByMonth, loading, error } = useRoutineStore();

  useEffect(() => {
    getRoutinesByMonth(selectedDate.getMonth() + 1, selectedDate.getFullYear());
  }, [selectedDate]);

  const onMonthChange = (month: any) => {
    const date = new Date(month.timestamp);
    setSelectedDate(date);
  };

  const renderWeekRoutines = () => {
    if (!routinesByMonth?.weeks) return null;

    return routinesByMonth.weeks.map((week) => (
      <View key={week.weekNumber} style={styles.weekContainer}>
        <Text style={styles.weekTitle}>Semana {week.weekNumber}</Text>
        {week.routines.map((routine) => (
          <View key={routine.id} style={styles.routineCard}>
            <Text style={styles.routineName}>{routine.name}</Text>
            <Text style={styles.routineTime}>{routine.time}</Text>
            <View style={styles.weekDaysContainer}>
              {routine.weekDays.map((day) => (
                <View key={day} style={styles.weekDayBadge}>
                  <Text style={styles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <Container>
      <Calendar
        onMonthChange={onMonthChange}
        theme={{
          backgroundColor: theme.colors.background,
          calendarBackground: theme.colors.background,
          textSectionTitleColor: theme.colors.text,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.white,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.text,
          textDisabledColor: theme.colors.disabled,
          monthTextColor: theme.colors.text,
        }}
      />
      <ScrollView style={styles.routinesContainer}>
        {loading ? (
          <Text style={styles.message}>Carregando...</Text>
        ) : error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : (
          renderWeekRoutines()
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  routinesContainer: {
    flex: 1,
    padding: 16,
  },
  weekContainer: {
    marginBottom: 24,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 12,
  },
  routineCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  routineName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 4,
  },
  routineTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
  },
  weekDaysContainer: {
    flexDirection: "row",
    gap: 8,
  },
  weekDayBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  weekDayText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  message: {
    textAlign: "center",
    color: theme.colors.text,
    marginTop: 24,
  },
  errorMessage: {
    textAlign: "center",
    color: theme.colors.error,
    marginTop: 24,
  },
});
