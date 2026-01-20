"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, Play } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const dateRanges = [
  "Jan 9 - 15, 2026",
  "Jan 2 - 8, 2026",
  "Dec 26 - Jan 1, 2025",
  "Dec 19 - 25, 2025",
  "Dec 12 - 18, 2025",
  "Dec 5 - 11, 2025",
];

const countries = ["Global", "United States", "Nigeria", "Peru", "Romania"];

const mockVideos: Video[] = Array(6)
  .fill(null)
  .map((_, idx) => ({
    rank: idx + 1,
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

function getRankBadge(index: number, change: string) {
  if (index === 0) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
        <Image
          src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
          alt="arrow-up"
          width={14}
          height={14}
        />
        <span className="text-[10px] font-medium text-[#238c4d]">{change}</span>
      </div>
    );
  } else if (index === 1) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(32,120,236,0.2)] rounded-lg">
        <span className="text-[10px] font-medium text-[#2078ec]">New</span>
      </div>
    );
  } else if (index === 2) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(32,120,236,0.2)] rounded-lg">
        <span className="text-[10px] font-medium text-[#2078ec]">Re-entry</span>
      </div>
    );
  } else if (index === 3) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(179,38,30,0.3)] rounded-lg">
        <div className="rotate-180">
          <Image
            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
            alt="arrow-down"
            width={14}
            height={14}
            style={{
              filter:
                "invert(32%) sepia(89%) saturate(2094%) hue-rotate(347deg) brightness(87%) contrast(88%)",
            }}
          />
        </div>
        <span className="text-[10px] font-medium text-[#b3261e]">-1</span>
      </div>
    );
  } else if (index === 4) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
        <Image
          src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
          alt="arrow-up"
          width={14}
          height={14}
        />
        <span className="text-[10px] font-medium text-[#238c4d]">
          +{change}
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(0,0,0,0.2)] rounded-lg">
        <span className="text-[10px] font-medium text-[rgba(0,0,0,0.6)]">
          -
        </span>
      </div>
    );
  }
}

export default function VideosTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [weeklyRange, setWeeklyRange] = useState<string>(dateRanges[0]);
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[1]);
  const [weeklyOpen, setWeeklyOpen] = useState<boolean>(false);
  const [globalOpen, setGlobalOpen] = useState<boolean>(false);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      if (currentScrollY <= 100 || difference < -5) {
        setNavbarVisible(true);
      } else if (currentScrollY > 100 && difference > 0) {
        setNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const visibleVideos = useMemo(() => {
    if (selectedCountry === "Global") return mockVideos;
    return mockVideos.filter(() => selectedCountry === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="w-full">
      {/* Filter Dropdown & Table Headers */}
      <div
        className="sticky z-40 backdrop-blur flex flex-col transition-all duration-300"
        style={{ top: navbarVisible ? "88px" : "0px" }}
      >
        {/* Filter Dropdowns */}
        <div className="flex items-center pb-4 pt-2">
          <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[16px] font-semibold text-black">
                  {weeklyRange}
                </span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
              <div className="flex flex-col gap-1">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setWeeklyRange(range);
                      setWeeklyOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
                      weeklyRange === range
                        ? "bg-gray-100 font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={globalOpen} onOpenChange={setGlobalOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-3 px-4 py-2 ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[16px] font-semibold text-black">
                  {selectedCountry}
                </span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
              <div className="flex flex-col gap-1">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country);
                      setGlobalOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
                      selectedCountry === country
                        ? "bg-gray-100 font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-[1fr_150px_120px_150px_120px] gap-4 border-b px-4 py-2">
          <div className="text-[18px] font-bold text-black">VIDEOS</div>
          <div className="text-[15px] font-bold text-black text-center">
            DEBUT DATE
          </div>
          <div className="text-[15px] font-bold text-black text-center">
            PEAK POS.
          </div>
          <div className="text-[15px] font-bold text-black text-center">
            PEAK DATE
          </div>
          <div className="text-[15px] font-bold text-black text-center">
            CPI SCORE
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-0">
        {visibleVideos.map((video, index) => (
          <div key={index} className="border-b">
            <div
              className="grid grid-cols-[1fr_150px_120px_150px_120px] gap-4 py-6 px-4 items-center transition-colors"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Video Column */}
              <div className="flex items-center gap-4">
                <div className="relative w-[80px] h-[70px] rounded-[5px] overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-6 h-6 fill-white text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-bold text-black">
                    {video.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-medium text-black">
                      {video.creator}
                    </span>
                    {video.verified && (
                      <Image
                        src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                        alt="verified"
                        width={18}
                        height={18}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Debut Date */}
              <div className="text-[16px] font-normal text-black text-center">
                {video.debutChartDate}
              </div>

              {/* Peak Position */}
              <div className="text-[20px] font-semibold text-black text-center">
                #{video.peak}
              </div>

              {/* Peak Date */}
              <div className="text-[16px] font-normal text-black text-center">
                {video.peakChartDate}
              </div>

              {/* CPI Score */}
              <div className="flex justify-center">
                <div className="flex items-center justify-center bg-[#14532d] text-white text-[16px] font-bold px-3 py-2 rounded-[3px] min-w-[40px]">
                  {video.streamScore}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
