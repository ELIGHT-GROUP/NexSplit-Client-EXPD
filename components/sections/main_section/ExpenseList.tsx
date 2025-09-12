import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import React from "react";
import ExpenseCard from "./ExpenseCard";

interface ExpenseListProps {
  expenses: Array<{
    id: string;
    name: string;
    description: string;
    createdAt: string;
    members?: number;
    tags?: string[];
    imageUrl?: string;
    settlementType?: string;
    nexType?: string;
  }>;
  onExpensePress?: (expenseId: string) => void;
  isLoading?: boolean;
  error?: any;
}

export default function ExpenseList({
  expenses,
  onExpensePress,
  isLoading,
  error,
}: ExpenseListProps) {
  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00AA5B" />
        <Text className="text-gray-500 mt-2">Loading expense groups...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-500 text-center">
          Failed to load expense groups
        </Text>
        <Text className="text-gray-500 text-center mt-2">
          Please try again later
        </Text>
      </View>
    );
  }

  // Empty state
  if (!expenses || expenses.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-gray-500 text-center text-lg">
          No expense groups yet
        </Text>
        <Text className="text-gray-400 text-center mt-2">
          Create your first expense group to get started
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 px-6 pt-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-20">
        {expenses.map((item) => (
          <ExpenseCard
            key={item.id}
            item={{
              id: parseInt(item.id) || 0, // Convert string ID to number for ExpenseCard
              title: item.name,
              description: item.description,
              date: item.createdAt,
              members: item.members || 1,
              tags: item.tags || [],
              image: item.imageUrl || "",
            }}
            onPress={() => onExpensePress?.(item.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
