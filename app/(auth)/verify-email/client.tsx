"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Mail } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { errorToast, successToast } from "@/util/toast";
import Link from "next/link";

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const redirectParam = searchParams.get("redirect") || "/sign-in";

  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [hasSentInitial, setHasSentInitial] = useState(false);

  // Send OTP automatically on mount if we have an email
  useEffect(() => {
    if (emailParam && !hasSentInitial) {
      setHasSentInitial(true);
      AuthService.requestEmailVerification({ email: emailParam }).catch(
        (err: unknown) => {
          const error = err as { response?: { data?: { message?: string } } };
          const msg =
            error?.response?.data?.message ||
            "Failed to send verification code";
          errorToast({ title: "Verification", message: msg });
        },
      );
    }
  }, [emailParam, hasSentInitial]);

  async function handleResendOtp() {
    if (!emailParam) return;

    setIsResending(true);
    try {
      await AuthService.requestEmailVerification({ email: emailParam });
      successToast({
        title: "OTP Sent",
        message: `Verification code sent to ${emailParam}`,
      });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg =
        error?.response?.data?.message || "Failed to send verification code";
      errorToast({ title: "Resend OTP", message: msg });
    } finally {
      setIsResending(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otpCode.trim()) {
      setOtpError("Enter the verification code from your email.");
      return;
    }

    setOtpError("");
    setIsVerifying(true);
    try {
      const result = await AuthService.verifyEmailOtp({
        email: emailParam,
        code: otpCode,
      });
      if (result.success) {
        successToast({
          title: "Verified",
          message: "Email verified successfully! Please sign in.",
        });
        router.push(redirectParam);
      } else {
        setOtpError(result.message || "Verification failed. Try again.");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg =
        error?.response?.data?.message || "Verification failed. Try again.";
      setOtpError(msg);
    } finally {
      setIsVerifying(false);
    }
  }

  if (!emailParam) {
    return (
      <div className="w-full">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f1724] mb-2">
            Missing Email
          </h1>
          <p className="text-gray-600">
            No email address provided for verification.
          </p>
        </div>
        <Link
          href="/sign-in"
          className="flex items-center justify-center w-full h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="w-16 h-16 bg-[#14532d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-[#14532d]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0f1724] mb-2 text-center">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-center">
          We sent a verification code to <strong>{emailParam}</strong>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <div className="flex gap-3">
            <Input
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter code from email"
              className="h-12"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleVerifyOtp();
              }}
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white px-6"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
          {otpError && <p className="text-sm text-red-600 mt-2">{otpError}</p>}
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Didn&apos;t receive the code? Check your spam folder or{" "}
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className="font-semibold underline hover:no-underline disabled:opacity-50"
            >
              {isResending ? "sending..." : "resend code"}
            </button>
          </p>
        </div>

        <Link
          href="/sign-in"
          className="flex items-center justify-center w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
