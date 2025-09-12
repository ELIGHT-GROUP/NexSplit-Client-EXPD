import {
  UserProfile,
  UpdateUserProfileData,
  ChangePasswordData,
} from "@/constants/user-api-types";
import axiosClient from "../axios.client";

export const GetUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosClient.get("/users/profile");
  return response.data;
};

export const UpdateUserProfile = async (
  profileData: UpdateUserProfileData
): Promise<UserProfile> => {
  const response = await axiosClient.put("/users/profile", profileData);
  return response.data;
};

export const ChangePassword = async (
  passwordData: ChangePasswordData
): Promise<{ message: string }> => {
  const response = await axiosClient.post(
    "/users/change-password",
    passwordData
  );
  return response.data;
};

export const RequestPasswordReset = async (
  email: string
): Promise<{ message: string }> => {
  const response = await axiosClient.post("/users/request-password-reset", {
    email,
  });
  return response.data;
};
