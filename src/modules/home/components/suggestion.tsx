import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Skeleton from "@shared/components/Skeleton";
import { useSuggestionStore } from "@state/stores";
import { Card } from "@shared/components";
import { theme } from "@themes/theme";
import {
  getMediaButtonLabel,
  getMediaIcon,
  getMediaIconColor,
  getMediaProvider,
  getMediaTitle,
} from "../helpers/mediaHelper";

const { width: screenWidth } = Dimensions.get("window");

export const Suggestion = () => {
  const { loading, suggestions } = useSuggestionStore();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      {loading && (
        <View style={{ gap: 16 }}>
          <Skeleton width={screenWidth - 40} height={16}></Skeleton>
          <Skeleton width={screenWidth - 40} height={450}></Skeleton>
        </View>
      )}

      {!loading && suggestions && suggestions.length > 0 && (
        <View style={{ gap: 4, flexDirection: "column" }}>
          <View>
            <Text style={styles.sectionTitle}>Sugestões do dia</Text>

            <Carousel
              width={screenWidth - 40}
              height={155}
              data={suggestions}
              loop
              autoPlay
              autoPlayInterval={5000}
              scrollAnimationDuration={1200}
              mode="horizontal-stack"
              modeConfig={{
                snapDirection: "left",
                stackInterval: 10,
              }}
              onProgressChange={(_, absoluteProgress) => {
                const currentIndex = Math.round(absoluteProgress);
                setActiveIndex(currentIndex);
              }}
              renderItem={({ item, index }) => (
                <Card key={index} style={styles.card}>
                  <View style={styles.cardRow}>
                    <Image
                      source={{ uri: item.content.imageUrl || "https://fakeimg.pl/600x400?text=Erro" }}
                      style={styles.cardImage}
                      resizeMode="cover"
                    ></Image>

                    <Text style={styles.cardDescription}>{item.content.description}</Text>
                  </View>

                  <View style={styles.cardColumn}>
                    <Text style={styles.cardTitle}>{getMediaTitle(item.content)}</Text>

                    <View style={styles.cardFooter}>
                      <View style={styles.cardFooterLeft}>
                        <Icon name={getMediaIcon(item.content)} size={24} color={getMediaIconColor(item.content)} />
                        <Text style={styles.cardFooterLeftText}>{getMediaProvider(item.content)}</Text>
                      </View>

                      <TouchableOpacity style={styles.cardFooterButton}>
                        <Text style={styles.cardFooterButtonText}>{getMediaButtonLabel(item.content)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              )}
            />
          </View>

          <View style={styles.dotsContainer}>
            {suggestions.map((_, index) => (
              <View key={index} style={[styles.dot, index === activeIndex && styles.activeDot]} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    flexDirection: "column",
    gap: 10,
    paddingVertical: 12,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  cardDescription: {
    color: "#3F3F3FFF",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20,
    marginTop: 4,
    flexWrap: "wrap",
    textAlign: "left",
    maxWidth: "70%",
  },
  cardColumn: {
    flexDirection: "column",
    gap: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  cardFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardFooterLeftText: {
    fontSize: 12,
    fontWeight: "500",
  },
  cardFooterButton: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  cardFooterButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  dotsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
  },
});
