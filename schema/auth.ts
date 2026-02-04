import { z } from "zod";

// Step 1: Complete Signup Form Schema
export const signupFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number",
    ),
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Please select your country"),
  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  youtube: z
    .string()
    .regex(/^$|^@?[a-zA-Z0-9_-]+$/, "Please enter a valid YouTube handle")
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .regex(/^$|^[a-zA-Z0-9.]+$/, "Please enter a valid Facebook handle")
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .regex(/^$|^@?[a-zA-Z0-9._]+$/, "Please enter a valid Instagram handle")
    .optional()
    .or(z.literal("")),
  tiktok: z
    .string()
    .regex(/^$|^@?[a-zA-Z0-9._]+$/, "Please enter a valid TikTok handle")
    .optional()
    .or(z.literal("")),
  x: z
    .string()
    .regex(/^$|^@?[a-zA-Z0-9_]+$/, "Please enter a valid X (Twitter) handle")
    .optional()
    .or(z.literal("")),
});

// Step 2: Verification Schema
export const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(6, "Verification code must be 6 characters"),
  platform: z.enum(["youtube", "facebook", "instagram", "tiktok", "x"], {
    message: "Please select a platform to verify",
  }),
  platformHandle: z.string().min(1, "Platform handle is required"),
});

// Combined type for the entire signup flow
export const completeSignupSchema = z.object({
  ...signupFormSchema.shape,
  verified: z.boolean().default(false),
  verifiedPlatform: z.string().optional(),
  verifiedPlatforms: z.array(z.string()).optional(),
});

// Type Exports
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type VerificationData = z.infer<typeof verificationSchema>;
export type CompleteSignupData = z.infer<typeof completeSignupSchema>;
