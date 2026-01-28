"use client";

import React from "react";

interface RankCardProps {
  rank: string;
  isNew?: boolean;
  cpi: number;
  chartType?: string;
}

export function RankCard({
  rank,
  isNew,
  cpi,
  chartType = "Global Video Charts",
}: RankCardProps) {
  return (
    <div className="bg-white border border-[#e4e4e7] rounded-lg lg:rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] lg:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] p-4 lg:p-6 flex items-center justify-between">
      <div className="flex flex-col gap-1.5 lg:gap-2">
        {/* Label */}
        <p className="text-[10px] lg:text-xs uppercase tracking-wider font-semibold text-[#71717a]">
          Current Global Rank
        </p>

        {/* Rank */}
        <div className="flex items-center gap-2 lg:gap-3">
          <h2 className="text-3xl lg:text-5xl font-black text-[#09090b] leading-none">
            {rank}
          </h2>
          {isNew && (
            <div className="bg-[#2563eb] text-white text-[10px] lg:text-xs font-bold px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-md">
              NEW
            </div>
          )}
        </div>

        {/* Chart Type */}
        <div className="flex items-center gap-1.5 mt-0.5 lg:mt-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="lg:w-3.5 lg:h-3.5"
          >
            <path
              d="M3 7H11M11 7L7 3M11 7L7 11"
              stroke="#71717a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[10px] lg:text-xs text-[#71717a]">{chartType}</p>
        </div>
      </div>

      {/* CPI Score */}
      <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full flex items-center justify-center">
        <div className="w-[52px] h-[52px] lg:w-[70px] lg:h-[70px] bg-white rounded-full flex flex-col items-center justify-center">
          <p className="text-base lg:text-lg font-extrabold text-[#09090b]">
            {cpi.toFixed(1)}
          </p>
          <p className="text-[8px] lg:text-[10px] text-[#71717a]">CPI</p>
        </div>
      </div>
    </div>
  );
}
