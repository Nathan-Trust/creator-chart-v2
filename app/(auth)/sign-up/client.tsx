"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  creatorSignupSchema,
  SignupFormData,
  userSignupSchema,
} from "@/schema/auth";
import ProgressTracker from "@/components/auth/progress-tracker";
import SignupFormStep from "@/components/auth/steps/signup-form-step";
import VerificationStep from "@/components/auth/steps/verification-step";
import SuccessStep from "@/components/auth/steps/success-step";
import { useStore } from "@/store/user-store";
import { useSearchParams } from "next/navigation";

export default function SignupClient() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<"creator" | "user">("creator");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingCreatorId, setPendingCreatorId] = useState<string | null>(null);
  const { saveUserData, saveUserToken } = useStore();
  const searchParams = useSearchParams();

  const resolverSchema =
    accountType === "creator" ? creatorSignupSchema : userSignupSchema;
  const { register, handleSubmit, formState, getValues, control } =
    useForm<SignupFormData>({
      resolver: zodResolver(resolverSchema),
    });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "creator" || type === "user") {
      setAccountType(type);
    }
  }, [searchParams]);

  async function handleSignupSubmit(data: SignupFormData) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          accountType,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.user) {
          saveUserData(result.user);
        }
        if (result.token) {
          saveUserToken(result.token);
        }

        if (
          accountType === "creator" &&
          result.verificationCode &&
          result.user
        ) {
          fetch("/api/auth/generate-code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: result.user.email || data.email }),
          }).catch((error) => {
            console.error("Email verification request error:", error);
          });

          setVerificationCode(result.verificationCode);
          setPendingEmail(result.user.email || data.email);
          setPendingCreatorId(result.user.id || null);
          setCurrentStep(1);
          return;
        }

        if (accountType === "user") {
          setCurrentStep(2);
        } else {
          handleNextStep();
        }
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerification(
    email: string,
    code: string,
  ): Promise<boolean> {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-handle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const result = await response.json();

      return response.ok && result.success === true;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerificationComplete() {
    if (!pendingCreatorId) {
      alert("Missing creator profile for verification");
      return;
    }

    try {
      const response = await fetch("/api/creator/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: pendingCreatorId,
          code: verificationCode,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        handleNextStep();
      } else {
        alert(result.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification completion error:", error);
      alert("An error occurred during verification");
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
      errors={formState.errors}
      onNext={handleSubmit(handleSignupSubmit)}
      isLoading={isLoading}
      accountType={accountType}
    />,
    <VerificationStep
      key="verify"
      verificationCode={verificationCode}
      email={pendingEmail || getValues("email") || ""}
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
