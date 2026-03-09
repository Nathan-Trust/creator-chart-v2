"use client";

import React from "react";

export default function AboutHeroSection() {
  return (
    <div className="bg-white border-b border-[rgba(0,0,0,0.08)] flex flex-col items-center pb-12 pt-12 md:pb-16 md:pt-16 lg:pb-24 lg:pt-20 section-px w-full">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Independent Index Badge */}
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#f1f5f9] border border-[rgba(0,0,0,0.08)] px-3 py-1.5 md:px-[15px] md:py-[7px] rounded-full mb-8 md:mb-12 lg:mb-[65.8px]">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0369a1] rounded-[4px]" />
          <span className="font-semibold text-[11px] md:text-[13px] text-[#0f1724] tracking-[0.5px] uppercase leading-tight">
            Independent Index
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-extrabold text-3xl md:text-4xl lg:text-6xl xl:text-[72px] text-[#0f1724] tracking-tight lg:tracking-[-1.5px] leading-tight lg:leading-[80px] mb-6 md:mb-8 lg:mb-[23.88px]">
          About Us
        </h1>

        {/* Main Description */}
        <div className="max-w-[720px] mb-6 md:mb-8 lg:mb-[30.59px]">
          <p className="font-normal text-lg md:text-xl lg:text-[28px] xl:text-[32px] text-[#0f1724] leading-relaxed lg:leading-[40px] xl:leading-[44px]">
            CreatorCharts is a global performance index built to spotlight the
            creators shaping culture across the internet.
          </p>
        </div>

        {/* Detailed Description */}
        <div className="max-w-[720px] mb-8 md:mb-10 lg:mb-[32.49px]">
          <p className="font-normal text-base md:text-[18px] lg:text-[22px] xl:text-[24px] text-[#4b5563] leading-relaxed lg:leading-[32px] xl:leading-[36px]">
            In a world where visibility is often driven by hype, CreatorCharts
            exists to bring clarity, structure, and credibility to the creator
            economy. We track and rank creators using performance-based data,
            helping audiences, brands, and the industry understand who&apos;s
            really moving the needle — week after week.
          </p>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-[rgba(0,0,0,0.08)] mb-6 md:mb-8 lg:mb-[31.8px]" />

        {/* Bottom Statement */}
        <div className="max-w-[720px]">
          <p className="font-medium text-base md:text-[18px] lg:text-[22px] xl:text-[24px] text-[#0f1724] leading-relaxed lg:leading-[32px] xl:leading-[36px]">
            CreatorCharts is not a marketplace, not a talent agency, and not a
            pay-to-rank platform.
            <br className="hidden md:block" />
            <br className="hidden md:block" />
            It is an independent index.
          </p>
        </div>
      </div>
    </div>
  );
}
