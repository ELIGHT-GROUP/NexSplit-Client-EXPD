import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface TopNavigationBarProps {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export default function TopNavigationBar({
  onSearchPress,
  onNotificationPress,
  onProfilePress,
}: TopNavigationBarProps) {

  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
      <Text className="heading-lg text-[#00AA5B]">NexSplit</Text>
      <View className="flex-row items-center gap-2 space-x-4">
        <TouchableOpacity
          className="w-10 h-10 bg-light-gray rounded-full items-center justify-center"
          onPress={() => router.push("/dev")}
        >
          <Feather name="settings" size={20} color="#8B8B8B" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 bg-light-gray rounded-full items-center justify-center"
          onPress={onSearchPress}
        >
          <Feather name="search" size={20} color="#8B8B8B" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 bg-light-gray rounded-full items-center justify-center relative"
          onPress={onNotificationPress}
        >
          <Feather name="bell" size={20} color="#8B8B8B" />
          <View className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF6A3D] rounded-full" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 bg-light-gray rounded-full items-center justify-center"
          onPress={onProfilePress}
        >
          <Feather name="user" size={20} color="#8B8B8B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
