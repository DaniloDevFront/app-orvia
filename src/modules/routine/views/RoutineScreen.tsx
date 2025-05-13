import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Container } from "@shared/components";

export const RoutineScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <ScrollView></ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});
