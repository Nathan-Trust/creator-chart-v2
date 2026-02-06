"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CountryRanking {
  rank: number;
  country: string;
  countryCode: string;
  percentage: number;
  change: string;
  lastWeek: number;
  rankBadge: string;
  region: string;
}

const dateRanges = [
  "Jan 9 - 15, 2026",
  "Jan 2 - 8, 2026",
  "Dec 26 - Jan 1, 2025",
  "Dec 19 - 25, 2025",
  "Dec 12 - 18, 2025",
  "Dec 5 - 11, 2025",
];

const regions = [
  "All Regions",
  "Africa",
  "North America",
  "Europe",
  "Asia",
  "South America",
];

const mockCountries: CountryRanking[] = [
  {
    rank: 1,
    country: "Nigeria",
    countryCode: "NG",
    percentage: 38.2,
    change: "+1",
    lastWeek: 2,
    rankBadge: "Rank #1",
    region: "Africa",
  },
  {
    rank: 2,
    country: "Kenya",
    countryCode: "KE",
    percentage: 22.5,
    change: "+1",
    lastWeek: 3,
    rankBadge: "Rank #1",
    region: "Africa",
  },
  {
    rank: 3,
    country: "Ghana",
    countryCode: "GH",
    percentage: 15.4,
    change: "—",
    lastWeek: 3,
    rankBadge: "Rank #3",
    region: "Africa",
  },
  {
    rank: 4,
    country: "South Africa",
    countryCode: "ZA",
    percentage: 13.1,
    change: "+1",
    lastWeek: 5,
    rankBadge: "Rank #4",
    region: "Africa",
  },
  {
    rank: 5,
    country: "United States",
    countryCode: "US",
    percentage: 2.8,
    change: "—",
    lastWeek: 5,
    rankBadge: "Rank #38",
    region: "North America",
  },
  {
    rank: 6,
    country: "Peru",
    countryCode: "PE",
    percentage: 1.9,
    change: "New",
    lastWeek: 0,
    rankBadge: "Rank #42",
    region: "South America",
  },
];

