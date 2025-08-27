import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { UserRegister, VerifyEmail, UserLogin } from "../endpoint/auth.service";
import Toast from "react-native-toast-message";

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
  return useMutation({
    mutationFn: UserLogin,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Welcome back!",
      });
      // TODO: Store JWT tokens in secure storage
      router.push("/(root)");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Login failed",
        text2: "Please check your credentials and try again",
      });
    },
  });
};
