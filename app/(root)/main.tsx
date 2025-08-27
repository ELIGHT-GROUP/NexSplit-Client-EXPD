import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { nex } from "@/mock/nex";
import { formatDate } from "@/utils/formatDate";
import { LinearGradient } from "expo-linear-gradient";
import { generateHorizontalGradientFromText } from "@/utils/gradientGenerator";

export default function main() {
  const ExpenseCard = ({ item }: { item: (typeof nex)[0] }) => {
    // Generate gradient based on item title
    const gradientConfig = generateHorizontalGradientFromText(item.title);

    return (
      <TouchableOpacity className="bg-white rounded-xl mb-4 shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Background Gradient */}
        <LinearGradient
          colors={gradientConfig.colors as any}
          start={gradientConfig.start}
          end={gradientConfig.end}
          className="absolute inset-0"
        />

        {/* White overlay for readability */}
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 1.0)",
            "rgba(255, 255, 255, 1.0)",
            "rgba(255, 255, 255, 0.7)",
            "rgba(255, 255, 255, 0.3)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="absolute inset-0"
        />

        {/* Content */}
        <View className="relative flex-1 p-4">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="heading-md mb-1">{item.title}</Text>
              <Text className="body-text text-gray mb-2" numberOfLines={2}>
                {item.description}
              </Text>
              <Text className="label">{formatDate(item.date)}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row -space-x-2">
              {Array.from({ length: Math.min(item.members, 3) }, (_, index) => (
                <View
                  key={index}
                  className="w-8 h-8 bg-[#00AA5B] rounded-full items-center justify-center border-2 border-white"
                >
                  <Text className="text-white text-xs font-bold">
                    {["OS", "BH", "VI"][index]}
                  </Text>
                </View>
              ))}
              {item.members > 3 && (
                <View className="w-8 h-8 bg-light-gray rounded-full items-center justify-center border-2 border-white">
                  <Text className="text-gray text-xs font-bold">
                    +{item.members - 3}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-row flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag, index) => (
                <View
                  key={index}
                  className="bg-light-green px-2 py-1 rounded-full"
                >
                  <Text className="text-[#00AA5B] text-xs font-medium">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-light">
      {/* Top Navigation Bar */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <Text className="heading-lg text-[#00AA5B]">NexSplit</Text>
        <View className="flex-row items-center gap-2 space-x-4">
          <TouchableOpacity className="w-10 h-10 bg-light-gray rounded-full items-center justify-center">
            <Feather name="search" size={20} color="#8B8B8B" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-light-gray rounded-full items-center justify-center relative">
            <Feather name="bell" size={20} color="#8B8B8B" />
            <View className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF6A3D] rounded-full" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-light-gray rounded-full items-center justify-center">
            <Feather name="user" size={20} color="#8B8B8B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Expense Cards Grid */}
        <View className="mb-20">
          {nex.map((item) => (
            <ExpenseCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-16 h-16 bg-[#00AA5B] rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: "#00AA5B",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* FAB Label */}
      {/* <View className="absolute bottom-20 right-6 bg-dark rounded-lg px-3 py-2">
        <Text className="text-white text-sm font-medium">Create a Nex</Text>
      </View> */}
    </View>
  );
}
