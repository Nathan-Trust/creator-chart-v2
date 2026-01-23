"use client";

import { Check, CircleAlert, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface VerificationTabProps {
  onDiscard: () => void;
}

export default function VerificationTab({ onDiscard }: VerificationTabProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="border-b border-black/8 pb-4.25">
        <h2 className="text-lg font-semibold text-[#0f1720]">
          Apply for Verified Status
        </h2>
        <p className="text-[13px] text-[#6c757d]">
          Verified creators get a blue checkmark and access to premium analytics
          tools.
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start p-4 md:p-[17px] bg-[#eff6ff] border border-[#dbeafe] rounded-lg">
        <div className="flex gap-3 md:gap-4 items-start flex-1">
          <div className="shrink-0">
            <CircleAlert className="w-5 h-5 text-[#1e40af]" />
          </div>
          <div className="flex flex-col gap-[3.25px] flex-1">
            <h4 className="text-[13px] md:text-[14px] font-semibold text-[#1e40af]">
              Verification Criteria
            </h4>
            <p className="text-[12px] md:text-[13px] text-[#1e3a8a] leading-[18px] md:leading-[19.5px]">
              To be eligible, your account must be authentic, unique, and
              active. Please complete the checklist below to submit your
              application.
            </p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/pricing")}
          type="button"
          className="w-full md:w-auto shrink-0 bg-black text-white text-[13px] font-semibold px-4 py-2 h-auto rounded-full hover:bg-[#1e3a8a]"
        >
          Get Verified
        </Button>
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-4 py-2">
        {/* Completed Item - Complete Profile */}
        <div className="flex items-center p-4.25 border border-black/8 rounded-lg">
          <div className="flex gap-3 items-center">
            <div className="w-6 h-6 rounded-xl bg-[#dcfce7] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-[#16a34a]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#0f1720]">
                Complete Profile
              </span>
              <span className="text-[12px] text-[#6c757d]">
                Bio, avatar, and cover image are set
              </span>
            </div>
          </div>
        </div>

        {/* Completed Item - Two-Factor Authentication */}
        <div className="flex items-center p-[17px] border border-black/8 rounded-lg">
          <div className="flex gap-3 items-center">
            <div className="w-6 h-6 rounded-xl bg-[#dcfce7] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-[#16a34a]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#0f1720]">
                Two-Factor Authentication
              </span>
              <span className="text-[12px] text-[#6c757d]">
                Secure login is enabled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end border-t border-black/8 pt-[25px]">
        <Button
          type="button"
          className="bg-black text-white text-[14px] font-bold px-6 py-2.5 h-auto rounded-[20px] hover:bg-black/90"
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}
