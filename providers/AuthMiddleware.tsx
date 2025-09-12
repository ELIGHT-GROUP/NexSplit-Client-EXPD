// AuthMiddleware.tsx
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import SplashScreen from "@/components/common/SplashScreen";
import { useRouter } from "expo-router";
import { useUserProfile } from "@/services/query/user.query";
import Toast from "react-native-toast-message";

export const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, loading, user } = useAuth();
  const router = useRouter();

  const {
    data: userProfile,
    isLoading: userLoading,
    error,
  } = useUserProfile(!loading && !user);

  // Handle user profile errors with toast
  useEffect(() => {
    if (error && !loading) {
      console.log("Error fetching user profile:", error);

      // Use router.push instead of replace for better navigation
      router.push("/auth/sign-in");

      Toast.show({
        type: "error",
        text1: "Failed to load profile",
        text2: "Please try again later",
      });
    }
  }, [error, loading, router]);

  // Redirect to sign-in if no token
  useEffect(() => {
    if (!loading && !token) {
      console.log("Redirecting to sign-in...");
      router.push("/auth/sign-in");
    }
  }, [loading, token, router]);

  // TODO: Remove this
  console.log("loading", loading);
  console.log("token", token);
  console.log("user", user);
  console.log("userProfile", userProfile);
  console.log("userLoading", userLoading);
  console.log("error", error);

  // Show loading screen while loading
  if (loading || userLoading) {
    return <SplashScreen />;
  }

  // Redirect to sign-in if error or no user data
  if (error || !token || (token && !user && !userProfile)) {
    console.log("Error fetching user profile:", error);
    router.push("/auth/sign-in");
    return null;
  }

  return <>{children}</>;
};
