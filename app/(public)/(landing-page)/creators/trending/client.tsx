"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TrendingCreator {
  rank: number;
  name: string;
  verified: boolean;
  countryCode: string;
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
  const router = useRouter();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [weeklyRange, setWeeklyRange] = useState("Jan 9 - 15, 2026");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  const dateRanges = [
    "Jan 9 - 15, 2026",
    "Jan 2 - 8, 2026",
    "Dec 26 - Jan 1, 2025",
    "Dec 19 - 25, 2025",
    "Dec 12 - 18, 2025",
    "Dec 5 - 11, 2025",
  ];

  const countries = ["Global", "United States", "Nigeria"];

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

  const mockCreators: TrendingCreator[] = [
    {
      rank: 1,
      name: "Davido",
      verified: true,
      countryCode: "NG",
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
      countryCode: "PE",
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
      countryCode: "RO",
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
      countryCode: "RO",
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
      countryCode: "RO",
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
      countryCode: "RO",
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

  const getRankBadge = (change: string) => {
    if (change === "New") {
      return (
        <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(32,120,236,0.2)] rounded-lg">
          <span className="text-[10px] font-medium text-[#2078ec]">New</span>
        </div>
      );
    }
    return null;
  };

  const getGrowthBadge = (growthPercent: string) => {
    const isPositive = growthPercent.startsWith("+");
    const isNegative = growthPercent.startsWith("-");

    if (isPositive) {
      return (
        <div className="bg-[rgba(35,140,77,0.3)] flex items-center gap-0.5 px-2 py-1 rounded-lg">
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2L6 10"
              stroke="#238c4d"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M3 5L6 2L9 5"
              stroke="#238c4d"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] font-medium text-[#238c4d]">
            {growthPercent}
          </span>
        </div>
      );
    } else if (isNegative) {
      return (
        <div className="bg-[rgba(179,38,30,0.3)] flex items-center gap-0.5 px-2 py-1 rounded-lg">
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path
              d="M6 2L6 10"
              stroke="#b3261e"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M3 5L6 2L9 5"
              stroke="#b3261e"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] font-medium text-[#b3261e]">
            {growthPercent}
          </span>
        </div>
      );
    } else {
      return (
        <div className="bg-[rgba(0,0,0,0.2)] flex items-center gap-0.5 px-2 py-1 rounded-lg">
          <span className="text-[12px] font-medium text-[rgba(0,0,0,0.6)]">
            {growthPercent}
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
        <div className="flex items-center gap-1">
          <div className="bg-[#fffbeb] flex items-center gap-2 px-2 py-1 rounded-lg">
            <Image
              src="/4b4e9b5f4c6aea98e51bc90a22de01893b2c0cd4.svg"
              alt="fire"
              width={16}
              height={16}
            />
            <span className="text-[13px] font-semibold text-[#dc831a]">
              At Peak
            </span>
          </div>
          <div className="bg-[#f1f5f9] flex items-center px-2 py-1 rounded-lg">
            <span className="text-[13px] font-semibold text-black">{rank}</span>
          </div>
        </div>
      );
    } else if (status === "approaching-peak") {
      return (
        <div className="flex items-center gap-1">
          <div className="bg-[#faf5ff] flex items-center gap-2 px-2 py-1 rounded-lg">
            <Image
              src="/05e53a44b4dfa0c378af6ded91b01f0ccd7661d4.svg"
              alt="rocket"
              width={16}
              height={16}
            />
            <span className="text-[13px] font-semibold text-[#b35afb]">
              Approaching Peak
            </span>
          </div>
          <div className="bg-[#f1f5f9] flex items-center px-2 py-1 rounded-lg">
            <span className="text-[13px] font-semibold text-black">{rank}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <div className="bg-[#ecfdf5] flex items-center gap-2 px-2 py-1 rounded-lg">
            <Image
              src="/3931706a1c0b7a69172be5436781ba72d2b5b409.svg"
              alt="rocket"
              width={16}
              height={16}
            />
            <span className="text-[13px] font-semibold text-[#43b997]">
              Rising Fast
            </span>
          </div>
          <div className="bg-[#f1f5f9] flex items-center px-2 py-1 rounded-lg">
            <span className="text-[13px] font-semibold text-black">{rank}</span>
          </div>
        </div>
      );
    }
  };

  // Mobile version of status badge with smaller sizing

  const getCountryFlag = (countryCode: string) => {
    return (
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "2px",
        }}
        title={countryCode}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 px-5 md:px-8 lg:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[34px] font-extrabold leading-tight md:leading-17.5 text-black mb-1 md:mb-2">
            Trending Creators
          </h1>
          <p className="text-[14px] md:text-[18px] font-medium text-black mb-4 md:mb-6">
            {selectedCountry === "Global"
              ? "The most influential creators worldwide gaining momentum based on performance"
              : `Creators rapidly gaining momentum in ${selectedCountry}`}
          </p>
        </div>

        {/* Filter Dropdown */}
        <div
          className="sticky z-40 bg-white pb-4 pt-2 transition-all duration-300"
          style={{ top: navbarVisible ? "88px" : "0px" }}
        >
          <div className="flex flex-wrap gap-2 lg:gap-0 items-center">
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

            <Popover open={globalOpen} onOpenChange={setGlobalOpen}>
              <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
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
        </div>

        {/* Trending Creators List */}
        <div className="space-y-0">
          {mockCreators.map((creator, index) => (
            <div key={index} className="border-b">
              {/* Desktop View */}
              <div className="hidden md:block py-6 px-4 hover:bg-gray-50 transition-colors">
                {/* Content Container */}
                <div className="flex items-center gap-4">
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 min-w-[50px] lg:w-24">
                    <span className="text-[18px] font-semibold text-black">
                      {creator.rank}
                    </span>
                    {getRankBadge(creator.change)}
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-stretch gap-4 flex-1">
                    <div className="relative w-[80px] min-h-[70px] rounded-[5px] overflow-hidden">
                      <Image
                        src={creator.thumbnail}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <div className="flex-1 flex justify-between items-stretch flex-col">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[18px] font-bold text-black hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator.rank}`);
                          }}
                        >
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <Image
                            src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                            alt="verified"
                            width={18}
                            height={18}
                          />
                        )}
                        <div className="w-4 h-4 flex items-center justify-center">
                          {getCountryFlag(creator.countryCode)}
                        </div>
                      </div>
                      <span className="text-[14px] font-medium text-[rgba(31,31,31,0.5)]">
                        {creator.ranking} • {creator.country}
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedCountry === "Global" && (
                          <div className="bg-[#e2e8f0] px-3 py-1 rounded-md">
                            <div className="flex items-center gap-2 text-[13px] font-medium text-[#1f1f1f]">
                              <span>Trending</span>
                              <div className="flex items-center gap-1.5">
                                {getCountryFlag(creator.countryCode)} #1
                              </div>
                              <span className="text-gray-400">•</span>
                              <div className="flex items-center gap-1.5">
                                {getCountryFlag("PE")} #9
                              </div>
                              <span className="text-gray-400">•</span>
                              <div className="flex items-center gap-1.5">
                                {getCountryFlag("RO")} #11
                              </div>
                            </div>
                          </div>
                        )}
                        {getGrowthBadge(creator.growthPercent)}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(creator.status, creator.statusRank)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden py-4 md:py-6 px-4">
                <div className="flex items-start gap-3 md:gap-5">
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 pt-1 min-w-[40px] md:min-w-[70px]">
                    <span className="text-[16px] md:text-[20px] font-semibold text-black">
                      {creator.rank}
                    </span>
                    {getRankBadge(creator.change)}
                  </div>

                  {/* Creator Info */}
                  <div className="flex flex-col gap-3 md:gap-5 flex-1">
                    <div className="flex items-start justify-between  gap-3 md:gap-5 flex-1">
                      <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-[4px] md:rounded-[5px] overflow-hidden flex-shrink-0">
                        <Image
                          src={creator.thumbnail}
                          alt={creator.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                      </div>

                      <div className="flex flex-col gap-1 md:gap-2 min-w-0 flex-1">
                        <div className="flex items-center gap-1 md:gap-2">
                          <span
                            className="text-[15px] md:text-[18px] font-bold text-black hover:underline cursor-pointer truncate"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/creator/${creator.rank}`);
                            }}
                          >
                            {creator.name}
                          </span>
                          {creator.verified && (
                            <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6">
                              <Image
                                src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                                alt="Verified"
                                width={16}
                                height={16}
                                className="md:w-6 md:h-6"
                              />
                            </div>
                          )}
                          <div className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center flex-shrink-0">
                            {getCountryFlag(creator.countryCode)}
                          </div>
                        </div>
                        <span className="text-[12px] md:text-[14px] font-medium text-[rgba(31,31,31,0.5)] truncate">
                          {creator.ranking} • {creator.country}
                        </span>
                        <div
                          className={`flex items-center ${index === 0 ? "gap-2" : ""}`}
                        >
                          <div className="flex items-center gap-2 ">
                            {selectedCountry === "Global" && (
                              <div className="bg-[#e2e8f0] px-3 py-1 rounded-md">
                                <div className="flex items-center gap-2 text-[13px] font-medium text-[#1f1f1f]">
                                  <span>Trending</span>
                                  <div className="flex items-center gap-1.5">
                                    {getCountryFlag(creator.countryCode)} #1
                                  </div>
                                  <span className="text-gray-400">•</span>
                                  <div className="flex items-center gap-1.5">
                                    {getCountryFlag("PE")} #9
                                  </div>
                                  <span className="text-gray-400">•</span>
                                  <div className="flex items-center gap-1.5">
                                    {getCountryFlag("RO")} #11
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="w-fit">
                            {getGrowthBadge(creator.growthPercent)}
                          </div>{" "}
                        </div>
                      </div>
                      {/* Status Badge - Mobile */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCreatorsClient;
