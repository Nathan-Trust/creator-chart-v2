"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-bold text-[#0f1724] mb-3">
        Start your CreatorCharts journey
      </h1>
      <p className="text-gray-600 mb-8">
        Choose how you want to use the platform today.
      </p>

      <div className="grid gap-4">
        <Button
          className="h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
          onClick={() => router.push("/sign-up?type=creator")}
        >
          I am a creator
        </Button>
        <Button
          variant="outline"
          className="h-12 text-[16px] font-semibold rounded-lg"
          onClick={() => router.push("/sign-up?type=user")}
        >
          I am a fan / user
        </Button>
      </div>
    </div>
  );
}
