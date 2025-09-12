import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Toast from "react-native-toast-message";
import {
  ProfileHeader,
  PersonalInfoSection,
  AccountInfoSection,
  EditProfileButton,
  LogoutButton,
  ProfileEditSheet,
  PasswordChangeSheet,
} from "@/components/sections/profile_section";
import {
  useUpdateUserProfile,
  useChangePassword,
} from "@/services/query/user.query";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Sheet states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

  // API hooks
  const {
    mutate: updateProfile,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateUserProfile();
  const {
    mutate: changePassword,
    isPending: isPasswordPending,
    isSuccess: isPasswordSuccess,
  } = useChangePassword();

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
    setIsEditProfileOpen(true);
  };

  const handleChangePassword = () => {
    setIsPasswordChangeOpen(true);
  };

  const handleUpdateProfile = (data: {
    firstName: string;
    lastName: string;
    username: string;
    contactNumber: string;
  }) => {
    updateProfile(data);
  };

  const handlePasswordChange = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    changePassword(data);
  };

  const handleSettings = () => {
    router.push("/dev");
  };

  if (!user) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <View className="flex-1 bg-light">
      {/* Profile Header */}
      <ProfileHeader
        user={user}
        onBackPress={handleBackPress}
        onSettingsPress={handleSettings}
      />

      {/* Profile Content */}
      <ScrollView className="flex-1 px-6 pt-6">
        {/* Edit Profile Buttons */}
        <EditProfileButton
          onEditProfile={handleEditProfile}
          onChangePassword={handleChangePassword}
        />

        {/* Personal Information */}
        <PersonalInfoSection user={user} />

        {/* Account Information */}
        <AccountInfoSection user={user} />

        {/* Logout Button */}
        <LogoutButton onPress={handleLogout} />
      </ScrollView>

      {/* Profile Edit Sheet */}
      <ProfileEditSheet
        isOpen={isEditProfileOpen}
        setOpen={setIsEditProfileOpen}
        user={user}
        onSubmit={handleUpdateProfile}
        isPending={isUpdatePending}
        isSuccess={isUpdateSuccess}
      />

      {/* Password Change Sheet */}
      <PasswordChangeSheet
        isOpen={isPasswordChangeOpen}
        setOpen={setIsPasswordChangeOpen}
        onSubmit={handlePasswordChange}
        isPending={isPasswordPending}
        isSuccess={isPasswordSuccess}
      />
    </View>
  );
}
