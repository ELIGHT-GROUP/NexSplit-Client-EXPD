import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface FormPasswordInputProps {
  icon: keyof typeof Feather.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
}

export default function FormPasswordInput({
  icon,
  placeholder,
  value,
  onChangeText,
  label,
  error,
}: FormPasswordInputProps) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View className="mb-4">
      {label && <Text className="label mb-2">{label}</Text>}
      <View className="flex-row items-center py-2 border-b border-gray-200">
        <Feather name={icon} size={18} color="#8B8B8B" />
        <TextInput
          className="flex-1 ml-3 body-text"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          placeholderTextColor="#8B8B8B"
        />
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          className="p-1"
        >
          <Feather
            name={isSecure ? "eye-off" : "eye"}
            size={18}
            color="#8B8B8B"
          />
        </TouchableOpacity>
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
