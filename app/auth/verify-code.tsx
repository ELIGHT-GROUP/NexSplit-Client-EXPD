import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";

export default function VerifyCode() {
  const router = useRouter();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === "") {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== "" && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join("");
    console.log("Entered code:", enteredCode);
  };

  return (
    <View className="flex-1 items-center">
      <View className="w-full max-w-md px-6 pt-12">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-6 w-10 h-10 rounded-full items-center justify-center border border-gray-300"
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>

        <Text className="heading-lg mb-6">Enter Verification Code</Text>

        <View className="flex-row justify-between w-full max-w-xs">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-bold"
            />
          ))}
        </View>

        <TouchableOpacity
          className="btn-primary w-full mt-6 py-3 px-4"
          onPress={() => router.push("/auth/auth-success")} // TODO: Change to handleSubmit
        >
          <Text className="text-white text-center text-base font-medium">
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
