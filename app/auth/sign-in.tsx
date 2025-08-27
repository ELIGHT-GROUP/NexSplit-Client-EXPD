import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { useLogin } from "@/services/query/auth.query";
import { loginSchema } from "@/validation/auth.schema";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = () => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate the data using Zod schema
    try {
      const validationData = {
        email: email.trim(),
        password: password,
      };

      loginSchema.parse(validationData);

      // Call the API
      login(validationData);
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <View className="flex-1 items-center">
      {/* Content Wrapper (centered & responsive) */}
      <View className="w-full max-w-md px-6 pt-12">
        <View className="mb-6 w-10 h-10"></View>

        {/* Title */}
        <Text className="heading-lg mb-8">Sign In</Text>

        {/* Email */}
        <Text className="label mb-2">Email Address</Text>
        <FormInput
          icon="mail"
          placeholder="example@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (validationErrors.email) {
              setValidationErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          error={validationErrors.email}
        />

        {/* Password */}
        <Text className="label mb-2">Password</Text>
        <FormInput
          icon="lock"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (validationErrors.password) {
              setValidationErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
          error={validationErrors.password}
        />

        {/* Sign In Button */}
        <TouchableOpacity
          className="btn-primary w-full mt-4 py-3 px-4"
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text className="text-white text-center text-base font-medium">
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Sign In"
            )}
          </Text>
        </TouchableOpacity>

        {/* Google Sign In Button */}
        <TouchableOpacity className="flex-row items-center justify-center border bg-light border-gray-300 rounded-lg py-3 mt-4">
          <Image
            source={require("@/assets/icons/google.png")}
            accessibilityLabel="Google Icon"
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          <Text className="text-base font-medium text-dark">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* New User */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray">I’m a new user. </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/sign-up-details")}
          >
            <Text className="text-[#00AA5B] font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
          <Text className="text-gray text-center text-sm font-medium mt-4">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
