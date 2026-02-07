"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function SuccessStep() {
  const router = useRouter();

  React.useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="p-4 md:p-12">
      <div className="max-w-xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-[#0f1724] mb-4">
          Your profile is live and now being indexed.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          CreatorCharts tracks creator performance using public data to show
          where influence actually stands.
        </p>

        {/* Features List */}
        <div className="bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-[#0f1724] mb-4">
            What&apos;s next?
          </h3>
          <ul className="text-left space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                Your profile will be tracked automatically{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                Rankings update as performance changes{" "}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                Your position reflects real public data{" "}
              </span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push("/creator/me")}
            className="w-full h-12 bg-[#14532d] hover:bg-[#14532d]/90 text-white text-[16px] font-semibold rounded-lg"
          >
            View My Profile
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full h-12 text-[16px] font-semibold rounded-lg"
          >
            Explore Charts
          </Button>
        </div>
      </div>
    </div>
  );
}
