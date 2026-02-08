"use client";

import React from "react";

export default function LookingAheadSection() {
  return (
    <div className="flex flex-col items-center border-b border-[#27272a] bg-[#18181b] section-px pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20 xl:pb-[145px] xl:pt-[100px]">
      <div className="w-full max-w-360 mx-auto">
        <div className="flex flex-col items-center gap-6 px-4 md:px-8">
          {/* Green Arrow Icon */}
          <div className="relative h-12 w-12">
            <svg
              className="h-full w-full -rotate-45"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 8L40 24L24 40"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 24H40"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main Heading */}
          <h2 className="text-center text-white text-[28px] font-bold tracking-[-0.8px] text-black md:text-[32px] lg:text-[48px] xl:text-[52px] lg:leading-[60px] xl:leading-[64px]">
            Looking Ahead
          </h2>

          {/* Subheading */}
          <p className="text-center text-lg lg:text-2xl xl:text-[28px] text-zinc-400 lg:leading-[34px] xl:leading-[40px]">
            CreatorCharts is just getting started.
          </p>

          {/* Description */}
          <div className="text-center text-lg lg:text-xl xl:text-[22px] leading-normal lg:leading-[34px] xl:leading-[38px] text-zinc-400">
            <p className="mb-0">
              As the platform evolves, our focus remains the same:
            </p>
            <p className="mb-0 font-bold text-white">
              Trust over trends. Data over hype. Global recognition over closed
            </p>
            <p className="font-bold text-white">systems.</p>
          </div>

          {/* Final Statement */}
          <p className="pt-2 text-center text-xl lg:text-2xl xl:text-[28px] text-white lg:leading-[34px] xl:leading-[40px]">
            Creators deserve a chart they can believe in.
          </p>
        </div>
      </div>
    </div>
  );
}
