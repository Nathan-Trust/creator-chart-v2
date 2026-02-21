"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: { email: string }) =>
      AuthService.forgotPassword({ email: data.email }),
    onSuccess: (_result, variables) => {
      setEmail(variables.email);
      setIsSubmitted(true);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to send reset email. Please try again.";
      setErrorMessage(message);
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setErrorMessage("");
    forgotPasswordMutation.mutate({ email: data.email });
  };

  if (isSubmitted) {
    return (
      <div className="w-full">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Check your email</h1>
          <p className="text-gray-600">
            We sent a password reset code to <strong>{email}</strong>
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Didn&apos;t receive the email? Check your spam folder or try
              again.
            </p>
          </div>

          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0f1724] mb-2">
          Forgot password?
        </h1>
        <p className="text-gray-600">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14532d] focus:border-transparent"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="w-full h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {forgotPasswordMutation.isPending ? "Sending..." : "Send reset link"}
        </button>

        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-2 w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
