import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { UserProfile } from "@/constants/user-api-types";

interface AccountInfoSectionProps {
  user: UserProfile;
}

export default function AccountInfoSection({ user }: AccountInfoSectionProps) {
  return (
    <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Account Information
      </Text>

      <View className="space-y-4">
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Account Status</Text>
          <View className="flex-row items-center">
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                user.status === "ACTIVE"
                  ? "bg-green-500"
                  : user.status === "INACTIVE"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            <Text
              className={`font-medium ${
                user.status === "ACTIVE"
                  ? "text-green-600"
                  : user.status === "INACTIVE"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {user.status}
            </Text>
          </View>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Email Verified</Text>
          <View className="flex-row items-center">
            {user.isEmailValidate ? (
              <Feather name="check-circle" size={16} color="#00AA5B" />
            ) : (
              <Feather name="x-circle" size={16} color="#FF6A3D" />
            )}
            <Text
              className={`ml-1 font-medium ${
                user.isEmailValidate ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isEmailValidate ? "Verified" : "Not Verified"}
            </Text>
          </View>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Google Auth</Text>
          <View className="flex-row items-center">
            {user.isGoogleAuth ? (
              <Feather name="check-circle" size={16} color="#00AA5B" />
            ) : (
              <Feather name="x-circle" size={16} color="#8B8B8B" />
            )}
            <Text
              className={`ml-1 font-medium ${
                user.isGoogleAuth ? "text-green-600" : "text-gray-500"
              }`}
            >
              {user.isGoogleAuth ? "Connected" : "Not Connected"}
            </Text>
          </View>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600">Member Since</Text>
          <Text className="text-gray-800 font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
