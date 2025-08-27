import { View } from "react-native";
import React from "react";
import { nex } from "@/mock/nex";
import {
  TopNavigationBar,
  ExpenseList,
  FloatingActionButton,
} from "@/components/sections/main_section";

export default function index() {
  const handleSearchPress = () => {
    // Handle search functionality
    console.log("Search pressed");
  };

  const handleNotificationPress = () => {
    // Handle notification functionality
    console.log("Notification pressed");
  };

  const handleProfilePress = () => {
    // Handle profile functionality
    console.log("Profile pressed");
  };

  const handleExpensePress = (expenseId: number) => {
    // Handle expense card press
    console.log("Expense pressed:", expenseId);
  };

  const handleCreateNexPress = () => {
    // Handle create new nex functionality
    console.log("Create Nex pressed");
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
    </View>
  );
}
