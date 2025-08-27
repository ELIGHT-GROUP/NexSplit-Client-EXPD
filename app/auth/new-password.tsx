import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function NewPasswordPage() {
  const router = useRouter();

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

        {/* Title */}
        <Text className="heading-lg mb-8">Create New Password</Text>

        {/* New Password */}
        <Text className="label mb-2">New Password</Text>
        <FormInput icon="lock" placeholder="••••••••" secureTextEntry />

        {/* Confirm Password */}
        <Text className="label mt-4 mb-2">Confirm Password</Text>
        <FormInput icon="lock" placeholder="••••••••" secureTextEntry />

        {/* Submit Button */}
        <TouchableOpacity className="btn-primary w-full mt-6 py-3 px-4">
          <Text className="text-white text-center text-base font-medium">
            Save Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
