"use client";

import { useState } from "react";
import Image from "next/image";

interface Video {
  rank: number;
  lastWeek: number;
  peak: number;
  woc: number;
  streamScore: number;
  title: string;
  creator: string;
  verified: boolean;
  thumbnail: string;
  change: string;
  debutChartDate: string;
  peakChartDate: string;
}

const TopVideosClient = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const mockVideos: Video[] = Array(6)
    .fill(null)
    .map(() => ({
      rank: 1,
      lastWeek: 2,
      peak: 2,
      woc: 2,
      streamScore: 87,
      title: "Champion",
      creator: "Davido",
      verified: true,
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "+1",
      debutChartDate: "09-02-2023",
      peakChartDate: "09-02-2023",
    }));

  const getRankBadge = (index: number, change: string) => {
    if (index === 0) {
      return (
        <div className="bg-[rgba(35,140,77,0.3)] flex items-center px-1.5 py-1 rounded-lg">
          <Image
            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
            alt="arrow-up"
            width={20}
            height={20}
          />
          <span className="text-[16px] font-medium text-[#238c4d]">
            {change}
          </span>
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="bg-[rgba(32,120,236,0.2)] flex items-center px-1.5 py-1 rounded-lg">
          <span className="text-[16px] font-medium text-[#2078ec]">New</span>
        </div>
      );
    } else if (index === 2) {
      return (
        <div className="bg-[rgba(32,120,236,0.2)] flex items-center px-1.5 py-1 rounded-lg">
          <span className="text-[16px] font-medium text-[#2078ec]">
            Re-entry
          </span>
        </div>
      );
    } else if (index === 3) {
      return (
        <div className="bg-[rgba(179,38,30,0.3)] flex items-center px-1.5 py-1 rounded-lg">
          <div className="rotate-180">
            <Image
              src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
              alt="arrow-down"
              width={20}
              height={20}
              className="brightness-0 saturate-100"
              style={{
                filter:
                  "invert(32%) sepia(89%) saturate(2094%) hue-rotate(347deg) brightness(87%) contrast(88%)",
              }}
            />
          </div>
          <span className="text-[16px] font-medium text-[#b3261e]">-1</span>
        </div>
      );
    } else if (index === 4) {
      return (
        <div className="bg-[rgba(35,140,77,0.3)] flex items-center px-1.5 py-1 rounded-lg">
          <Image
            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
            alt="arrow-up"
            width={20}
            height={20}
          />
          <span className="text-[16px] font-medium text-[#238c4d]">
            {change}
          </span>
        </div>
      );
    } else {
      return (
        <div className="bg-[rgba(0,0,0,0.2)] flex items-center px-4 py-1 rounded-lg">
          <span className="text-[16px] font-medium text-[rgba(0,0,0,0.6)]">
            -
          </span>
        </div>
      );
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="space-y-12">
        {/* Header */}
        <div className="ml-4 space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold leading-17.5 text-black">
              Top 100 Videos
            </h1>
            <p className="text-2xl font-medium text-black">
              Your update of the top 100 creators
            </p>
          </div>
          <div className="border border-black rounded-3xl px-5 py-4 inline-flex items-end gap-9 cursor-pointer">
            <span className="text-2xl font-medium text-black">Weekly</span>
            <div className="rotate-180">
              <Image
                src="/9cf8be34c0b49ea6fa5bac1b265c69f54e56ba1b.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="space-y-0">
          {/* Table Header */}
          <div
            className="grid items-center px-4 py-4"
            style={{
              gridTemplateColumns: "80px 1fr 120px 120px 120px 180px 100px",
            }}
          >
            <div className="text-[40px] font-medium text-black">#</div>
            <div className="text-[32px] font-bold text-black">VIDEOS</div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                alt="question"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-black">LW</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                alt="question"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-black">PEAK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                alt="question"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-black">WOC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                alt="question"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-black">STREAM</span>
            </div>
            <div></div>
          </div>

          {/* Table Rows */}
          {mockVideos.map((video, index) => (
            <div key={index}>
              <div
                className={`grid items-center px-4 py-8 cursor-pointer transition-colors ${
                  hoveredRow === index || expandedRow === index
                    ? "bg-gray-50"
                    : ""
                }`}
                style={{
                  gridTemplateColumns: "80px 1fr 120px 120px 120px 180px 100px",
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleRowClick(index)}
              >
                {/* Rank Column */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[32px] font-bold text-black">
                    {index + 1}
                  </span>
                  {getRankBadge(index, video.change)}
                </div>

                {/* Video Column */}
                <div className="flex items-center gap-4">
                  <div className="relative w-34.5 h-29.5 rounded-lg overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/d2d47e4e6c55e3df3bb1d8a1a4a8e6d4c8e8e8c8.svg"
                        alt="play"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[32px] font-bold text-black">
                      {video.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-medium text-black">
                        {video.creator}
                      </span>
                      {video.verified && (
                        <Image
                          src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                          alt="verified"
                          width={32}
                          height={32}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Last Week */}
                <div className="text-[32px] font-normal text-black text-center">
                  {video.lastWeek}
                </div>

                {/* Peak */}
                <div className="text-[32px] font-normal text-black text-center">
                  {video.peak}
                </div>

                {/* WOC */}
                <div className="text-[32px] font-normal text-black text-center">
                  {video.woc}
                </div>

                {/* Stream Score */}
                <div className="flex justify-center">
                  <div className="bg-[#14532d] px-3 py-2 rounded-md min-w-14.5">
                    <span className="text-[26px] font-bold text-white">
                      {video.streamScore}
                    </span>
                  </div>
                </div>

                {/* View/Close Button */}
                <div className="flex justify-center">
                  {(hoveredRow === index || expandedRow === index) && (
                    <button
                      className="flex items-center gap-4"
                      onClick={() => handleRowClick(index)}
                    >
                      {expandedRow === index ? (
                        <>
                          <span className="text-2xl font-extrabold text-black">
                            Close
                          </span>
                          <Image
                            src="/9cf8be34c0b49ea6fa5bac1b265c69f54e56ba1b.svg"
                            alt="close"
                            width={24}
                            height={24}
                          />
                        </>
                      ) : (
                        <>
                          <span className="text-2xl font-extrabold text-black">
                            View
                          </span>
                          <div className="rotate-180">
                            <Image
                              src="/9cf8be34c0b49ea6fa5bac1b265c69f54e56ba1b.svg"
                              alt="view"
                              width={24}
                              height={24}
                            />
                          </div>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedRow === index && (
                <div className="px-4 pb-8 bg-gray-50 animate-in slide-in-from-top duration-200">
                  <div className="ml-53 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[18px] font-semibold text-black min-w-45">
                        Debut Chart Date
                      </span>
                      <span className="text-[18px] font-normal text-black">
                        {video.debutChartDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[18px] font-semibold text-black min-w-45">
                        Peak Chart Date
                      </span>
                      <span className="text-[18px] font-normal text-black">
                        {video.peakChartDate}
                      </span>
                    </div>
                    <button className="mt-4 px-8 py-3 bg-[#14532d] text-white text-[16px] font-semibold rounded-lg hover:bg-[#1a6b3d] transition-colors">
                      Share Promo Card
                    </button>
                  </div>
                </div>
              )}

              {/* Divider Line */}
              {index < mockVideos.length - 1 && (
                <div className="h-px bg-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopVideosClient;
