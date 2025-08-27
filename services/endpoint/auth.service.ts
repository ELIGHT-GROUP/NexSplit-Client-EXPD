import {
  UserRegisterData,
  EmailVerificationData,
  LoginData,
} from "@/constants/auth-api-types";
import axiosClient from "../axios.client";

export const UserRegister = async (registerData: UserRegisterData) => {
  const response = await axiosClient.post("/auth/register", registerData);
  return response.data;
};

export const VerifyEmail = async (verificationData: EmailVerificationData) => {
  const response = await axiosClient.post(
    "/auth/verify-email",
    verificationData
  );
  return response.data;
};

export const UserLogin = async (loginData: LoginData) => {
  const response = await axiosClient.post("/auth/login", loginData);
  return response.data;
};
