import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useRequestPasswordReset } from "@/services/query/user.query";
import { forgotPasswordSchema } from "@/validation/auth.schema";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const { mutate: requestPasswordReset, isPending } = useRequestPasswordReset();

  const handleSubmit = () => {
    // Clear previous validation errors
    setValidationError("");

    // Validate the data using Zod schema
    try {
      const validationData = {
        email: email.trim(),
      };

      forgotPasswordSchema.parse(validationData);

      // Call the API
      requestPasswordReset(validationData.email);
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        setValidationError(error.errors[0].message);
      }
    }
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

        {/* Title */}
        <Text className="heading-lg mb-8">Forgot Password</Text>

        {/* Email */}
        <Text className="label mb-2">Email Address</Text>
        <FormInput
          icon="mail"
          placeholder="example@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setValidationError(""); // Clear validation error when user types
          }}
        />

        {validationError ? (
          <Text className="text-red-500 text-sm mt-2 text-left">
            {validationError}
          </Text>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity
          className="btn-primary w-full mt-6 py-3 px-4"
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text className="text-white text-center text-base font-medium">
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Send Reset Code"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
