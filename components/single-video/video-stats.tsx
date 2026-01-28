"use client";

import React from "react";

interface VideoStat {
  label: string;
  value: string;
  color?: string;
}

interface VideoStatsProps {
  stats: VideoStat[];
}

export function VideoStats({ stats }: VideoStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#f4f4f5] border border-transparent rounded-lg lg:rounded-xl p-3 lg:p-4 flex flex-col gap-1 lg:gap-1.5"
        >
          <p className="text-[10px] lg:text-xs text-[#71717a] font-normal">
            {stat.label}
          </p>
          <p
            className={`text-sm lg:text-lg font-bold ${stat.color || "text-[#09090b]"}`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
