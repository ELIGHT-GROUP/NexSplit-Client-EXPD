import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FormPasswordInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { newPasswordSchema } from "@/validation/auth.schema";

export default function NewPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = () => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate the data using Zod schema
    try {
      newPasswordSchema.parse(formData);

      // TODO: Call API to reset password
      console.log("Password reset data:", formData);
      router.push("/auth/new-password-success");
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  const isFormValid =
    formData.newPassword.trim() && formData.confirmPassword.trim();

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
        <FormPasswordInput
          icon="lock"
          placeholder="••••••••"
          value={formData.newPassword}
          onChangeText={(text) => {
            setFormData({ ...formData, newPassword: text });
            if (validationErrors.newPassword) {
              setValidationErrors((prev) => ({
                ...prev,
                newPassword: undefined,
              }));
            }
          }}
          error={validationErrors.newPassword}
        />

        {/* Confirm Password */}
        <Text className="label mt-4 mb-2">Confirm Password</Text>
        <FormPasswordInput
          icon="lock"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChangeText={(text) => {
            setFormData({ ...formData, confirmPassword: text });
            if (validationErrors.confirmPassword) {
              setValidationErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }
          }}
          error={validationErrors.confirmPassword}
        />

        {/* Submit Button */}
        <TouchableOpacity
          className={`w-full mt-6 py-3 px-4 rounded-lg ${
            isFormValid ? "bg-[#00AA5B]" : "bg-gray-300"
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text
            className={`text-center text-base font-medium ${
              isFormValid ? "text-white" : "text-gray-500"
            }`}
          >
            Save Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
