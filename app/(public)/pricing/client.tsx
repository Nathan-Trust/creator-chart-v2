"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Crown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/stores/theme-store";

type BillingPeriod = "monthly" | "annually";

interface PlanFeature {
  title: string;
  description: string;
}

const verifiedFeatures: PlanFeature[] = [
  {
    title: "Official Verified Badge",
    description: "Trusted by brands & agencies",
  },
  {
    title: "Ranking Alerts",
    description: "Real-time notifications on trends",
  },
  {
    title: "Priority Visibility",
    description: "Top placement in brand searches",
  },
  {
    title: "Impersonation Protection",
    description: "Priority support & takedowns",
  },
  {
    title: "Export Ranking History",
    description: "Downloadable PDFs for media kits",
  },
];

const creatorProFeatures: PlanFeature[] = [
  {
    title: "All Verified features",
    description: "Everything included in Verified",
  },
  {
    title: "Brand Campaign Insights",
    description: "See who is shortlisting you",
  },
  {
    title: "Performance Reports",
    description: "Deep dive into audience growth",
  },
  {
    title: "Direct Brand Invites",
    description: "Receive inbound campaign offers",
  },
  {
    title: "Strategy Tools",
    description: "Monetization & growth insights",
  },
];

export default function PricingClient() {
  const router = useRouter();
  const { backgroundColor } = useThemeStore();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const monthlyPrice = 5000;
  const annualPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
  const displayPrice =
    billingPeriod === "monthly" ? monthlyPrice : Math.round(annualPrice / 12);

  const handleGetVerified = () => {
    router.push(`/pricing/checkout?plan=verified&billing=${billingPeriod}`);
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen w-full">
      {/* Header Section */}
      <div
        className="flex flex-col items-center pb-[80px] md:pb-[140px] pt-[40px] md:pt-[60px] px-4 md:px-5 transition-colors duration-1000"
        style={{ backgroundColor }}
      >
        <div className="flex flex-col gap-4 items-center max-w-[800px] w-full">
          {/* Title */}
          <h1 className="text-[32px] md:text-[42px] font-extrabold text-white text-center tracking-[-0.5px]">
            Get Verified & Go Further
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] md:text-[18px] text-white/80 text-center leading-[24px] md:leading-[28.8px] max-w-[600px] pb-6">
            Join thousands of creators who use verification to build trust with
            brands and secure better deals.
          </p>

          {/* Billing Toggle */}
          <div className="relative flex items-center p-[5px] md:p-[7px] bg-white/10 border border-white/10 rounded-full backdrop-blur-[5px]">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[14px] md:text-[15px] font-semibold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white text-[#453e4b] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annually")}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[14px] md:text-[15px] font-semibold transition-all ${
                billingPeriod === "annually"
                  ? "bg-white text-[#453e4b] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Annually
            </button>

            {/* Save Badge */}
            <div className="absolute -top-4 md:-top-5 -right-3 rotate-12">
              <div className="bg-[#ffc107] px-1.5 md:px-2 py-0.5 md:py-1 rounded-xl shadow-[0px_2px_5px_0px_rgba(0,0,0,0.2)]">
                <span className="text-[10px] md:text-[11px] font-extrabold text-black uppercase">
                  SAVE 20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex items-start justify-center px-4 md:px-5 -mt-10 md:-mt-20 pb-10 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-[1080px] w-full">
          {/* Verified Plan Card */}
          <div className="relative flex-1 bg-white border-2 border-[#0e7a72] rounded-3xl shadow-[0px_20px_50px_0px_rgba(25,135,84,0.15)] px-6 py-8 md:px-[42px] md:py-[50px]">
            {/* Most Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="bg-[#0e7a72] px-4 py-1.5 rounded-full">
                <span className="text-[13px] font-bold text-white uppercase tracking-[0.5px] whitespace-nowrap">
                  Most Popular
                </span>
              </div>
            </div>

            {/* Plan Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] md:text-[24px] font-extrabold text-black">
                Verified
              </h2>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#eaf7f6] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#0e7a72]" />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-[32px] md:text-[42px] font-extrabold text-black tracking-[-1px]">
                ₦{displayPrice.toLocaleString()}
              </span>
              <span className="text-[14px] md:text-[16px] font-medium text-[#6c757d]">
                / month
              </span>
            </div>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] text-[#6c757d] leading-[24px] md:leading-[25.6px] mb-6 md:mb-8">
              Essential verification for creators ready to establish trust and
              access exclusive brand opportunities.
            </p>

            {/* Divider */}
            <div className="h-px bg-black/8 mb-6 md:mb-8" />

            {/* Features List */}
            <div className="flex flex-col gap-4 md:gap-5 flex-1">
              {verifiedFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-[#eaf7f6] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#0e7a72]" />
                  </div>
                  <div className="flex flex-col gap-0.5 md:gap-1">
                    <span className="text-[14px] md:text-[15px] font-semibold text-[#212529]">
                      {feature.title}
                    </span>
                    <span className="text-[13px] md:text-[14px] text-[#6c757d]">
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-8 md:pt-10">
              <Button
                onClick={handleGetVerified}
                className="w-full h-12 md:h-14 bg-[#0e7a72] hover:bg-[#0a5d57] text-white text-[15px] md:text-[16px] font-bold rounded-xl shadow-[0px_4px_12px_0px_rgba(25,135,84,0.3)]"
              >
                Get Verified Now
              </Button>
            </div>
          </div>

          {/* Creator Pro Card */}
          <div className="relative flex-1 bg-[#fafafa] border border-black/8 rounded-3xl shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] px-6 py-8 md:px-[41px] md:py-[49px] opacity-95">
            {/* Plan Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] md:text-[24px] font-extrabold text-black">
                Creator Pro
              </h2>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#e9ecef] rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-[#6c757d]" />
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f1f3f5] rounded-full mb-6 md:mb-8">
              <Clock className="w-3 h-3 text-[#495057]" />
              <span className="text-[12px] font-bold text-[#495057] uppercase">
                Coming Soon
              </span>
            </div>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] text-[#6c757d] leading-[24px] md:leading-[25.6px] mb-6 md:mb-8">
              Advanced analytics and direct campaign management for professional
              creators.
            </p>

            {/* Divider */}
            <div className="h-px bg-black/8 mb-6 md:mb-8" />

            {/* Features List */}
            <div className="flex flex-col gap-4 md:gap-5 flex-1">
              {creatorProFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-[#e9ecef] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#6c757d]" />
                  </div>
                  <div className="flex flex-col gap-0.5 md:gap-1">
                    <span className="text-[14px] md:text-[15px] font-semibold text-[#212529]">
                      {feature.title}
                    </span>
                    <span className="text-[13px] md:text-[14px] text-[#6c757d]">
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-8 md:pt-10">
              <Button
                variant="outline"
                className="w-full h-12 md:h-14 border-2 border-black/8 text-[#6c757d] text-[15px] md:text-[16px] font-bold rounded-xl hover:bg-[#f1f3f5]"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
