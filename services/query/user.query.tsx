import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetUserProfile,
  UpdateUserProfile,
  ChangePassword,
  RequestPasswordReset,
} from "../endpoint/user.service";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export const useUserProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: GetUserProfile,
    enabled: enabled,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateUserProfile,
    onSuccess: (data) => {
      // Update the user profile in cache
      queryClient.setQueryData(["userProfile"], data);

      // Invalidate to trigger a refetch and ensure all components get fresh data
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
        exact: false,
      });

      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
        text2: "Your changes have been saved",
      });
    },
    onError: (error: any) => {
      console.error("Update profile error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to update profile",
        text2: error.response?.data?.message || "Please try again",
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ChangePassword,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Password changed successfully",
        text2: "Your password has been updated",
      });
    },
    onError: (error: any) => {
      console.error("Change password error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to change password",
        text2:
          error.response?.data?.message ||
          "Please check your current password and try again",
      });
    },
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: RequestPasswordReset,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Password reset email sent",
        text2: "Please check your inbox for reset instructions",
      }); // TODO: Change to verify-email
      router.push(`/auth/verify-code?email=${"2l749c5t53@cmhvzylmfc.com"}&type=reset-password`);
    },
    onError: (error: any) => {
      console.error("Request password reset error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to send reset email",
        text2: error.response?.data?.message || "Please try again later",
      });
    },
  });
};
