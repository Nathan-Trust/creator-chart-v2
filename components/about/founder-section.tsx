"use client";

import React from "react";
import Image from "next/image";

const founderImage = "/founder.jpeg";

export default function FounderSection() {
  return (
    <div className="bg-white border-b border-[#e4e4e7] flex flex-col items-center py-12 md:py-16 lg:py-20 xl:py-24 section-px w-full">
      <div className="bg-white border border-[#e4e4e7] rounded-2xl md:rounded-3xl overflow-hidden w-full max-w-360 mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Image */}
          <div className="relative w-full lg:w-[320px] h-[300px] md:h-[400px] lg:h-auto flex-shrink-0">
            <Image
              src={founderImage}
              alt="Michaelbanks - Founder of CreatorCharts"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right - Content */}
          <div className="flex-1 p-6 md:p-10 lg:p-12 xl:p-16 space-y-6 md:space-y-8">
            {/* Header */}
            <div className="space-y-3 md:space-y-4">
              <p className="font-bold text-xs lg:text-sm xl:text-base tracking-wider uppercase text-[#0369a1] leading-tight">
                About The Founder
              </p>
              <h2 className="font-bold text-3xl md:text-4xl lg:text-[48px] xl:text-[52px] text-[#09090b] tracking-tight lg:tracking-[-1px] leading-tight lg:leading-[60px] xl:leading-[64px]">
                Michaelbanks
              </h2>
              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#52525b] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                Founder, CreatorCharts
              </p>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 md:space-y-6">
              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#52525b] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                Michaelbanks is a visionary tech founder focused on building
                data-driven platforms for the next generation of digital
                culture.
              </p>

              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#52525b] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                With a deep interest in how creators grow, compete, and gain
                recognition online, he founded CreatorCharts to solve a simple
                but overlooked problem: there was no trusted, global standard
                for ranking creators based on performance.
              </p>

              <p className="font-medium text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#09090b] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                CreatorCharts was built to change that — by putting data first,
                removing bias, and creating a system where creators earn
                recognition through measurable impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
