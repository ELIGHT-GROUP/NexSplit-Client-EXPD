import { z } from "zod";

// Sign Up Details Schema
export const signUpDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be less than 15 digits"),
});

// Profile Edit Schema
export const profileEditSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be less than 15 digits"),
});

// Password Change Schema
export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

// Type exports
export type SignUpDetailsFormData = z.infer<typeof signUpDetailsSchema>;
export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
