import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { UserRegister, VerifyEmail, UserLogin } from "../endpoint/auth.service";
import Toast from "react-native-toast-message";
import { useSecureStore } from "@/hooks/useSecureStore";
import { useAuth } from "@/context/AuthContext";

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
      router.push(`/auth/verify-code?email=${responce.data.email}`);
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
