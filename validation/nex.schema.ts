import { z } from "zod";

// Nex Create Schema
export const nexCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Nex name is required")
    .min(2, "Nex name must be at least 2 characters")
    .max(50, "Nex name must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
  imageUrl: z.string().optional(),
  settlementType: z.enum(["DETAILED", "SIMPLIFIED"]),
  nexType: z.enum(["PERSONAL", "GROUP"]),
});

// Type exports
export type NexCreateFormData = z.infer<typeof nexCreateSchema>;
