// storage.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function getRefreshToken() {
  return Platform.OS === "web"
    ? Promise.resolve(localStorage.getItem("refreshToken"))
    : SecureStore.getItemAsync("refreshToken");
}

export async function getAccessToken() {
  return Platform.OS === "web"
    ? Promise.resolve(localStorage.getItem("accessToken"))
    : SecureStore.getItemAsync("accessToken");
}

export async function saveAccessToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("accessToken", token);
    return Promise.resolve();
  }
  await SecureStore.setItemAsync("accessToken", token);
  return Promise.resolve();
}

export async function saveRefreshToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("refreshToken", token);
    return Promise.resolve();
  }
  await SecureStore.setItemAsync("refreshToken", token);
  return Promise.resolve();
}

// Save both tokens together (useful when both are returned from refresh)
export async function saveTokens(accessToken: string, refreshToken: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return Promise.resolve();
  }
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  return Promise.resolve();
}

export async function removeAuthToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    return Promise.resolve();
  }
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("accessToken");
  return Promise.resolve();
}

// Remove only access token (useful when refresh token is still valid)
export async function removeAccessToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("accessToken");
    return Promise.resolve();
  }
  await SecureStore.deleteItemAsync("accessToken");
  return Promise.resolve();
}
