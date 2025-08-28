import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Toast from "react-native-toast-message";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      await logout();
      Toast.show({
        type: "success",
        text1: "Logged out successfully",
        text2: "See you next time!",
      });
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      Toast.show({
        type: "error",
        text1: "Logout failed",
        text2: "Please try again",
      });
    }
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile page
    Toast.show({
      type: "info",
      text1: "Edit Profile",
      text2: "This feature is coming soon!",
    });
  };

  const handleSettings = () => {
    router.push("/dev");
  };

  if (!user) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <View className="flex-1 bg-light">
      {/* Header */}
      <LinearGradient
        colors={["#00AA5B", "#00CC6A"]}
        className="pt-12 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={handleBackPress}
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Profile</Text>
          <TouchableOpacity
            onPress={handleSettings}
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
          >
            <Feather name="settings" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View className="items-center">
          <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">
              {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
            </Text>
          </View>
          <Text className="text-white text-xl font-semibold mb-1">
            {user.fullName || `${user.firstName} ${user.lastName}`}
          </Text>
          <Text className="text-white/80 text-sm">{user.email}</Text>
        </View>
      </LinearGradient>

      {/* Profile Content */}
      <ScrollView className="flex-1 px-6 pt-6">
        {/* Edit Profile Button */}
        <TouchableOpacity
          onPress={handleEditProfile}
          className="bg-white rounded-xl p-4 mb-6 flex-row items-center justify-between shadow-sm border border-gray-100"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-[#00AA5B]/10 rounded-full items-center justify-center mr-3">
              <Feather name="edit-3" size={20} color="#00AA5B" />
            </View>
            <Text className="text-gray-800 font-medium">Edit Profile</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#8B8B8B" />
        </TouchableOpacity>

        {/* Personal Information */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Full Name</Text>
              <Text className="text-gray-800 font-medium">
                {user.fullName || `${user.firstName} ${user.lastName}`}
              </Text>
            </View>

            <View className="h-px bg-gray-100" />

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Username</Text>
              <Text className="text-gray-800 font-medium">
                {user.username || "Not set"}
              </Text>
            </View>

            <View className="h-px bg-gray-100" />

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Email</Text>
              <Text className="text-gray-800 font-medium">{user.email}</Text>
            </View>

            <View className="h-px bg-gray-100" />

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Contact Number</Text>
              <Text className="text-gray-800 font-medium">
                {user.contactNumber || "Not provided"}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Information */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Account Status</Text>
              <View className="flex-row items-center">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    user.status === "ACTIVE"
                      ? "bg-green-500"
                      : user.status === "INACTIVE"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
                <Text
                  className={`font-medium ${
                    user.status === "ACTIVE"
                      ? "text-green-600"
                      : user.status === "INACTIVE"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {user.status}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-100" />

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Email Verified</Text>
              <View className="flex-row items-center">
                {user.isEmailValidate ? (
                  <Feather name="check-circle" size={16} color="#00AA5B" />
                ) : (
                  <Feather name="x-circle" size={16} color="#FF6A3D" />
                )}
                <Text
                  className={`ml-1 font-medium ${
                    user.isEmailValidate ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.isEmailValidate ? "Verified" : "Not Verified"}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-100" />

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Google Auth</Text>
              <View className="flex-row items-center">
                {user.isGoogleAuth ? (
                  <Feather name="check-circle" size={16} color="#00AA5B" />
                ) : (
                  <Feather name="x-circle" size={16} color="#8B8B8B" />
                )}
                <Text
                  className={`ml-1 font-medium ${
                    user.isGoogleAuth ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {user.isGoogleAuth ? "Connected" : "Not Connected"}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-100" />

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Member Since</Text>
              <Text className="text-gray-800 font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 rounded-xl p-4 mb-8 flex-row items-center justify-center border border-red-100"
        >
          <Feather name="log-out" size={20} color="#FF6A3D" className="mr-2" />
          <Text className="text-red-600 font-medium ml-2">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
