import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function ForgotPassword() {
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
        <Text className="heading-lg mb-8">Forgot Password</Text>

        {/* Email */}
        <Text className="label mb-2">Email Address</Text>
        <FormInput
          icon="mail"
          placeholder="example@email.com"
          keyboardType="email-address"
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="btn-primary w-full mt-6 py-3 px-4"
          onPress={() => router.push("/auth/new-password-success")} // TODO: Change to handleSubmit
        >
          <Text className="text-white text-center text-base font-medium">
            Send Reset Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
