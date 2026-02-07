"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldSet, FieldLabel, FieldError } from "@/components/ui/field";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/");
      } else {
        setErrorMessage(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full p-4 md:p-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0f1724] mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your CreatorCharts account</p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet>
          <FieldLabel>Email Address</FieldLabel>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
            <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
            />
          </div>
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </FieldSet>

        <FieldSet>
          <FieldLabel>Password</FieldLabel>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
            <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
              <Lock className="w-5 h-5 text-gray-600" />
            </div>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="w-12 flex items-center justify-center bg-gray-50 border-l border-gray-300 hover:bg-gray-100"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <Eye className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </FieldSet>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-[#14532d] border-gray-300 rounded focus:ring-[#14532d]"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me for 30 days
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[#14532d] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[#14532d] font-semibold hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </form>
    </div>
  );
}