function ChangeBadge({ change }: { change: string }) {
  if (change.startsWith("+")) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-[rgba(35,140,77,0.3)]">
        <Image
          src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
          alt="arrow-up"
          width={14}
          height={14}
        />
        <span className="text-[10px] font-medium text-[#238c4d]">{change}</span>
      </div>
    );
  }
  if (change.startsWith("-") && change !== "—") {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-[rgba(179,38,30,0.3)]">
        <Image
          src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
          alt="arrow-down"
          width={14}
          height={14}
          className="rotate-180"
          style={{
            filter:
              "invert(32%) sepia(89%) saturate(2094%) hue-rotate(347deg) brightness(87%) contrast(88%)",
          }}
        />
        <span className="text-[10px] font-medium text-[#b3261e]">{change}</span>
      </div>
    );
  }
  if (change === "New" || change === "Re-entry") {
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

function RankBadge({ rank, badge }: { rank: number; badge: string }) {
  let bgColor = "bg-gray-600";

  if (rank === 1) {
    bgColor = "bg-[#2078ec]";
  } else if (rank === 2 || rank === 3) {
    bgColor = "bg-[#f59e0b]";
  } else if (rank >= 4 && rank <= 10) {
    bgColor = "bg-[#14532d]";
  }

  return (
    <div
      className={`${bgColor} text-white text-[12px] font-semibold px-3 py-1 rounded-full whitespace-nowrap`}
    >
      {badge}
    </div>
  );
}

export default function CountriesTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [weeklyRange, setWeeklyRange] = useState<string>(dateRanges[0]);
  const [selectedRegion, setSelectedRegion] = useState<string>(regions[0]);
  const [weeklyOpen, setWeeklyOpen] = useState<boolean>(false);
  const [regionOpen, setRegionOpen] = useState<boolean>(false);
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

  const visibleCountries = useMemo(() => {
    let filtered = mockCountries;

    if (selectedRegion !== "All Regions") {
      filtered = filtered.filter((c) => c.region === selectedRegion);
    }

    return filtered;
  }, [selectedRegion]);

  return (
    <div className="w-full">
      {/* Filter Dropdown & Table Headers */}
      <div
        className="sticky z-40 backdrop-blur flex flex-col transition-all duration-300"
        style={{ top: navbarVisible ? "88px" : "0px" }}
      >
        {/* Section Header */}
        <div className="border-b px-3 lg:px-0 py-3 lg:py-4 mb-3">
          <h3 className="text-[16px] lg:text-[18px] font-bold text-black">
            Top Countries of Significance
          </h3>
          <p className="text-[13px] lg:text-[14px] text-gray-600 mt-1">
            Countries where this creator has the highest engagement and reach
          </p>
        </div >

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-0 pb-4 pt-2">
          <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
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

          <Popover open={regionOpen} onOpenChange={setRegionOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[14px] lg:text-[16px] font-semibold text-black">
                  {selectedRegion}
                </span>
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
              <div className="flex flex-col gap-1">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedRegion(region);
                      setRegionOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
                      selectedRegion === region
                        ? "bg-gray-100 font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop Table Headers */}
        <div className="hidden lg:grid grid-cols-[80px_1fr_200px_150px_120px] gap-4 border-b px-4 py-2">
          <div className="text-[15px] font-bold text-black text-center">
            RANK
          </div>
          <div className="text-[18px] font-bold text-black">COUNTRY</div>
          <div className="text-[15px] font-bold text-black text-center">
            LAST WEEK
          </div>
          <div className="text-[15px] font-bold text-black text-center">
            PERCENTAGE
          </div>
          <div className="text-[15px] font-bold text-black text-center">
            CHANGE
          </div>
        </div>

        {/* Mobile Table Headers */}
        <div className="lg:hidden grid grid-cols-[50px_1fr_80px] gap-3 border-b px-4 py-2">
          <div className="text-[12px] font-bold text-black text-center">
            RANK
          </div>
          <div className="text-[14px] font-bold text-black">COUNTRY</div>
          <div className="text-[12px] font-bold text-black text-center">%</div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-0">
        {visibleCountries.map((country, index) => (
          <div
            key={country.rank}
            className="border-b transition-colors"
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Desktop Row */}
            <div className="hidden lg:grid grid-cols-[80px_1fr_200px_150px_120px] gap-4 py-6 px-4 items-center hover:bg-gray-50">
              {/* Rank */}
              <div className="text-[24px] font-bold text-black text-center">
                {country.rank}
              </div>

              {/* Country with Flag */}
              <div className="flex items-center gap-3">
                <ReactCountryFlag
                  countryCode={country.countryCode}
                  svg
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "2px",
                  }}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-bold text-black">
                    {country.country}
                  </span>
                  <RankBadge rank={country.rank} badge={country.rankBadge} />
                </div>
              </div>

              {/* Last Week */}
              <div className="text-[16px] font-normal text-black text-center">
                {country.lastWeek > 0 ? `#${country.lastWeek}` : "—"}
              </div>

              {/* Percentage */}
              <div className="text-[20px] font-semibold text-black text-center">
                {country.percentage}%
              </div>

              {/* Change */}
              <div className="flex justify-center">
                <ChangeBadge change={country.change} />
              </div>
            </div>

            {/* Mobile Row */}
            <div className="lg:hidden grid grid-cols-[50px_1fr_80px] gap-3 py-4 px-4 items-center">
              {/* Rank */}
              <div className="text-[18px] font-bold text-black text-center">
                {country.rank}
              </div>

              {/* Country Info */}
              <div className="flex items-center gap-2 min-w-0">
                <ReactCountryFlag
                  countryCode={country.countryCode}
                  svg
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[15px] font-bold text-black truncate">
                    {country.country}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <RankBadge rank={country.rank} badge={country.rankBadge} />
                    <span>•</span>
                    <ChangeBadge change={country.change} />
                  </div>
                </div>
              </div>

              {/* Percentage */}
              <div className="text-[16px] font-semibold text-black text-center">
                {country.percentage}%
              </div>
            </div>
          </div>
        ))}

        {visibleCountries.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[16px] text-gray-500">
              No country data available for the selected filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
