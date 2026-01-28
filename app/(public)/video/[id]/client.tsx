"use client";

import React from "react";
import Image from "next/image";
import {
  VideoPlayer,
  VideoStats,
  RankCard,
  ChartHistory,
} from "@/components/single-video";

export default function SingleVideoClient() {
  // Sample data - replace with actual data from API
  const videoData = {
    title: "Backstage at Oscars",
    creatorName: "magnus.barrows71",
    creatorHandle: "@magnus.barrows71",
    creatorAvatar: "/332cc38db8cf2924b615f85b9c4914a60e2c6ccc.png",
    isVerified: true,
    categories: ["Global Charts"],
    rank: "#1",
    isNew: true,
    cpi: 99.9,
    stats: [
      { label: "Total Views", value: "12.4M" },
      { label: "Growth (7d)", value: "+145%", color: "text-[#16a34a]" },
      { label: "Peak Rank", value: "#1" },
    ],
    history: [
      {
        period: "Jan 20 - Jan 26",
        rank: "#1 (New)",
        isCurrent: true,
        isRanked: true,
        color: "text-[#16a34a]",
      },
      { period: "Jan 13 - Jan 19", rank: "Unranked", isRanked: false },
      { period: "Jan 06 - Jan 12", rank: "Unranked", isRanked: false },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Mobile Navigation Bar - visible on mobile only */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-[5px] border-b border-gray-200">
        <div className="max-w-[414px] mx-auto px-4 py-3 flex items-center justify-between">
          <button className="flex items-center gap-2 text-[#09090b]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Video Details</span>
          </button>
          <div className="flex items-center gap-3">
            <button>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.5 3.5L17 7L13.5 10.5M7 17L3.5 13.5L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="5" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="15" r="1.5" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[414px] lg:max-w-360 mx-auto px-4 md:px-6 lg:px-14 pt-16 lg:pt-10 pb-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 md:gap-8 lg:gap-12">
          {/* Left Column: Video Player */}
          <div className="w-full">
            <VideoPlayer
              title={videoData.title}
              thumbnailUrl={videoData.creatorAvatar}
            />
          </div>

          {/* Right Column: Video Details */}
          <div className="w-full space-y-6 lg:space-y-8">
            {/* Header Info */}
            <div className="space-y-3">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {videoData.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-[10px] lg:text-xs font-semibold ${
                      index === 0
                        ? "bg-[#eff6ff] text-[#2563eb]"
                        : "bg-[#f4f4f5] text-[#71717a]"
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#09090b] leading-tight">
                {videoData.title}
              </h1>

              {/* Creator Info */}
              <div className="flex items-center gap-3 pt-2 lg:pt-3">
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={videoData.creatorAvatar}
                    alt={videoData.creatorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <p className="text-sm lg:text-base font-semibold text-[#09090b]">
                      {videoData.creatorName}
                    </p>
                    {videoData.isVerified && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 1L8.5 5.5H13L9.5 8.5L11 13L7 10L3 13L4.5 8.5L1 5.5H5.5L7 1Z"
                          fill="#3b82f6"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs lg:text-sm text-[#71717a]">
                    {videoData.creatorHandle}
                  </p>
                </div>
              </div>
            </div>

            {/* Rank Card */}
            <RankCard
              rank={videoData.rank}
              isNew={videoData.isNew}
              cpi={videoData.cpi}
            />

            {/* Stats Grid */}
            <VideoStats stats={videoData.stats} />

            {/* Chart History */}
            <ChartHistory history={videoData.history} />
          </div>
        </div>
      </div>
    </div>
  );
}
