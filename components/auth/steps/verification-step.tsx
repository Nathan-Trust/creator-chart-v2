"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";

interface VerificationStepProps {
  verificationCode: string;
  email: string;
  onVerify: (email: string, code: string) => Promise<boolean>;
  onNext: () => void;
  isVerifying?: boolean;
}

export default function VerificationStep({
  verificationCode,
  email,
  onVerify,
  onNext,
  isVerifying = false,
}: VerificationStepProps) {
  const [copied, setCopied] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (!email || !emailCode) {
      setEmailError("Enter the verification code from your email.");
      return;
    }

    setEmailError(null);
    const success = await onVerify(email, emailCode);
    if (success) {
      setEmailVerified(true);
      setVerificationStatus({
        success: true,
        message:
          "Email verified. Add the creator code to your bio to continue.",
      });
    } else {
      setVerificationStatus({
        success: false,
        message: "Verification failed. Please check the code and try again.",
      });
    }
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#14532d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#14532d]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f1724] mb-2">
            Verify Your Account
          </h1>
          <p className="text-gray-600">
            Add this code to your social media bio to verify ownership
          </p>
        </div>

        {/* Verification Code */}
        <div className="bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-2 border-[#14532d] rounded-xl p-6 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Your Verification Code</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-mono font-bold text-[#14532d] tracking-wider">
                {verificationCode}
              </span>
              <Button
                onClick={handleCopyCode}
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#0f1724] mb-2">How to verify:</h3>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Check your email for the verification code</li>
            <li>Enter the code below and click &quot;Verify Email&quot;</li>
            <li>Copy the creator code and add it to your social bio</li>
            <li>Click &quot;Verify Creator&quot; once the code is live</li>
          </ol>
        </div>

        {/* Email Verification */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email verification code
          </label>
          <div className="flex gap-3">
            <Input
              value={emailCode}
              onChange={(event) => setEmailCode(event.target.value)}
              placeholder="Enter code from email"
              className="h-12"
            />
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          </div>
          {emailError && <FieldError>{emailError}</FieldError>}
        </div>

        {/* Status Messages */}
        {verificationStatus && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              verificationStatus.success
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <p className="text-sm">{verificationStatus.message}</p>
          </div>
        )}

        {/* Verify Creator Button */}
        <Button
          onClick={handleContinue}
          disabled={!emailVerified}
          className="w-full h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
        >
          Verify Creator
        </Button>
      </div>
    </div>
  );
}
