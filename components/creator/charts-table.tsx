"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChartEntry {
  rank: number;
  country: string;
  chartName: string;
  thumbnail: string;
  lastWeek: number;
  peak: number;
  woc: number;
  cpiScore: number;
  change: string; // "+1", "New", "Re-entry", "-1", "-"
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

const mockEntries: ChartEntry[] = [
  {
    rank: 1,
    country: "United States",
    chartName: "Weekly Top Creators — Nigeria",
    thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    lastWeek: 2,
    peak: 1,
    woc: 96,
    cpiScore: 92,
    change: "+1",
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  },
  {
    rank: 2,
    country: "Nigeria",
    chartName: "Official ranking",
    thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    lastWeek: 9,
    peak: 2,
    woc: 42,
    cpiScore: 87,
    change: "New",
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  },
  {
    rank: 3,
    country: "Peru",
    chartName: "Weekly Top Creators — Peru",
    thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    lastWeek: 11,
    peak: 3,
    woc: 31,
    cpiScore: 84,
    change: "Re-entry",
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  },
  {
    rank: 4,
    country: "Romania",
    chartName: "Weekly Top Creators — Romania",
    thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    lastWeek: 18,
    peak: 4,
    woc: 24,
    cpiScore: 78,
    change: "-1",
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  },
];

function ChangeBadge({ index, change }: { index: number; change: string }) {
  if (index === 0 || index === 3) {
    const isDown = index === 3;
    return (
      <div
        className={`flex items-center gap-0.5 px-2 py-1 rounded-lg ${isDown ? "bg-[rgba(179,38,30,0.3)]" : "bg-[rgba(35,140,77,0.3)]"}`}
      >
        {/* Arrow icon via public asset to match style */}
        <Image
          src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
          alt={isDown ? "arrow-down" : "arrow-up"}
          width={14}
          height={14}
          className={isDown ? "rotate-180" : ""}
          style={
            isDown
              ? {
                  filter:
                    "invert(32%) sepia(89%) saturate(2094%) hue-rotate(347deg) brightness(87%) contrast(88%)",
                }
              : undefined
          }
        />
        <span
          className={`text-[10px] font-medium ${isDown ? "text-[#b3261e]" : "text-[#238c4d]"}`}
        >
          {change}
        </span>
      </div>
    );
  }
  if (index === 1 || index === 2) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(32,120,236,0.2)] rounded-lg">
        <span className="text-[10px] font-medium text-[#2078ec]">{change}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(0,0,0,0.2)] rounded-lg">
      <span className="text-[10px] font-medium text-[rgba(0,0,0,0.6)]">—</span>
    </div>
  );
}

export default function ChartsTable() {
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

  const visibleEntries = useMemo(() => {
    if (selectedCountry === "Global") return mockEntries;
    return mockEntries.filter((e) => e.country === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="w-full">
      {/* Filter Dropdown & Table Headers */}
      <div
        className="sticky z-40 backdrop-blur flex flex-col transition-all duration-300"
        style={{ top: navbarVisible ? "88px" : "0px" }}
      >
        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2 lg:gap-0 items-center pb-4 pt-2">
          <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-2 desktop:gap-3 px-3 desktop:px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[14px] lg:text-[16px] font-semibold text-black">
                  {weeklyRange}
                </span>
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
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
              <div className="inline-flex items-center gap-2 desktop:gap-3 px-3 desktop:px-4 py-2 desktop:ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[14px] lg:text-[16px] font-semibold text-black">
                  {selectedCountry}
                </span>
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
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

        {/* Table Headers - Desktop */}
        <div className="hidden lg:grid grid-cols-[1fr_150px_120px_150px_120px] gap-4 border-b px-4 py-2">
          <div className="text-[18px] font-bold text-black"></div>
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

        {/* Table Headers - Mobile */}
        <div className="lg:hidden grid grid-cols-[1fr_50px] gap-3 border-b px-0 py-2">
          <div className="text-[12px] font-bold text-black">CHART</div>
          <div className="text-[12px] font-bold text-black text-center">
            CPI
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-0">
        {visibleEntries.map((entry, index) => (
          <div key={index} className="border-b">
            {/* Desktop View */}
            <div
              className="hidden lg:grid grid-cols-[1fr_150px_120px_150px_120px] gap-4 py-6 px-4 items-center transition-colors hover:bg-gray-50"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Chart info */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-bold text-black">
                    {entry.chartName}
                  </span>
                  <span className="text-[18px] font-normal text-black/50">
                    Official ranking
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="text-[16px] font-normal text-black text-center">
                {entry.debutChartDate}
              </div>
              <div className="text-[20px] font-semibold text-black text-center">
                #{entry.peak}
              </div>
              <div className="text-[16px] font-normal text-black text-center">
                {entry.peakChartDate}
              </div>
              <div className="flex justify-center">
                <div className="flex items-center justify-center bg-[#14532d] text-white text-[16px] font-bold px-3 py-2 rounded-[3px] min-w-[40px]">
                  {entry.cpiScore}
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden py-4 px-0">
              <div className="grid grid-cols-[1fr_50px] gap-3 items-start">
                {/* Chart info */}
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] font-bold text-black">
                    {entry.chartName}
                  </span>
                  <span className="text-[13px] font-normal text-black/50">
                    Official ranking
                  </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[12px] text-gray-600">
                    <span>
                      Peak:{" "}
                      <span className="font-medium text-black">
                        #{entry.peak}
                      </span>
                    </span>
                    <span>
                      Debut:{" "}
                      <span className="font-medium text-black">
                        {entry.debutChartDate.split(",")[0]}
                      </span>
                    </span>
                  </div>
                </div>

                {/* CPI Score */}
                <div className="flex justify-end">
                  <div className="flex items-center justify-center bg-[#14532d] text-white text-[14px] font-bold px-2 py-1.5 rounded-[3px] min-w-[34px]">
                    {entry.cpiScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
