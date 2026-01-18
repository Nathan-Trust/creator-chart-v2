"use client";

import { useState } from "react";
import Image from "next/image";

interface TrendingCreator {
  rank: number;
  name: string;
  verified: boolean;
  countryFlag: string;
  ranking: string;
  country: string;
  growthPercent: string;
  status: "at-peak" | "approaching-peak" | "rising-fast";
  statusRank: string;
  thumbnail: string;
  change: string;
  debutChartDate: string;
  peakChartDate: string;
}

const TrendingCreatorsClient = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const mockCreators: TrendingCreator[] = [
    {
      rank: 1,
      name: "Davido",
      verified: true,
      countryFlag: "/a4968338b72a4edd117fe5d2af90694017ff468a.svg",
      ranking: "#6 Top 100 Creator",
      country: "Nigeria",
      growthPercent: "+98%",
      status: "at-peak",
      statusRank: "#1",
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "+1",
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    },
    {
      rank: 2,
      name: "Davido",
      verified: true,
      countryFlag: "/39d1e70e9f03141ee62ed409cae04b39144fcb1b.svg",
      ranking: "#9 Global Creator",
      country: "Peru",
      growthPercent: "+98%",
      status: "at-peak",
      statusRank: "#1",
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "New",
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    },
    {
      rank: 3,
      name: "Davido",
      verified: true,
      countryFlag: "/9a5acd577b00105f76938d3bd0c5bf86de3fd9ea.svg",
      ranking: "#11 Global Creator",
      country: "Romania",
      growthPercent: "+98%",
      status: "approaching-peak",
      statusRank: "#2",
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "Re-entry",
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    },
    {
      rank: 4,
      name: "Davido",
      verified: true,
      countryFlag: "/9a5acd577b00105f76938d3bd0c5bf86de3fd9ea.svg",
      ranking: "#19 Top 100 Creator",
      country: "Romania",
      growthPercent: "+98%",
      status: "rising-fast",
      statusRank: "#3",
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "-1",
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    },
    {
      rank: 5,
      name: "Davido",
      verified: true,
      countryFlag: "/9a5acd577b00105f76938d3bd0c5bf86de3fd9ea.svg",
      ranking: "#19 Top 100 Creator",
      country: "Romania",
      growthPercent: "+98%",
      status: "rising-fast",
      statusRank: "#3",
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "+1",
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    },
    {
      rank: 6,
      name: "Davido",
      verified: true,
      countryFlag: "/9a5acd577b00105f76938d3bd0c5bf86de3fd9ea.svg",
      ranking: "#19 Top 100 Creator",
      country: "Romania",
      growthPercent: "+98%",
      status: "rising-fast",
      statusRank: "#3",
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "-",
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    },
  ];

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

  const getStatusBadge = (
    status: "at-peak" | "approaching-peak" | "rising-fast",
    rank: string,
  ) => {
    if (status === "at-peak") {
      return (
        <div className="flex items-center gap-1.5">
          <div className="bg-[#fffbeb] flex items-center gap-4 px-2.5 py-2 rounded-lg">
            <Image
              src="/4b4e9b5f4c6aea98e51bc90a22de01893b2c0cd4.svg"
              alt="fire"
              width={32}
              height={32}
            />
            <span className="text-2xl font-semibold text-[#dc831a]">
              At Peak
            </span>
          </div>
          <div className="bg-[#f1f5f9] flex items-center px-2.5 py-2 rounded-lg">
            <span className="text-2xl font-semibold text-black">{rank}</span>
          </div>
        </div>
      );
    } else if (status === "approaching-peak") {
      return (
        <div className="flex items-center gap-1.5">
          <div className="bg-[#faf5ff] flex items-center gap-4 px-2.5 py-2 rounded-lg">
            <Image
              src="/05e53a44b4dfa0c378af6ded91b01f0ccd7661d4.svg"
              alt="rocket"
              width={32}
              height={32}
            />
            <span className="text-2xl font-semibold text-[#b35afb]">
              Approaching Peak
            </span>
          </div>
          <div className="bg-[#f1f5f9] flex items-center px-2.5 py-2 rounded-lg">
            <span className="text-2xl font-semibold text-black">{rank}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5">
          <div className="bg-[#ecfdf5] flex items-center gap-4 px-2.5 py-2 rounded-lg">
            <Image
              src="/3931706a1c0b7a69172be5436781ba72d2b5b409.svg"
              alt="rocket"
              width={32}
              height={32}
            />
            <span className="text-2xl font-semibold text-[#43b997]">
              Rising Fast
            </span>
          </div>
          <div className="bg-[#f1f5f9] flex items-center px-2.5 py-2 rounded-lg">
            <span className="text-2xl font-semibold text-black">{rank}</span>
          </div>
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
              Trending Creators
            </h1>
            <p className="text-2xl font-medium text-black">
              Creators rapidly gaining momentum
            </p>
          </div>
          <div className="border border-black rounded-3xl px-5 py-4 inline-flex items-end gap-9 cursor-pointer">
            <span className="text-2xl font-medium text-black">Weekly</span>
            <div className="rotate-180">
              <Image
                src="/39ceca98e3571e9ec6420b534802915b19a242d6.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="space-y-0">
          {/* Table Rows */}
          {mockCreators.map((creator, index) => (
            <div key={index}>
              <div
                className={`flex items-center gap-4 px-4 py-8 cursor-pointer transition-colors ${
                  hoveredRow === index || expandedRow === index
                    ? "bg-gray-50"
                    : ""
                }`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleRowClick(index)}
              >
                {/* Rank Column */}
                <div className="flex flex-col items-center gap-1.5 w-20">
                  <span className="text-[32px] font-bold text-black">
                    {creator.rank}
                  </span>
                  {getRankBadge(index, creator.change)}
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-34.5 h-29.5 rounded-lg overflow-hidden">
                    <Image
                      src={creator.thumbnail}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  <div className="flex-1 flex items-end justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-black">
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <Image
                            src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                            alt="verified"
                            width={32}
                            height={32}
                          />
                        )}
                        <Image
                          src={creator.countryFlag}
                          alt={creator.country}
                          width={32}
                          height={32}
                          className="rounded-sm"
                        />
                      </div>
                      <span className="text-2xl font-medium text-[rgba(31,31,31,0.5)]">
                        {creator.ranking}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#e2e8f0] px-4 py-1 rounded-lg">
                          <span className="text-2xl font-medium text-[#1f1f1f]">
                            {creator.country}
                          </span>
                        </div>
                        <div className="bg-[rgba(35,140,77,0.3)] flex items-center px-4 py-0.5 rounded-lg">
                          <Image
                            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
                            alt="arrow-up"
                            width={24}
                            height={24}
                          />
                          <span className="text-xl font-medium text-[#238c4d]">
                            {creator.growthPercent}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(creator.status, creator.statusRank)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content - No promo card for trending creators */}
              {expandedRow === index && (
                <div className="px-4 pb-8 bg-gray-50 animate-in slide-in-from-top duration-200">
                  <div className="ml-24 space-y-4">
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
};

export default TrendingCreatorsClient;
