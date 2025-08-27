import { View, ScrollView } from "react-native";
import React from "react";
import ExpenseCard from "./ExpenseCard";

interface ExpenseListProps {
  expenses: Array<{
    id: number;
    title: string;
    description: string;
    date: string;
    members: number;
    tags: string[];
    image: string;
  }>;
  onExpensePress?: (expenseId: number) => void;
}

export default function ExpenseList({
  expenses,
  onExpensePress,
}: ExpenseListProps) {
  return (
    <ScrollView
      className="flex-1 px-6 pt-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-20">
        {expenses.map((item) => (
          <ExpenseCard
            key={item.id}
            item={item}
            onPress={() => onExpensePress?.(item.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
