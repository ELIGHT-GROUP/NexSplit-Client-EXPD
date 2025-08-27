import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FormInput } from "@/components/form";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "@/validation/auth.schema";
import { useRegistration } from "@/services/query/auth.query";
import { useSearchParams } from "expo-router/build/hooks";

export default function SignUp() {
  const router = useRouter();
  const params = useSearchParams();
  
  const {cn, fn, ln, un} = Object.fromEntries(params);
  const { mutate: register, isPending } = useRegistration();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data, cn, fn, ln, un);
    register({
      email: data.email,
      password: data.password,
      contactNumber: cn as string,
      firstName: fn as string,
      lastName: ln as string,
      username: un as string,
    });
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

        {/* Email */}
        <Text className="label mb-2">Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              icon="mail"
              placeholder="example@email.com"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Text className="label mt-4 mb-2">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              icon="lock"
              placeholder="••••••••"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}
        <Text className="label mt-4 mb-2">Confirm Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              icon="lock"
              placeholder="••••••••"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
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
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Next"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
