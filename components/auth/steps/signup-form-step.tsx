"use client";

import React, { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
} from "react-hook-form";
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
  AtSign,
  Youtube,
  Facebook,
  Instagram,
  Eye,
  EyeOff,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { RiTiktokFill } from "react-icons/ri";

interface SignupFormStepProps {
  register: UseFormRegister<SignupFormData>;
  control: Control<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  onNext: () => void;
  isLoading?: boolean;
  accountType: "creator" | "user";
}

export default function SignupFormStep({
  register,
  control,
  errors,
  onNext,
  isLoading = false,
  accountType,
}: SignupFormStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0f1724] mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            {accountType === "creator"
              ? "Join thousands of creators on CreatorCharts"
              : "Follow your favorite creators on CreatorCharts"}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <FieldSet>
            <FieldLabel>Confirm Password</FieldLabel>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
              <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <Input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="border-0 rounded-none h-full px-4 text-[15px] focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="w-12 flex items-center justify-center bg-gray-50 border-l border-gray-300 hover:bg-gray-100"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <FieldError>{errors.confirmPassword.message}</FieldError>
            )}
          </FieldSet>

          {/* Display Name */}
          <FieldSet>
            <FieldLabel>Display Name</FieldLabel>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
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

          {accountType === "creator" && (
            <>
              {/* Country */}
              <FieldSet>
                <FieldLabel>Country</FieldLabel>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-12! border-gray-300 rounded-lg bg-white">
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

              {/* Category */}
              <FieldSet>
                <FieldLabel>Category</FieldLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-12! border-gray-300 rounded-lg bg-white">
                        <SelectValue placeholder="Select your category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[260px]">
                        <SelectItem value="Comedy">Comedy</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <FieldError>{errors.category.message}</FieldError>
                )}
              </FieldSet>
            </>
          )}

          {/* Social Media Handles Section */}
          {accountType === "creator" && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-[#0f1724] ">
                Social Media Handles
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Connect at least one platform to continue
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* YouTube */}
                <FieldSet>
                  <FieldLabel>YouTube</FieldLabel>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
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
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
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
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
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
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
                    <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                      <RiTiktokFill className="w-5 h-5 text-black" />
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
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white h-12">
                    <div className="w-12 flex items-center justify-center bg-gray-50 border-r border-gray-300">
                      <FaXTwitter className="w-5 h-5 text-black" />
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
          )}

          <FieldSet>
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                {...register("termsAndConditionsAccepted")}
                className="h-4 w-4 rounded border-gray-300 text-[#14532d] focus:ring-[#14532d]"
              />
              I agree to the terms and conditions
            </label>
            {errors.termsAndConditionsAccepted && (
              <FieldError>
                {errors.termsAndConditionsAccepted.message}
              </FieldError>
            )}
          </FieldSet>

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
