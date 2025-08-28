import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useSecureStore } from "@/hooks/useSecureStore";

export default function dev() {
  const router = useRouter();
  const { logout } = useAuth();
  const accessToken = useSecureStore("accessToken");
  const refreshToken = useSecureStore("refreshToken");

  return (
    <View>
      <Text>Access Token: {accessToken.value ?? "No access token"}</Text>
      <Text>Refresh Token: {refreshToken.value ?? "No refresh token"}</Text>

      <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text>Main</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/auth/verify-code?email=test@test.com")}
      >
        <Text>Verify Code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
