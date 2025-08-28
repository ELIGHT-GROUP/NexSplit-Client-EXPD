import React, { useState } from "react";
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

interface NexCreateSheetProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit?: (data: CreateExpenseGroupData) => void;
  isPending?: boolean;
}

export default function NexCreateSheet({
  isOpen,
  setOpen,
  onSubmit,
  isPending,
}: NexCreateSheetProps) {
  const [formData, setFormData] = useState<CreateExpenseGroupData>({
    name: "",
    description: "",
    imageUrl: "",
    settlementType: "DETAILED",
    nexType: "PERSONAL",
  });

  const handleSubmit = () => {
    if (formData.name.trim() && formData.description.trim()) {
      onSubmit?.(formData);
      // setOpen(false);
      // Reset form
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        settlementType: "DETAILED",
        nexType: "PERSONAL",
      });
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
      <View className="bg-white rounded-t-[15px] min-h-[400px] max-h-[90%]">
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
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          {/* Description Input */}
          <FormInput
            icon="file-text"
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
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

          {/* Submit Button */}
          <TouchableOpacity
            className="btn-primary py-4 px-8 rounded-[10px] items-center mt-4"
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
        </ScrollView>
      </View>
    </Modal>
  );
}
