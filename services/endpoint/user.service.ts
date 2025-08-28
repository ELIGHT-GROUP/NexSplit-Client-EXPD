import { UserProfile } from "@/constants/user-api-types";
import axiosClient from "../axios.client";

export const GetUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosClient.get("/users/profile");
  return response.data;
};
