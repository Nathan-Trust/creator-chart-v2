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
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { errorToast } from "@/util/toast";

export default function SignupClient() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<"creator" | "user">("creator");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingCreatorId, setPendingCreatorId] = useState<string | null>(null);
  const { saveUserData, saveUserToken } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();

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

  // Mutation for sign up
  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      if (accountType === "creator") {
        // Transform flat form fields into the API shape with nested socialHandles
        const { youtube, facebook, instagram, tiktok, x, ...rest } = data;
        const socialHandles: Record<string, string> = {};
        if (youtube) socialHandles.youtube = youtube;
        if (facebook) socialHandles.facebook = facebook;
        if (instagram) socialHandles.instagram = instagram;
        if (tiktok) socialHandles.tiktok = tiktok;
        if (x) socialHandles.x = x;

        return await AuthService.signupCreator({
          email: rest.email,
          password: rest.password,
          confirmPassword: rest.confirmPassword,
          displayName: rest.displayName,
          termsAndConditionsAccepted: rest.termsAndConditionsAccepted,
          country: rest.country!,
          category: rest.category!,
          socialHandles,
        });
      } else {
        return await AuthService.signupUser({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          displayName: data.displayName,
          termsAndConditionsAccepted: data.termsAndConditionsAccepted,
        });
      }
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (result, data) => {
      if (result && result.success) {
        if (result.data?.user) {
          saveUserData(result.data.user);
        }
        if (result.data?.accessToken) {
          saveUserToken(result.data.accessToken);
        }

        const email = result.data?.user?.email || data.email;
        setPendingEmail(email);

        if (accountType === "creator") {
          setVerificationCode(result.data?.verificationCode || "");
          setPendingCreatorId(
            result.data?.creator?._id ||
              result.data?.user?.claimedCreatorId ||
              result.data?.user?.id ||
              null,
          );
        }

        // Both roles go to verification step
        setCurrentStep(1);
      } else {
        errorToast({
          title: "Signup",
          message: result?.message || "Signup failed",
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Signup error:", error);
      const message =
        error?.response?.data?.message || error?.message || "Signup failed";
      errorToast({ title: "Signup", message });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  function handleSignupSubmit(data: SignupFormData) {
    signupMutation.mutate(data);
  }

  async function handleVerification(
    email: string,
    code: string,
  ): Promise<boolean> {
    setIsLoading(true);

    try {
      const result = await AuthService.verifyEmailOtp({ email, code });
      return result.success === true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Verification error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Email verification failed";
      errorToast({ title: "Verification", message });
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerificationComplete() {
    if (accountType === "user") {
      // Users go straight to sign-in after email verification
      router.push("/sign-in");
      return;
    }

    if (!pendingCreatorId) {
      errorToast({
        title: "Verification",
        message: "Missing creator profile for verification",
      });
      return;
    }

    try {
      const result = await AuthService.verifyCreator({
        creatorId: pendingCreatorId,
        code: verificationCode,
      });

      if (result.success) {
        handleNextStep();
      } else {
        errorToast({
          title: "Verification",
          message: result.message || "Verification failed",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Verification completion error:", error);
      const message =
        error?.response?.data?.message ||
        "An error occurred during verification";
      errorToast({ title: "Verification", message });
    }
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const steps =
    accountType === "creator"
      ? [
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
            accountType={accountType}
          />,
          <SuccessStep key="success" />,
        ]
      : [
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
            verificationCode=""
            email={pendingEmail || getValues("email") || ""}
            onVerify={handleVerification}
            onNext={handleVerificationComplete}
            isVerifying={isLoading}
            accountType={accountType}
          />,
        ];

  const totalSteps = accountType === "creator" ? 3 : 2;

  return (
    <>
      <ProgressTracker currentStep={currentStep + 1} totalSteps={totalSteps} />
      {steps[currentStep]}
    </>
  );
}
