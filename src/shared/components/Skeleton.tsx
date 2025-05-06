import React from "react";
import { ViewStyle, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = 200, height = 20, borderRadius = 8, style }) => {
  return (
    <ShimmerPlaceholder
      width={width}
      height={height}
      shimmerColors={["#2A2A2A", "#3A3A3A", "#2A2A2A"]}
      shimmerStyle={{ borderRadius }}
      visible={false}
      style={style}
    />
  );
};

export default Skeleton;
