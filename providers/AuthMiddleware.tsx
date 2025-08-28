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
  const { token, loading, setUser, user } = useAuth();
  const router = useRouter();

  const {
    data: userProfile,
    isLoading: userLoading,
    error,
  } = useUserProfile(!!token && !user);

  // Handle user profile errors with toast
  useEffect(() => {
    if (error) {
      console.error("Error fetching user profile:", error);
      Toast.show({
        type: "error",
        text1: "Failed to load profile",
        text2: "Please try again later",
      });
    }
  }, [error]);

  useEffect(() => {
    if (userProfile && !user) {
      setUser(userProfile);
    }
  }, [userProfile, user, setUser]);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/auth/sign-in");
    }
  }, [loading, token, router]);

  if (loading || userLoading) {
    return <SplashScreen />;
  }

  if (error || !token || !user) {
    console.error("Error fetching user profile:", error);
    router.push("/auth/sign-in");
  }

  return <>{children}</>;
};
