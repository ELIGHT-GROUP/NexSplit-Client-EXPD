import { View, Text } from "react-native";
import React from "react";
import { UserProfile } from "@/constants/user-api-types";

interface PersonalInfoSectionProps {
  user: UserProfile;
}

export default function PersonalInfoSection({
  user,
}: PersonalInfoSectionProps) {
  return (
    <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Personal Information
      </Text>

      <View className="space-y-4">
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Full Name</Text>
          <Text className="text-gray-800 font-medium">
            {user.fullName || `${user.firstName} ${user.lastName}`}
          </Text>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Username</Text>
          <Text className="text-gray-800 font-medium">
            {user.username || "Not set"}
          </Text>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Email</Text>
          <Text className="text-gray-800 font-medium">{user.email}</Text>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Contact Number</Text>
          <Text className="text-gray-800 font-medium">
            {user.contactNumber || "Not provided"}
          </Text>
        </View>
      </View>
    </View>
  );
}
