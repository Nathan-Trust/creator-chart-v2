"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, SignupFormData } from "@/schema/auth";
import ProgressTracker from "@/components/auth/progress-tracker";
import SignupFormStep from "@/components/auth/steps/signup-form-step";
import VerificationStep from "@/components/auth/steps/verification-step";
import SuccessStep from "@/components/auth/steps/success-step";

export default function SignupClient() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });

  async function handleSignupSubmit(data: SignupFormData) {
    setIsLoading(true);

    try {
      // Generate verification code via API
      const response = await fetch("/api/auth/generate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok && result.code) {
        setVerificationCode(result.code);
        setCurrentStep(1); // Move to verification step
      } else {
        alert(result.error || "Failed to generate verification code");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerification(
    platform: string,
    handle: string,
  ): Promise<boolean> {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-handle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: verificationCode,
          platform,
          handle,
        }),
      });

      const result = await response.json();

      return response.ok && result.verified === true;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerificationComplete(verifiedPlatforms: string[]) {
    // Complete signup with verified status
    const formData = getValues();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          country: formData.country,
          verified: verifiedPlatforms.length > 0,
          verifiedPlatform: verifiedPlatforms[0] || undefined, // Keep for legacy/primary
          verifiedPlatforms: verifiedPlatforms,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        handleNextStep();
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup completion error:", error);
      alert("An error occurred during signup completion");
    }
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    <SignupFormStep
      key="signup"
      register={register}
      control={control}
      errors={errors}
      onNext={handleSubmit(handleSignupSubmit)}
      isLoading={isLoading}
    />,
    <VerificationStep
      key="verify"
      verificationCode={verificationCode}
      socialHandles={getValues()}
      onVerify={handleVerification}
      onNext={handleVerificationComplete}
      isVerifying={isLoading}
    />,
    <SuccessStep key="success" />,
  ];

  return (
    <>
      <ProgressTracker currentStep={currentStep + 1} />
      {steps[currentStep]}
    </>
  );
}
