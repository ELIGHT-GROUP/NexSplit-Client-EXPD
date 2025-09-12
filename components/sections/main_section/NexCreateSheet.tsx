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
import { FormInput, FormDropdown } from "@/components/form";
import { CreateExpenseGroupData } from "@/constants/nex-api-types";
import { nexCreateSchema } from "@/validation/nex.schema";

interface NexCreateSheetProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit?: (data: CreateExpenseGroupData) => void;
  isPending?: boolean;
  isSuccess?: boolean;
}

export default function NexCreateSheet({
  isOpen,
  setOpen,
  onSubmit,
  isPending,
  isSuccess,
}: NexCreateSheetProps) {
  const [formData, setFormData] = useState<CreateExpenseGroupData>({
    name: "",
    description: "",
    imageUrl: "",
    settlementType: "DETAILED",
    nexType: "PERSONAL",
  });
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  // Reset form and close modal on successful creation
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        settlementType: "DETAILED",
        nexType: "PERSONAL",
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
      nexCreateSchema.parse(formData);
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

  const settlementOptions: Array<{
    label: string;
    value: "DETAILED" | "SIMPLIFIED";
  }> = [
    { label: "Detailed Settlement", value: "DETAILED" },
    { label: "Simplified Settlement", value: "SIMPLIFIED" },
  ];

  const nexTypeOptions: Array<{ label: string; value: "PERSONAL" | "GROUP" }> =
    [
      { label: "Personal", value: "PERSONAL" },
      { label: "Group", value: "GROUP" },
    ];

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
        {/* Header with drag indicator */}
        <View className="pt-4 flex-row items-center justify-between px-5 pb-3 border-b border-gray-100">
          <Text className="heading-md text-[#333]">Create New Nex</Text>
          <TouchableOpacity className="p-1" onPress={() => setOpen(false)}>
            <AntDesign name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
          {/* Name Input */}
          <FormInput
            icon="tag"
            placeholder="Nex Name"
            value={formData.name}
            onChangeText={(text) => {
              setFormData({ ...formData, name: text });
              if (validationErrors.name) {
                setValidationErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            error={validationErrors.name}
          />

          {/* Description Input */}
          <FormInput
            icon="file-text"
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => {
              setFormData({ ...formData, description: text });
              if (validationErrors.description) {
                setValidationErrors((prev) => ({
                  ...prev,
                  description: undefined,
                }));
              }
            }}
            error={validationErrors.description}
          />

          {/* Settlement Type Dropdown */}
          <FormDropdown
            icon="settings"
            label="Settlement Type"
            options={settlementOptions}
            value={formData.settlementType}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                settlementType: value as "DETAILED" | "SIMPLIFIED",
              })
            }
          />

          {/* Nex Type Dropdown */}
          <FormDropdown
            icon="users"
            label="Nex Type"
            options={nexTypeOptions}
            value={formData.nexType}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                nexType: value as "PERSONAL" | "GROUP",
              })
            }
          />
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="p-5 border-t border-gray-100">
          <TouchableOpacity
            className="btn-primary py-4 px-8 rounded-[10px] items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white text-base font-semibold">
              {isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Create Nex"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
