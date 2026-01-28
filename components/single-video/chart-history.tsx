"use client";

import React from "react";

interface HistoryEntry {
  period: string;
  rank: string;
  isCurrent?: boolean;
  isRanked?: boolean;
  color?: string;
}

interface ChartHistoryProps {
  history: HistoryEntry[];
}

export function ChartHistory({ history }: ChartHistoryProps) {
  return (
    <div className="lg:bg-white lg:border lg:border-[#e4e4e7] rounded-none lg:rounded-2xl p-0 lg:p-6">
      <h3 className="text-sm lg:text-base font-semibold lg:font-bold text-[#71717a] lg:text-[#09090b] mb-4 lg:mb-6">
        <span className="lg:hidden">Chart Performance</span>
        <span className="hidden lg:inline">Chart Performance History</span>
      </h3>

      <div className="space-y-0">
        {history.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-3 lg:py-4 ${
              index !== history.length - 1 ? "border-b border-[#e4e4e7]" : ""
            } ${!entry.isRanked ? "opacity-50 lg:opacity-50" : ""} ${
              index > 0 ? "opacity-70 lg:opacity-100" : ""
            } ${index > 1 ? "hidden lg:flex lg:opacity-30" : ""}`}
          >
            <p className="text-[13px] lg:text-sm text-[#09090b] lg:text-[#71717a]">
              {entry.period}
              {entry.isCurrent && " (Current)"}
            </p>
            <p
              className={`text-[13px] lg:text-sm font-bold ${
                entry.color ||
                (entry.isRanked
                  ? "text-[#15803d] lg:text-[#16a34a]"
                  : "text-[#09090b]")
              }`}
            >
              {entry.rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
