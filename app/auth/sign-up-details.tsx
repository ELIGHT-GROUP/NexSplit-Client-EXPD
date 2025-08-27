import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpDetailsSchema,
  SignUpDetailsFormData,
} from "@/validation/auth.schema";

export default function SignUpDetails() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpDetailsFormData>({
    resolver: zodResolver(signUpDetailsSchema),
    mode: "onChange",
  });

    const onSubmit = (data: SignUpDetailsFormData) => {
      router.push(`/auth/sign-up?cn=${data.contactNumber}&fn=${data.firstName}&ln=${data.lastName}&un=${data.username}`);
    };

  return (
    <View className="flex-1 items-center">
      <View className="w-full max-w-md px-6 pt-12">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-6 w-10 h-10 rounded-full items-center justify-center border border-gray-300"
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="heading-lg mb-8">Sign Up</Text>

        {/* First & Last Name */}
        <View className="flex-row space-x-3 mt-4">
          <View className="flex-1">
            <Text className="label mb-2">First Name</Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  icon="user"
                  placeholder="First name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                />
              )}
            />
          </View>
          <View className="flex-1">
            <Text className="label mb-2">Last Name</Text>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  icon="user"
                  placeholder="Last name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                />
              )}
            />
          </View>
        </View>

        {/* Username */}
        <Text className="label mt-4 mb-2">Username</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              icon="user"
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
            />
          )}
        />

        {/* Contact Number */}
        <Text className="label mt-4 mb-2">Contact Number</Text>
        <Controller
          control={control}
          name="contactNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              icon="phone"
              placeholder="Contact number"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.contactNumber?.message}
            />
          )}
        />

        {/* Next Button */}
        <TouchableOpacity
          className={`w-full mt-6 py-3 px-4 rounded-lg ${
            isValid ? "bg-[#00AA5B]" : "bg-gray-300"
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <Text
            className={`text-center text-base font-medium ${
              isValid ? "text-white" : "text-gray-500"
            }`}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
