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
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
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

  const getRankBadge = (index: number, change: string) => {
    if (index === 0) {
      return (
        <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
          <Image
            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
            alt="arrow-up"
            width={14}
            height={14}
          />
          <span className="text-[10px] font-medium text-[#238c4d]">
            {change}
          </span>
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
          <span className="text-[10px] font-medium text-[#2078ec]">
            Re-entry
          </span>
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
            {change}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(0,0,0,0.2)] rounded-lg">
          <span className="text-[10px] font-medium text-[rgba(0,0,0,0.6)]">
            —
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
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-[34px] font-extrabold leading-17.5 text-black mb-2">
            Trending Creators
          </h1>
          <p className="text-[18px] font-medium text-black mb-6">
            Creators rapidly gaining momentum
          </p>
        </div>

        {/* Filter Dropdown */}
        <div
          className="sticky z-40 bg-white pb-6 pt-2 transition-all duration-300"
          style={{ top: navbarVisible ? "88px" : "0px" }}
        >
          <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-6 px-4 py-2.5 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[18px] font-semibold text-black">
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
              <div className="inline-flex items-center gap-6 px-4 py-2.5 ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[18px] font-semibold text-black">
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

        {/* Trending Creators List */}
        <div className="space-y-0">
          {mockCreators.map((creator, index) => (
            <div key={index} className="border-b">
              <div
                className="py-6 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() =>
                  setExpandedRow(expandedRow === index ? null : index)
                }
              >
                {/* Content Container */}
                <div className="flex items-center gap-4">
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 min-w-fit lg:w-24">
                    <span className="text-[18px] font-semibold text-black">
                      {creator.rank}
                    </span>
                    {getRankBadge(index, creator.change)}
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
                        {creator.ranking}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#e2e8f0] px-3 py-1 rounded-lg">
                          <span className="text-[13px] font-medium text-[#1f1f1f]">
                            {creator.country}
                          </span>
                        </div>
                        <div className="bg-[rgba(35,140,77,0.3)] flex items-center gap-0.5 px-2 py-1 rounded-lg">
                          <Image
                            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
                            alt="arrow-up"
                            width={14}
                            height={14}
                          />
                          <span className="text-[12px] font-medium text-[#238c4d]">
                            {creator.growthPercent}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(creator.status, creator.statusRank)}
                    </div>
                  </div>

                  {/* View/Close Button */}
                  <div className="flex justify-center">
                    {(hoveredRow === index || expandedRow === index) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRow(expandedRow === index ? null : index);
                        }}
                        className="flex items-center gap-2 text-[15px] font-semibold text-black hover:text-gray-700 transition-colors"
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
              </div>

              {/* Expanded Content */}
              {expandedRow === index && (
                <div className="px-4 pb-8">
                  <div className="ml-32 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-semibold text-black min-w-45">
                        Debut Chart Date
                      </span>
                      <span className="text-[15px] font-normal text-black">
                        {creator.debutChartDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-semibold text-black min-w-45">
                        Peak Chart Date
                      </span>
                      <span className="text-[15px] font-normal text-black">
                        {creator.peakChartDate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCreatorsClient;
