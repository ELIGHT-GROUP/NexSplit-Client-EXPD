import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function SignUpDetails() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center">
      <View className="w-full max-w-md px-6 pt-12">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-6 w-10 h-10 rounded-full items-center justify-center border border-gray-300"
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="heading-lg mb-8">Sign Up</Text>

        {/* First & Last Name */}
        <View className="flex-row space-x-3 mt-4">
          <View className="flex-1">
            <Text className="label mb-2">First Name</Text>
            <FormInput icon="user" placeholder="First name" />
          </View>
          <View className="flex-1">
            <Text className="label mb-2">Last Name</Text>
            <FormInput icon="user" placeholder="Last name" />
          </View>
        </View>

        {/* Username */}
        <Text className="label mt-4 mb-2">Username</Text>
        <FormInput icon="user" placeholder="Username" />

        {/* Contact Number */}
        <Text className="label mt-4 mb-2">Contact Number</Text>
        <FormInput icon="phone" placeholder="Contact number" keyboardType="phone-pad" />

        {/* Next Button */}
        <TouchableOpacity className="btn-primary w-full mt-6 py-3 px-4" onPress={() => router.push("/auth/sign-up")}>
          <Text className="text-white text-center text-base font-medium">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
