"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#0f1724] mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-600">
          The global benchmark for digital creators.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        {/* Primary Button - Create a Free Account */}
        <button
          onClick={() => router.push("/sign-up?type=user")}
          className="w-full flex items-center px-5 py-4 rounded-lg bg-[#14532d] hover:bg-[#14532d]/90 text-left cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-center w-6 h-6 shrink-0">
            <Image
              src="/auth/1de7fa9e6b70a57ca3b7f47d2305ee701c7cb797.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div className="flex-1 flex flex-col gap-[3px] pl-4">
            <span className="text-[16px] font-semibold text-white leading-[20px]">
              Create a Free Account
            </span>
            <span className="text-[13px] font-normal text-white/80 leading-[16px]">
              Follow creators &amp; get chart alerts
            </span>
          </div>
          <div className="flex items-center justify-center w-5 h-5 shrink-0">
            <Image
              src="/auth/1a8c1ca8a26ec4946f62942c3f2994bc9ec75aab.svg"
              alt=""
              width={20}
              height={20}
            />
          </div>
        </button>

        {/* Secondary Button - I am a Creator */}
        <button
          onClick={() => router.push("/sign-up?type=creator")}
          className="w-full flex items-center px-5 py-4 rounded-lg bg-white border border-gray-300 text-left cursor-pointer transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center justify-center w-6 h-6 shrink-0">
            <Image
              src="/auth/95fc16e4347fbf8deda871229d0b9fbdeed2306e.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div className="flex-1 flex flex-col gap-[3px] pl-4">
            <span className="text-[16px] font-semibold text-black leading-[20px]">
              I am a Creator
            </span>
            <span className="text-[13px] font-normal text-[#6b7280] leading-[16px]">
              Create or claim your profile
            </span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[12px] text-[#6b7280] text-center leading-[18px]">
        We automatically rank top creators based on public performance data.
        Sign up to claim or submit your profile.
      </p>
    </div>
  );
}
