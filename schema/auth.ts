import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

const baseSignupSchema = {
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Confirm your password"),
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
  termsAndConditionsAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the terms to continue"),
};

const withPasswordMatch = <T extends z.ZodTypeAny>(schema: T) =>
  schema.superRefine((data: unknown, ctx) => {
    const d = data as { password?: string; confirmPassword?: string };
    if (d.password !== d.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// Creator signup schema
export const creatorSignupSchema = withPasswordMatch(
  z
    .object({
      ...baseSignupSchema,
      country: z.string().min(1, "Please select your country"),
      category: z.string().min(1, "Please select a category"),
    })
    .superRefine((data, ctx) => {
      const hasHandle =
        !!data.youtube ||
        !!data.facebook ||
        !!data.instagram ||
        !!data.tiktok ||
        !!data.x;
      if (!hasHandle) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Add at least one social handle",
          path: ["instagram"],
        });
      }
    }),
);

// User signup schema
export const userSignupSchema = withPasswordMatch(z.object(baseSignupSchema));

// Verification schema for creator profile verification
export const verificationSchema = z.object({
  verificationCode: z
    .string()
    .min(1, "Verification code is required")
    .max(64, "Verification code is too long"),
});

// Type Exports
export type CreatorSignupFormData = z.infer<typeof creatorSignupSchema>;
export type UserSignupFormData = z.infer<typeof userSignupSchema>;
export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
  country?: string;
  category?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  x?: string;
  termsAndConditionsAccepted: boolean;
};
export type VerificationData = z.infer<typeof verificationSchema>;
