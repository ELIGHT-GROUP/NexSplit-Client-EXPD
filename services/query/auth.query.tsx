import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  UserRegister,
  VerifyEmail,
  UserLogin,
  RefreshAccessToken,
  ResendEmailVerification,
} from "../endpoint/auth.service";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import { saveTokens } from "../storage-functions";

export const useRegistration = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: UserRegister,
    onSuccess: (responce) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "Please verify your code",
      });
      router.push(`/auth/verify-code?email=${responce.data.email}&type=register`);
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.response.data.message || "Something went wrong",
        text2: "Try again",
      });
    },
  });
};

export const useEmailVerification = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: VerifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Toast.show({
        type: "success",
        text1: "Email verified successfully",
        text2: "You can now sign in to your account",
      });
      router.push("/auth/auth-success");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Verification failed",
        text2: "Please check your code and try again",
      });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { login } = useAuth();
  return useMutation({
    mutationFn: UserLogin,
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (response && response.refreshToken) {
        // Save both tokens if both are provided
        if (response.accessToken && response.refreshToken) {
          await saveTokens(response.accessToken, response.refreshToken);
        }
        await login(response.refreshToken);
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "Welcome back!",
        });
        router.push("/(root)");
      } else {
        console.error("Invalid response structure:", response);
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: "Invalid response from server",
        });
      }
    },
    onError: (error: any) => {
      console.log("Login error:", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Login failed",
        text2: "Please check your credentials and try again",
      });
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: RefreshAccessToken,
    onSuccess: async (response) => {
      if (response && response.accessToken) {
        // Save both tokens if both are returned
        if (response.refreshToken) {
          await saveTokens(response.accessToken, response.refreshToken);
          await login(response.refreshToken);
        } else {
          // If only access token is returned, just save it
          await login(response.refreshToken || "");
        }
        // Optionally invalidate queries that might need fresh data
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: any) => {
      console.log("Token refresh error:", error);
      // If refresh fails, user should be logged out
      // This will be handled by the axios interceptor
    },
  });
};

export const useResendEmailVerification = () => {
  return useMutation({
    mutationFn: ResendEmailVerification,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Verification email sent",
        text2: "Please check your inbox for the verification code",
      });
    },
    onError: (error: any) => {
      console.error("Resend email verification error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to resend verification email",
        text2: error.response?.data?.message || "Please try again later",
      });
    },
  });
};
