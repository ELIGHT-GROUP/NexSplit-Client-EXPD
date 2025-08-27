import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { generateHorizontalGradientFromText } from "@/utils/gradientGenerator";
import { formatDate } from "@/utils/formatDate";

interface ExpenseCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    date: string;
    members: number;
    tags: string[];
    image: string;
  };
  onPress?: () => void;
}

export default function ExpenseCard({ item, onPress }: ExpenseCardProps) {
  // Generate gradient based on item title
  const gradientConfig = generateHorizontalGradientFromText(item.title);

  return (
    <TouchableOpacity
      className="bg-white rounded-xl mb-4 shadow-sm border border-gray-100 relative overflow-hidden"
      onPress={onPress}
    >
      {/* Background Gradient */}
      <LinearGradient
        colors={gradientConfig.colors as any}
        start={gradientConfig.start}
        end={gradientConfig.end}
        className="absolute inset-0"
      />

      {/* White overlay for readability */}
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 1.0)",
          "rgba(255, 255, 255, 1.0)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0.3)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute inset-0"
      />

      {/* Content */}
      <View className="relative flex-1 p-4">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="heading-md mb-1">{item.title}</Text>
            <Text className="body-text text-gray mb-2" numberOfLines={2}>
              {item.description}
            </Text>
            <Text className="label">{formatDate(item.date)}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row -space-x-2">
            {Array.from({ length: Math.min(item.members, 3) }, (_, index) => (
              <View
                key={index}
                className="w-8 h-8 bg-[#00AA5B] rounded-full items-center justify-center border-2 border-white"
              >
                <Text className="text-white text-xs font-bold">
                  {["OS", "BH", "VI"][index]}
                </Text>
              </View>
            ))}
            {item.members > 3 && (
              <View className="w-8 h-8 bg-light-gray rounded-full items-center justify-center border-2 border-white">
                <Text className="text-gray text-xs font-bold">
                  +{item.members - 3}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag, index) => (
              <View
                key={index}
                className="bg-light-green px-2 py-1 rounded-full"
              >
                <Text className="text-[#00AA5B] text-xs font-medium">
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
