"use client";

import React from "react";
import { UseFormRegister, FieldErrors, Control, Controller } from "react-hook-form";
import { SignupFormData } from "@/schema/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldSet, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Lock,
  User,
  AtSign,
  Youtube,
  Facebook,
  Instagram,
  Music,
} from "lucide-react";

interface SignupFormStepProps {
  register: UseFormRegister<SignupFormData>;
  control: Control<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  onNext: () => void;
  isLoading?: boolean;
}

export default function SignupFormStep({
  register,
  control,
  errors,
  onNext,
  isLoading = false,
}: SignupFormStepProps) {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0f1724] mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join thousands of creators on CreatorCharts
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email */}
          <FieldSet>
            <FieldLabel>Email Address</FieldLabel>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
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

          {/* Password */}
          <FieldSet>
            <FieldLabel>Password</FieldLabel>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
              <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
              />
            </div>
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </FieldSet>

          {/* Name */}
          <FieldSet>
            <FieldLabel>Full Name</FieldLabel>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
              <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <Input
                {...register("name")}
                placeholder="John Doe"
                className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
              />
            </div>
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </FieldSet>

          {/* Display Name */}
          <FieldSet>
            <FieldLabel>Display Name</FieldLabel>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
              <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                <AtSign className="w-5 h-5 text-gray-600" />
              </div>
              <Input
                {...register("displayName")}
                placeholder="johndoe"
                className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
              />
            </div>
            {errors.displayName && (
              <FieldError>{errors.displayName.message}</FieldError>
            )}
          </FieldSet>

          {/* Country */}
          <FieldSet>
            <FieldLabel>Country</FieldLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-[48px] border-gray-300">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="NZ">New Zealand</SelectItem>
                    <SelectItem value="IE">Ireland</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="PH">Philippines</SelectItem>
                    <SelectItem value="SG">Singapore</SelectItem>
                    <SelectItem value="MY">Malaysia</SelectItem>
                    <SelectItem value="ZA">South Africa</SelectItem>
                    <SelectItem value="NG">Nigeria</SelectItem>
                    <SelectItem value="KE">Kenya</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                    <SelectItem value="AR">Argentina</SelectItem>
                    <SelectItem value="CL">Chile</SelectItem>
                    <SelectItem value="CO">Colombia</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="ES">Spain</SelectItem>
                    <SelectItem value="IT">Italy</SelectItem>
                    <SelectItem value="NL">Netherlands</SelectItem>
                    <SelectItem value="SE">Sweden</SelectItem>
                    <SelectItem value="NO">Norway</SelectItem>
                    <SelectItem value="DK">Denmark</SelectItem>
                    <SelectItem value="FI">Finland</SelectItem>
                    <SelectItem value="PL">Poland</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="KR">South Korea</SelectItem>
                    <SelectItem value="CN">China</SelectItem>
                    <SelectItem value="TW">Taiwan</SelectItem>
                    <SelectItem value="HK">Hong Kong</SelectItem>
                    <SelectItem value="TH">Thailand</SelectItem>
                    <SelectItem value="VN">Vietnam</SelectItem>
                    <SelectItem value="ID">Indonesia</SelectItem>
                    <SelectItem value="AE">United Arab Emirates</SelectItem>
                    <SelectItem value="SA">Saudi Arabia</SelectItem>
                    <SelectItem value="IL">Israel</SelectItem>
                    <SelectItem value="TR">Turkey</SelectItem>
                    <SelectItem value="RU">Russia</SelectItem>
                    <SelectItem value="UA">Ukraine</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <FieldError>{errors.country.message}</FieldError>
            )}
          </FieldSet>

          {/* Social Media Handles Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#0f1724] mb-4">
              Social Media Handles
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Connect at least one platform to continue
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* YouTube */}
              <FieldSet>
                <FieldLabel>YouTube</FieldLabel>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
                  <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                    <Youtube className="w-5 h-5 text-[#FF0000]" />
                  </div>
                  <Input
                    {...register("youtube")}
                    placeholder="@channel"
                    className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
                  />
                </div>
                {errors.youtube && (
                  <FieldError>{errors.youtube.message}</FieldError>
                )}
              </FieldSet>

              {/* Facebook */}
              <FieldSet>
                <FieldLabel>Facebook</FieldLabel>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
                  <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <Input
                    {...register("facebook")}
                    placeholder="username"
                    className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
                  />
                </div>
                {errors.facebook && (
                  <FieldError>{errors.facebook.message}</FieldError>
                )}
              </FieldSet>

              {/* Instagram */}
              <FieldSet>
                <FieldLabel>Instagram</FieldLabel>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
                  <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                    <Instagram className="w-5 h-5 text-[#E4405F]" />
                  </div>
                  <Input
                    {...register("instagram")}
                    placeholder="@username"
                    className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
                  />
                </div>
                {errors.instagram && (
                  <FieldError>{errors.instagram.message}</FieldError>
                )}
              </FieldSet>

              {/* TikTok */}
              <FieldSet>
                <FieldLabel>TikTok</FieldLabel>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
                  <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                    <Music className="w-5 h-5 text-black" />
                  </div>
                  <Input
                    {...register("tiktok")}
                    placeholder="@username"
                    className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
                  />
                </div>
                {errors.tiktok && (
                  <FieldError>{errors.tiktok.message}</FieldError>
                )}
              </FieldSet>

              {/* X (Twitter) */}
              <FieldSet>
                <FieldLabel>X (Twitter)</FieldLabel>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-[48px]">
                  <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <Input
                    {...register("x")}
                    placeholder="@username"
                    className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
                  />
                </div>
                {errors.x && <FieldError>{errors.x.message}</FieldError>}
              </FieldSet>
            </div>
          </div>

          {/* Next Button */}
          <Button
            onClick={onNext}
            disabled={isLoading}
            className="w-full h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg mt-8"
          >
            {isLoading ? "Processing..." : "Continue"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-[#14532d] font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
