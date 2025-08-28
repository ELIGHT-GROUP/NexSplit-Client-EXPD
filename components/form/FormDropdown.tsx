import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
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
  const dropdownRef = useRef<View>(null);

  // Close dropdown when clicking outside using Modal backdrop
  const handleBackdropPress = () => {
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <View className="mb-4" ref={dropdownRef}>
      <Text className="label mb-2">{label}</Text>
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

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-lg shadow-lg mx-4 max-w-[300px] w-full">
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0 active:bg-gray-50"
                    onPress={() => {
                      onValueChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <Text className="body-text">{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
