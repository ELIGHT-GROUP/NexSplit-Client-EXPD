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
      <View className="relative flex-1 p-4 pb-6">
        {/* Top Section - Title, Description, and Date */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1 mr-4">
            <Text className="heading-md mb-1">{item.title}</Text>
            <Text className="body-text text-gray" numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <Text className="label text-right text-white">{formatDate(item.date)}</Text>
        </View>

        {/* Bottom Section - Members and Tags */}
        <View className="flex-row items-center justify-between">
          {/* Left side - Members */}
          <View className="flex-row items-center" style={{ width: 80 }}>
            {Array.from({ length: Math.min(item.members, 3) }, (_, index) => (
              <View
                key={index}
                className="w-8 h-8 bg-[#00AA5B] rounded-full items-center justify-center border-2 border-white absolute"
                style={{ left: index * 20 }}
              >
                <Text className="text-white text-xs font-bold">
                  {["OS", "BH", "VI"][index]}
                </Text>
              </View>
            ))}
            {item.members > 3 && (
              <View
                className="w-8 h-8 bg-light-gray rounded-full items-center justify-center border-2 border-white absolute"
                style={{ left: 3 * 20 }}
              >
                <Text className="text-gray text-xs font-bold">
                  +{item.members - 3}
                </Text>
              </View>
            )}
          </View>

          {/* Right side - Tags */}
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
