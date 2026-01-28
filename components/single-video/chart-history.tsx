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
    <div className="bg-white border border-[#e4e4e7] rounded-lg lg:rounded-2xl p-4 lg:p-6">
      <h3 className="text-sm lg:text-base font-bold text-[#09090b] mb-4 lg:mb-6">
        Chart Performance History
      </h3>

      <div className="space-y-0">
        {history.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-3 lg:py-4 ${
              index !== history.length - 1 ? "border-b border-[#e4e4e7]" : ""
            } ${!entry.isRanked ? "opacity-50" : ""} ${
              index > 1 ? "opacity-30" : ""
            }`}
          >
            <p className="text-xs lg:text-sm text-[#71717a]">
              {entry.period}
              {entry.isCurrent && " (Current)"}
            </p>
            <p
              className={`text-xs lg:text-sm font-bold ${
                entry.color ||
                (entry.isRanked ? "text-[#16a34a]" : "text-[#09090b]")
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
