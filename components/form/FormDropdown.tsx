import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface DropdownOption {
  label: string;
  value: string;
}

interface FormDropdownProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function FormDropdown({
  icon,
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <View className="mb-4">
      <Text className="label mb-2">{label}</Text>

      {/* Dropdown Trigger */}
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View className="flex-row items-center py-2 border-b border-gray-200">
          <Feather name={icon} size={18} color="#8B8B8B" />
          <Text className="flex-1 ml-3 body-text">
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color="#8B8B8B"
          />
        </View>
      </TouchableOpacity>

      {/* Accordion Options */}
      {isOpen && (
        <View className="bg-gray-50 rounded-b-lg border-l border-r border-b border-gray-200">
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              className={`px-4 py-3 ${
                index !== options.length - 1 ? "border-b border-gray-200" : ""
              } ${
                option.value === value ? "bg-blue-50" : "active:bg-gray-100"
              }`}
              onPress={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text
                className={`body-text ${
                  option.value === value
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
