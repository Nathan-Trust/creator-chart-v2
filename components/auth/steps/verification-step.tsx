"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  RefreshCw,
  Youtube,
  Facebook,
  Instagram,
  Music,
} from "lucide-react";

interface VerificationStepProps {
  verificationCode: string;
  socialHandles: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
  };
  onVerify: (platform: string, handle: string) => Promise<boolean>;
  onNext: (verifiedPlatforms: string[]) => void;
  isVerifying?: boolean;
}

export default function VerificationStep({
  verificationCode,
  socialHandles,
  onVerify,
  onNext,
  isVerifying = false,
}: VerificationStepProps) {
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [verifiedPlatforms, setVerifiedPlatforms] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const platforms = [
    {
      key: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "#FF0000",
      handle: socialHandles.youtube,
    },
    {
      key: "facebook",
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      handle: socialHandles.facebook,
    },
    {
      key: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "#E4405F",
      handle: socialHandles.instagram,
    },
    {
      key: "tiktok",
      name: "TikTok",
      icon: Music,
      color: "#000000",
      handle: socialHandles.tiktok,
    },
    {
      key: "x",
      name: "X (Twitter)",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "#000000",
      handle: socialHandles.x,
    },
  ].filter((p) => p.handle);

  const togglePlatform = (key: string) => {
    if (verifiedPlatforms.includes(key)) return; // Don't toggle if already verified

    setSelectedPlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (selectedPlatforms.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results:any = [];
    let successCount = 0;

    for (const key of selectedPlatforms) {
      const platform = platforms.find((p) => p.key === key);
      if (!platform || !platform.handle) continue;

      const success = await onVerify(key, platform.handle);
      if (success) {
        results.push(key);
        successCount++;
      }
    }

    if (successCount > 0) {
      const newVerified = [...new Set([...verifiedPlatforms, ...results])];
      setVerifiedPlatforms(newVerified);
      // Remove successfully verified from selected so they can't be selected again easily?
      // Or just mark them visually.
      setSelectedPlatforms((prev) => prev.filter((p) => !results.includes(p)));

      setVerificationStatus({
        success: true,
        message:
          successCount === selectedPlatforms.length
            ? "All selected platforms verified successfully!"
            : `${successCount} out of ${selectedPlatforms.length} platforms verified.`,
      });
    } else {
      setVerificationStatus({
        success: false,
        message: "Verification failed. Please check your bio and try again.",
      });
    }
  };

  const handleContinue = () => {
    onNext(verifiedPlatforms);
  };

  return (
    <div className="p-8 md:p-12">
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
            <li>Copy the verification code above</li>
            <li>Add it to your bio on your connected social platforms</li>
            <li>Select the platforms below and click &quot;Verify Now&quot;</li>
          </ol>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select platforms to verify
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.key);
              const isVerified = verifiedPlatforms.includes(platform.key);

              return (
                <button
                  key={platform.key}
                  onClick={() => togglePlatform(platform.key)}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all relative ${
                    isVerified
                      ? "border-green-500 bg-green-50"
                      : isSelected
                        ? "border-[#14532d] bg-[#14532d]/5"
                        : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Icon className="w-6 h-6" style={{ color: platform.color }} />
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">{platform.name}</p>
                    <p className="text-xs text-gray-500">{platform.handle}</p>
                  </div>
                  {isVerified && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Verification Status */}
        {verificationStatus && (
          <div
            className={`rounded-lg p-4 mb-6 ${
              verificationStatus.success
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                verificationStatus.success ? "text-green-800" : "text-red-800"
              }`}
            >
              {verificationStatus.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleVerify}
            disabled={selectedPlatforms.length === 0 || isVerifying}
            className="flex-1 h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Selected"
            )}
          </Button>

          {verifiedPlatforms.length > 0 && (
            <Button
              onClick={handleContinue}
              className="flex-1 h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
