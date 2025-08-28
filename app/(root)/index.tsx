import { View } from "react-native";
import React, { useState } from "react";
import { nex } from "@/mock/nex";
import {
  TopNavigationBar,
  ExpenseList,
  FloatingActionButton,
} from "@/components/sections/main_section";
import NexCreateSheet from "@/components/sections/main_section/NexCreateSheet";
import { useCreateExpenseGroup } from "@/services/query/nex.querty";
import { CreateExpenseGroupData } from "@/constants/nex-api-types";
import { useRouter } from "expo-router";

export default function index() {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const router = useRouter();

  const { mutate: createExpenseGroup, isPending } = useCreateExpenseGroup();

  const handleSearchPress = () => {
    // Handle search functionality
    console.log("Search pressed");
  };

  const handleNotificationPress = () => {
    // Handle notification functionality
    console.log("Notification pressed");
  };

  const handleProfilePress = () => {
    // Navigate to profile page
    router.push("/(root)/profile");
  };

  const handleExpensePress = (expenseId: number) => {
    // Handle expense card press
    console.log("Expense pressed:", expenseId);
  };

  const handleCreateNexPress = () => {
    // Handle create new nex functionality
    setIsCreateSheetOpen(true);
    console.log("Create Nex pressed");
  };

  const handleCreateNexOnSubmit = (data: CreateExpenseGroupData) => {
    createExpenseGroup(data);
  };

  return (
    <View className="flex-1 bg-light">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />

      {/* Main Content */}
      <ExpenseList expenses={nex} onExpensePress={handleExpensePress} />

      {/* Floating Action Button */}
      <FloatingActionButton onPress={handleCreateNexPress} />

      {/* Nex Create Sheet */}
      <NexCreateSheet
        isOpen={isCreateSheetOpen}
        setOpen={setIsCreateSheetOpen}
        onSubmit={handleCreateNexOnSubmit}
        isPending={isPending}
      />
    </View>
  );
}
