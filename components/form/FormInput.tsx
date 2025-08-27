import React, { useState, forwardRef } from "react";
import { View, TextInput, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

interface FormInputProps {
  icon: keyof typeof Feather.glyphMap;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
}

const FormInput = forwardRef<TextInput, FormInputProps>(
  (
    {
      icon,
      placeholder,
      secureTextEntry = false,
      keyboardType = "default",
      error,
      value,
      onChangeText,
      onBlur,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
      <View className="mb-2">
        <View
          className={`flex-row items-center pb-2 ${
            isFocused
              ? "border-b-2 border-[#00AA5B]"
              : error
              ? "border-b-2 border-red-500"
              : ""
          }`}
        >
          <Feather
            name={icon}
            size={18}
            color={isFocused ? "#00AA5B" : error ? "#EF4444" : "#8B8B8B"}
          />
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#8B8B8B"
            secureTextEntry={secureTextEntry && !passwordVisible}
            keyboardType={keyboardType}
            className="flex-1 ml-3 body-text no-outline"
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
          />
          {secureTextEntry && (
            <Feather
              onPress={() => setPasswordVisible(!passwordVisible)}
              name={passwordVisible ? "eye-off" : "eye"}
              size={18}
              color={isFocused ? "#00AA5B" : error ? "#EF4444" : "#8B8B8B"}
            />
          )}
        </View>
        {error && (
          <Text className="text-red-500 text-sm mt-1 ml-6">{error}</Text>
        )}
      </View>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
