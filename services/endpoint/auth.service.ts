import {
  UserRegisterData,
  EmailVerificationData,
  LoginData,
  RefreshTokenData,
  ResendEmailVerificationData,
  AuthResponse,
  ApiResponse,
} from "@/constants/auth-api-types";
import axiosClient from "../axios.client";

export const UserRegister = async (
  registerData: UserRegisterData
): Promise<ApiResponse> => {
  const response = await axiosClient.post("/auth/register", registerData);
  return response.data;
};

export const VerifyEmail = async (
  verificationData: EmailVerificationData
): Promise<ApiResponse> => {
  const response = await axiosClient.post(
    "/auth/verify-email",
    verificationData
  );
  return response.data;
};

export const UserLogin = async (
  loginData: LoginData
): Promise<AuthResponse> => {
  const response = await axiosClient.post("/auth/login", loginData);
  return response.data;
};

export const RefreshAccessToken = async (
  refreshTokenData: RefreshTokenData
): Promise<AuthResponse> => {
  const response = await axiosClient.post(
    "/auth/refresh-token",
    refreshTokenData
  );
  return response.data;
};

export const ResendEmailVerification = async (
  email: string
): Promise<ApiResponse> => {
  const response = await axiosClient.post("/auth/resend-email-verification", {
    email,
  });
  return response.data;
};
