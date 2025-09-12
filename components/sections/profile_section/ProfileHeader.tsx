import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { UserProfile } from "@/constants/user-api-types";

interface ProfileHeaderProps {
  user: UserProfile;
  onBackPress: () => void;
  onSettingsPress: () => void;
}

export default function ProfileHeader({
  user,
  onBackPress,
  onSettingsPress,
}: ProfileHeaderProps) {
  return (
    <LinearGradient colors={["#00AA5B", "#00CC6A"]} className="pt-12 pb-6 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={onBackPress}
          className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
        >
          <Feather name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Profile</Text>
        <TouchableOpacity
          onPress={onSettingsPress}
          className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
        >
          <Feather name="settings" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View className="items-center">
        <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-4">
          <Text className="text-white text-3xl font-bold">
            {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
          </Text>
        </View>
        <Text className="text-white text-xl font-semibold mb-1">
          {user.fullName || `${user.firstName} ${user.lastName}`}
        </Text>
        <Text className="text-white/80 text-sm">{user.email}</Text>
      </View>
    </LinearGradient>
  );
}
