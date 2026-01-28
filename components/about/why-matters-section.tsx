"use client";

import React from "react";
import { Search, Building2, BarChart3 } from "lucide-react";

const mattersData = [
  {
    icon: Search,
    text: "Fans discover creators worth watching",
    color: "text-[#0369a1]",
  },
  {
    icon: Building2,
    text: "Brands identify creators with real momentum",
    color: "text-[#0369a1]",
  },
  {
    icon: BarChart3,
    text: "Creators understand their performance in context",
    color: "text-[#0369a1]",
  },
];

export default function WhyItMattersSection() {
  return (
    <div className="bg-white border-b border-[rgba(0,0,0,0.08)] flex flex-col items-center py-12 md:py-16 lg:py-20 xl:py-24 px-4 md:px-6 lg:px-14 w-full">
      <div className="max-w-360 mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Content */}
          <div className="flex-1 space-y-4 md:space-y-6">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[48px] xl:text-[52px] text-[#0f1724] tracking-tight lg:tracking-[-1px] leading-tight lg:leading-[60px] xl:leading-[64px]">
              Why CreatorCharts Matters
            </h2>

            <div className="max-w-[720px] space-y-4 md:space-y-6">
              <p className="font-normal text-xl md:text-2xl lg:text-[28px] xl:text-[32px] text-[#0f1724] leading-relaxed lg:leading-[40px] xl:leading-[44px]">
                The creator economy is growing fast — but clarity hasn&apos;t
                kept up.
              </p>

              <p className="font-normal text-base md:text-[18px] lg:text-[22px] xl:text-[24px] text-[#4b5563] leading-relaxed lg:leading-[32px] xl:leading-[36px]">
                Above all, CreatorCharts brings structure to a fast-moving
                industry.
              </p>
            </div>
          </div>

          {/* Right Content - Benefits List */}
          <div className="flex-1 w-full space-y-3 md:space-y-4">
            {mattersData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-5 md:p-6 flex items-center gap-4"
                >
                  <div className={`${item.color} flex-shrink-0`}>
                    <IconComponent className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <p className="font-medium text-sm md:text-base lg:text-lg xl:text-xl text-[#0f1724] leading-tight lg:leading-[28px] xl:leading-[32px]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
