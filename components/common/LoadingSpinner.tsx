import { View, ActivityIndicator, Text } from "react-native";
import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "large",
  color = "#00AA5B",
}: LoadingSpinnerProps) {
  return (
    <View className="flex-1 justify-center items-center bg-light">
      <ActivityIndicator size={size} color={color} />
      <Text className="text-gray-500 mt-4 text-center">{message}</Text>
    </View>
  );
}
