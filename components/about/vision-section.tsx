"use client";

import React from "react";
import { Globe, TrendingUp, Shield, Zap } from "lucide-react";

const visionCards = [
  {
    title: "Global Standard",
    icon: Globe,
    color: "text-[#0369a1]",
  },
  {
    title: "Data Driven",
    icon: TrendingUp,
    color: "text-[#0369a1]",
  },
  {
    title: "Trusted & Fair",
    icon: Shield,
    color: "text-[#8b5cf6]",
  },
  {
    title: "Real Impact",
    icon: Zap,
    color: "text-[#eab308]",
  },
];

export default function VisionSection() {
  return (
    <div className="bg-white border-b border-[#e4e4e7] flex flex-col items-center py-12 md:py-16 lg:py-20 xl:py-24 section-px w-full">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6 w-full">
            {/* Heading */}
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[48px] xl:text-[52px] text-[#09090b] tracking-tight lg:tracking-[-1px] leading-tight lg:leading-[60px] xl:leading-[64px]">
              Our Vision
            </h2>

            {/* Main Description */}
            <div className="max-w-[720px]">
              <p className="font-medium text-lg md:text-xl lg:text-2xl xl:text-[28px] text-[#09090b] leading-relaxed lg:leading-[34px] xl:leading-[40px]">
                To become the world&apos;s most trusted creator performance
                index — where creators are recognized by impact, not noise, and
                discovery is driven by data, not bias.
              </p>
            </div>

            {/* Secondary Description */}
            <div className="max-w-[720px]">
              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#52525b] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                We envision a future where creators are evaluated with the same
                rigor as music charts, financial indexes, and cultural rankings
                — transparent, fair, and global.
              </p>
            </div>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {visionCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-[#e4e4e7] rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[180px]"
                  >
                    <div className={`${card.color} mb-4 md:mb-6`}>
                      <IconComponent
                        className="w-7 h-7 md:w-8 md:h-8"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base lg:text-lg xl:text-[26px] text-[#09090b] leading-tight">
                      {card.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
