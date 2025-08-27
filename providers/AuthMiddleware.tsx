// AuthMiddleware.tsx
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import SplashScreen from "@/components/common/SplashScreen";
import { useRouter } from "expo-router";

export const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/auth/sign-in");
    }
  }, [loading, token, router]);

  if (loading || !token) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
