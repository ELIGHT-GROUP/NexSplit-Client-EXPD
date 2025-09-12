import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { FormPasswordInput } from "@/components/form";
import { passwordChangeSchema } from "@/validation/user.schema";

interface PasswordChangeSheetProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit?: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  isPending?: boolean;
  isSuccess?: boolean;
}

export default function PasswordChangeSheet({
  isOpen,
  setOpen,
  onSubmit,
  isPending,
  isSuccess,
}: PasswordChangeSheetProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Reset form and close modal on successful password change
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setValidationErrors({});
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  const handleSubmit = () => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate the data using Zod schema
    try {
      passwordChangeSchema.parse(formData);
      onSubmit?.(formData);
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
    formData.currentPassword.trim() &&
    formData.newPassword.trim() &&
    formData.confirmPassword.trim() &&
    formData.newPassword === formData.confirmPassword &&
    formData.newPassword.length >= 8;

  const passwordsMatch = formData.newPassword === formData.confirmPassword;
  const passwordLengthValid = formData.newPassword.length >= 8;

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => setOpen(false)}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        zIndex: 1000,
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View className="bg-white rounded-t-[15px] h-[75%]">
        {/* Header */}
        <View className="pt-4 flex-row items-center justify-between px-5 pb-3 border-b border-gray-100">
          <Text className="heading-md text-[#333]">Change Password</Text>
          <TouchableOpacity className="p-1" onPress={() => setOpen(false)}>
            <AntDesign name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
          {/* Current Password Input */}
          <FormPasswordInput
            icon="lock"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChangeText={(text) => {
              setFormData({ ...formData, currentPassword: text });
              if (validationErrors.currentPassword) {
                setValidationErrors((prev) => ({
                  ...prev,
                  currentPassword: undefined,
                }));
              }
            }}
            error={validationErrors.currentPassword}
          />

          {/* New Password Input */}
          <FormPasswordInput
            icon="lock"
            placeholder="New Password"
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

          {/* Confirm Password Input */}
          <FormPasswordInput
            icon="lock"
            placeholder="Confirm New Password"
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

          {/* Password Requirements */}
          <View className="mt-4 p-3 bg-gray-50 rounded-lg">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password Requirements:
            </Text>
            <View className="space-y-1">
              <View className="flex-row items-center pb-2">
                <AntDesign
                  name={passwordLengthValid ? "checkcircle" : "closecircle"}
                  size={14}
                  color={passwordLengthValid ? "#00AA5B" : "#FF6A3D"}
                />
                <Text className="text-xs text-gray-600 ml-2">
                  At least 8 characters
                </Text>
              </View>
              <View className="flex-row items-center">
                <AntDesign
                  name={passwordsMatch ? "checkcircle" : "closecircle"}
                  size={14}
                  color={passwordsMatch ? "#00AA5B" : "#FF6A3D"}
                />
                <Text className="text-xs text-gray-600 ml-2">
                  Passwords must match
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="p-5 border-t border-gray-100">
          <TouchableOpacity
            className={`py-4 px-8 rounded-[10px] items-center ${
              isFormValid ? "btn-primary" : "bg-gray-300"
            }`}
            onPress={handleSubmit}
            disabled={!isFormValid || isPending}
          >
            <Text className="text-white text-base font-semibold">
              {isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Change Password"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
