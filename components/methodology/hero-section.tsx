"use client";

import React from "react";

export default function MethodologyHeroSection() {
  return (
    <div className="bg-black border-b border-[#333] flex flex-col items-center py-16 md:py-20 lg:py-24 xl:py-[119px] section-px w-full">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="space-y-6 md:space-y-8">
          {/* Main Heading */}
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-7xl xl:text-[80px] text-white tracking-tight lg:tracking-[-2px] leading-tight lg:leading-[88px]">
            Our Methodology
          </h1>

          {/* Description */}
          <div className="max-w-[700px]">
            <p className="font-normal text-lg md:text-xl lg:text-[28px] xl:text-[32px] text-[#a1a1aa] leading-relaxed lg:leading-[40px] xl:leading-[44px] opacity-90">
              The Creator Performance Index (CPI) is an independent, data-driven
              standard designed to measure influence beyond vanity metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
