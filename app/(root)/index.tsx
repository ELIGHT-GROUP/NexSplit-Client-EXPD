import { View } from "react-native";
import React, { useState } from "react";
import {
  TopNavigationBar,
  ExpenseList,
  FloatingActionButton,
} from "@/components/sections/main_section";
import NexCreateSheet from "@/components/sections/main_section/NexCreateSheet";
import {
  useCreateExpenseGroup,
  useGetExpenseGroups,
} from "@/services/query/nex.querty";
import { CreateExpenseGroupData } from "@/constants/nex-api-types";
import { useRouter } from "expo-router";

export default function index() {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const router = useRouter();

  // Fetch expense groups from API
  const {
    data: expenseGroupsData,
    isLoading,
    error,
  } = useGetExpenseGroups({ page: 0, size: 10 });

  // Create expense group mutation
  const {
    mutate: createExpenseGroup,
    isPending,
    isSuccess,
  } = useCreateExpenseGroup();

  // Extract expense groups from API response
  const expenseGroups = expenseGroupsData?.data?.data || [];

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

  const handleExpensePress = (expenseId: string) => {
    // Handle expense card press - navigate to expense details
    console.log("Expense pressed:", expenseId);
    // TODO: Navigate to expense details page
    // router.push(`/(root)/expense/${expenseId}`);
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
      <ExpenseList
        expenses={expenseGroups}
        onExpensePress={handleExpensePress}
        isLoading={isLoading}
        error={error}
      />

      {/* Floating Action Button */}
      <FloatingActionButton onPress={handleCreateNexPress} />

      {/* Nex Create Sheet */}
      <NexCreateSheet
        isOpen={isCreateSheetOpen}
        setOpen={setIsCreateSheetOpen}
        onSubmit={handleCreateNexOnSubmit}
        isPending={isPending}
        isSuccess={isSuccess}
      />
    </View>
  );
}
