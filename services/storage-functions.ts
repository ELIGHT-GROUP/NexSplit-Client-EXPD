// storage.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function getAuthToken() {
  return Platform.OS === "web"
    ? Promise.resolve(localStorage.getItem("refreshToken"))
    : SecureStore.getItemAsync("refreshToken");
}

export async function getAccessToken() {
  return Platform.OS === "web"
    ? Promise.resolve(localStorage.getItem("accessToken"))
    : SecureStore.getItemAsync("accessToken");
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
