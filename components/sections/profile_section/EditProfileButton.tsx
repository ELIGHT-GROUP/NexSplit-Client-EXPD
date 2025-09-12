import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface EditProfileButtonProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
}

export default function EditProfileButton({
  onEditProfile,
  onChangePassword,
}: EditProfileButtonProps) {
  return (
    <View className="mb-6">
      {/* Edit Profile Button */}
      <TouchableOpacity
        onPress={onEditProfile}
        className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm border border-gray-100"
      >
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-[#00AA5B]/10 rounded-full items-center justify-center mr-3">
            <Feather name="edit-3" size={20} color="#00AA5B" />
          </View>
          <Text className="text-gray-800 font-medium">Edit Profile</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#8B8B8B" />
      </TouchableOpacity>

      {/* Change Password Button */}
      <TouchableOpacity
        onPress={onChangePassword}
        className="bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm border border-gray-100"
      >
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-blue-500/10 rounded-full items-center justify-center mr-3">
            <Feather name="lock" size={20} color="#3B82F6" />
          </View>
          <Text className="text-gray-800 font-medium">Change Password</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#8B8B8B" />
      </TouchableOpacity>
    </View>
  );
}
