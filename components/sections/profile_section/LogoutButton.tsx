import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface LogoutButtonProps {
  onPress: () => void;
}

export default function LogoutButton({ onPress }: LogoutButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-red-50 rounded-xl p-4 mb-8 flex-row items-center justify-center border border-red-100"
    >
      <Feather name="log-out" size={20} color="#FF6A3D" className="mr-2" />
      <Text className="text-red-600 font-medium ml-2">Logout</Text>
    </TouchableOpacity>
  );
}
