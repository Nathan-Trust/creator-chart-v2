"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, SignupFormData } from "@/schema/auth";
import ProgressTracker from "@/components/auth/progress-tracker";
import SignupFormStep from "@/components/auth/steps/signup-form-step";
import VerificationStep from "@/components/auth/steps/verification-step";
import SuccessStep from "@/components/auth/steps/success-step";
import { authService } from "@/services/auth";

export default function SignupClient() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });

  async function handleSignupSubmit(data: SignupFormData) {
    setIsLoading(true);

    try {
      // Generate verification code
      const codeResponse = await authService.generateVerificationCode(
        data.email,
      );

      if (codeResponse.success && codeResponse.data) {
        setVerificationCode(codeResponse.data.code);
        setCurrentStep(1); // Move to verification step
      } else {
        alert(codeResponse.error || "Failed to generate verification code");
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
      const response = await authService.verifySocialHandle(
        verificationCode,
        platform,
        handle,
      );

      return response.success && !!response.data?.verified;
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
    const signupResponse = await authService.signup({
      ...formData,
      verified: verifiedPlatforms.length > 0,
      verifiedPlatform: verifiedPlatforms[0] || undefined, // Keep for legacy/primary
      verifiedPlatforms: verifiedPlatforms,
    });

    if (signupResponse.success) {
      handleNextStep();
    }
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    <SignupFormStep
      key="signup"
      register={register}
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
