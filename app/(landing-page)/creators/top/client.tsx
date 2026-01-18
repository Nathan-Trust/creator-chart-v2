"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Creator {
  rank: number;
  lastWeek: number;
  peak: number;
  woc: number;
  cpiScore: number;
  name: string;
  verified: boolean;
  imageUrl: string;
  platforms: {
    tiktok: boolean;
    youtube: boolean;
    instagram: boolean;
    facebook: boolean;
  };
  change: number;
  debutChartDate: string;
  peakChartDate: string;
}

const mockCreators: Creator[] = Array(6)
  .fill(null)
  .map(() => ({
    rank: 1,
    lastWeek: 2,
    peak: 2,
    woc: 2,
    cpiScore: 87,
    name: "Carter Efe",
    verified: true,
    imageUrl: "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
    platforms: {
      tiktok: true,
      youtube: true,
      instagram: true,
      facebook: true,
    },
    change: 1,
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  }));

const QuestionIcon = () => (
  <Image
    src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
    alt="Help"
    width={32}
    height={32}
  />
);

const VerifyIcon = () => (
  <Image
    src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
    alt="Verified"
    width={24}
    height={24}
  />
);

const ArrowUpIcon = () => (
  <Image
    src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
    alt="Up"
    width={20}
    height={20}
  />
);

const ArrowDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5L12 19M12 19L19 12M12 19L5 12"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TopCreatorClient() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[48px] font-extrabold leading-17.5 text-black mb-2">
            Top 100 Creators
          </h1>
          <p className="text-[24px] font-medium text-black mb-6">
            Your update of the top 100 creators
          </p>

          {/* Filter Dropdown */}
          <div className="inline-flex items-center gap-9 px-5 py-4 border border-black rounded-[32px] cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-[24px] font-medium text-black">Weekly</span>
            <div className="rotate-180">
              <ArrowDownIcon />
            </div>
          </div>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-4 mb-8 px-4">
          <div className="text-[40px] font-medium text-black">#</div>
          <div className="text-[32px] font-bold text-black">CREATORS</div>
          <div className="flex items-center gap-1.5">
            <QuestionIcon />
            <span className="text-[24px] font-bold text-black">LW</span>
          </div>
          <div className="flex items-center gap-1.5">
            <QuestionIcon />
            <span className="text-[24px] font-bold text-black">PEAK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <QuestionIcon />
            <span className="text-[24px] font-bold text-black">WOC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <QuestionIcon />
            <span className="text-[24px] font-bold text-black">CPI SCORE</span>
          </div>
          <div></div>
        </div>

        {/* Creators List */}
        <div className="space-y-0">
          {mockCreators.map((creator, index) => (
            <div key={index}>
              <div
                className="grid grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-4 py-8 px-4 items-center hover:bg-gray-50 transition-colors cursor-pointer relative"
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Rank Column */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[20px] font-semibold text-black">
                    {creator.rank}
                  </span>
                  <div className="flex items-center gap-0 px-1.5 py-0.5 bg-[rgba(35,140,77,0.3)] rounded-lg">
                    <ArrowUpIcon />
                    <span className="text-[16px] font-medium text-[#238c4d]">
                      +{creator.change}
                    </span>
                  </div>
                </div>

                {/* Creator Info Column */}
                <div className="flex items-center gap-4">
                  <div className="relative w-34.5 h-29.5 rounded-[15px] overflow-hidden">
                    <Image
                      src={creator.imageUrl}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[20px] font-medium text-black">
                        {creator.name}
                      </span>
                      {creator.verified && <VerifyIcon />}
                    </div>
                    <div className="flex items-center gap-2">
                      {creator.platforms.tiktok && (
                        <div className="w-6 h-6 relative">
                          <Image
                            src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                            alt="TikTok"
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                      {creator.platforms.youtube && (
                        <div className="w-7 h-6 relative">
                          <Image
                            src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                            alt="YouTube"
                            width={28}
                            height={24}
                          />
                        </div>
                      )}
                      {creator.platforms.instagram && (
                        <div className="w-6 h-6 relative">
                          <Image
                            src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                            alt="Instagram"
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                      {creator.platforms.facebook && (
                        <div className="w-6 h-6 relative">
                          <Image
                            src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                            alt="Facebook"
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Columns */}
                <div className="text-[32px] font-normal text-black text-center">
                  {creator.lastWeek}
                </div>
                <div className="text-[32px] font-normal text-black text-center">
                  {creator.peak}
                </div>
                <div className="text-[32px] font-normal text-black text-center">
                  {creator.woc}
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center bg-[#14532d] text-white text-[26px] font-bold px-3 py-2 rounded-[5px] min-w-14.5">
                    {creator.cpiScore}
                  </div>
                </div>

                {/* View/Close Button */}
                <div className="flex justify-center">
                  {(hoveredRow === index || expandedRow === index) && (
                    <button
                      onClick={() => toggleRow(index)}
                      className="flex items-center gap-2 text-[18px] font-semibold text-black hover:text-gray-700 transition-colors"
                    >
                      {expandedRow === index ? (
                        <>
                          Close
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 5L10 15M10 5L5 10M10 5L15 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          View
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 15L10 5M10 15L15 10M10 15L5 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
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
                        {creator.debutChartDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[18px] font-semibold text-black min-w-45">
                        Peak Chart Date
                      </span>
                      <span className="text-[18px] font-normal text-black">
                        {creator.peakChartDate}
                      </span>
                    </div>
                    <button className="mt-4 px-8 py-3 bg-[#14532d] text-white text-[16px] font-semibold rounded-lg hover:bg-[#1a6b3d] transition-colors">
                      Share Promo Card
                    </button>
                  </div>
                </div>
              )}

              {/* Divider Line */}
              {index < mockCreators.length - 1 && (
                <div className="h-px bg-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
