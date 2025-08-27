import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function NewPasswordSuccess() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center">
      <View className="w-full h-full max-w-md px-6 py-12 flex flex-col items-start justify-center">
        {/* Lottie Animation */}
        <View className="flex items-center justify-center w-full">
          <View className="flex items-center justify-center w-[200px] h-[200px] overflow-hidden">
            <LottieView
              source={require("@/assets/animation/success.json")}
              autoPlay
              loop={false}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>

        <View className="w-full">
          {/* Title */}
          <View className="w-full px-4">
            <Text className="heading-lg text-center mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl">
              Success!
            </Text>
          </View>
          {/* Description */}
          <View className="w-full px-4">
            <Text className="body-text text-center mt-1 sm:mt-2 md:mt-3 text-gray-600 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              Your password was changed successfully.
            </Text>
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity
          className="btn-primary w-full mt-6 py-3 px-4"
          onPress={() => router.push("/")}
        >
          <Text className="text-white text-center text-base font-medium">
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
