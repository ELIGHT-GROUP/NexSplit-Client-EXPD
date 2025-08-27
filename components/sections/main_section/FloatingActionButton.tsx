import { TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface FloatingActionButtonProps {
  onPress?: () => void;
  size?: number;
  iconSize?: number;
}

export default function FloatingActionButton({
  onPress,
  size = 64,
  iconSize = 24,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 w-16 h-16 bg-[#00AA5B] rounded-full items-center justify-center shadow-lg"
      style={{
        width: size,
        height: size,
        shadowColor: "#00AA5B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
      onPress={onPress}
    >
      <AntDesign name="plus" size={iconSize} color="white" />
    </TouchableOpacity>
  );
}
