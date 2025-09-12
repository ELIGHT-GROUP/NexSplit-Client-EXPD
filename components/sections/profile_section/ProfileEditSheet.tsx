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
import { FormInput } from "@/components/form";
import { UserProfile } from "@/constants/user-api-types";
import { profileEditSchema } from "@/validation/user.schema";

interface ProfileEditSheetProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  user: UserProfile;
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    username: string;
    contactNumber: string;
  }) => void;
  isPending?: boolean;
  isSuccess?: boolean;
}

export default function ProfileEditSheet({
  isOpen,
  setOpen,
  user,
  onSubmit,
  isPending,
  isSuccess,
}: ProfileEditSheetProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    contactNumber: user.contactNumber || "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    firstName?: string;
    lastName?: string;
    username?: string;
    contactNumber?: string;
  }>({});

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username || "",
      contactNumber: user.contactNumber || "",
    });
    setValidationErrors({});
  }, [user]);

  // Reset form and close modal on successful update
  useEffect(() => {
    if (isSuccess) {
      setValidationErrors({});
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  const handleSubmit = () => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate the data using Zod schema
    try {
      profileEditSchema.parse(formData);
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
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.username.trim() &&
    formData.contactNumber.trim();

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
          <Text className="heading-md text-[#333]">Edit Profile</Text>
          <TouchableOpacity className="p-1" onPress={() => setOpen(false)}>
            <AntDesign name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
          {/* First Name Input */}
          <FormInput
            icon="user"
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => {
              setFormData({ ...formData, firstName: text });
              if (validationErrors.firstName) {
                setValidationErrors((prev) => ({
                  ...prev,
                  firstName: undefined,
                }));
              }
            }}
            error={validationErrors.firstName}
          />

          {/* Last Name Input */}
          <FormInput
            icon="user"
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => {
              setFormData({ ...formData, lastName: text });
              if (validationErrors.lastName) {
                setValidationErrors((prev) => ({
                  ...prev,
                  lastName: undefined,
                }));
              }
            }}
            error={validationErrors.lastName}
          />

          {/* Username Input */}
          <FormInput
            icon="at-sign"
            placeholder="Username"
            value={formData.username}
            onChangeText={(text) => {
              setFormData({ ...formData, username: text });
              if (validationErrors.username) {
                setValidationErrors((prev) => ({
                  ...prev,
                  username: undefined,
                }));
              }
            }}
            error={validationErrors.username}
          />

          {/* Contact Number Input */}
          <FormInput
            icon="phone"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChangeText={(text) => {
              setFormData({ ...formData, contactNumber: text });
              if (validationErrors.contactNumber) {
                setValidationErrors((prev) => ({
                  ...prev,
                  contactNumber: undefined,
                }));
              }
            }}
            error={validationErrors.contactNumber}
          />
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
                "Update Profile"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
