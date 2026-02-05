"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetRankings, useGetActiveCountries } from "@/hooks/useGetRankings";
import { useFilterStore, syncFiltersFromURL } from "@/lib/stores/filter-store";

interface Creator {
  id: string;
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
  .map((i, index) => ({
    id: String(index + 1),
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
    width={14}
    height={14}
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

const getRankBadge = (index: number, change: number) => {
  if (index === 0) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
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
        <span className="text-[10px] font-medium text-[#238c4d]">
          +{change}
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
        <span className="text-[10px] font-medium text-[#2078ec]">Re-entry</span>
      </div>
    );
  } else if (index === 3) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(179,38,30,0.3)] rounded-lg">
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
        <span className="text-[10px] font-medium text-[#b3261e]">-1</span>
      </div>
    );
  } else if (index === 4) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
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
};

export default function TopCreatorClient() {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [weeklyRange, setWeeklyRange] = useState("Jan 9 - 15, 2026");
  const { country: selectedCountry, setCountry: setSelectedCountry } =
    useFilterStore();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Fetch active countries
  const { countries: activeCountries, isLoading: countriesLoading } =
    useGetActiveCountries();

  // Fetch creator rankings based on selected country
  const { rankings: creatorRankings, isLoading: creatorsLoading } =
    useGetRankings({
      country: selectedCountry,
    });

  const dateRanges = [
    "Jan 9 - 15, 2026",
    "Jan 2 - 8, 2026",
    "Dec 26 - Jan 1, 2025",
    "Dec 19 - 25, 2025",
    "Dec 12 - 18, 2025",
    "Dec 5 - 11, 2025",
  ];

  // Transform fetched rankings to match Creator interface
  const creators: Creator[] =
    creatorRankings[0]?.entries.map((entry) => ({
      id: entry.creator_id,
      rank: entry.rank,
      lastWeek: entry.previous_rank || entry.rank,
      peak: entry.rank,
      woc: 1,
      cpiScore: Math.round(entry.cpi_score),
      name: entry.creator.display_name,
      verified: entry.creator.is_verified,
      imageUrl:
        entry.creator.avatar || "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
      platforms: {
        tiktok: true,
        youtube: true,
        instagram: true,
        facebook: true,
      },
      change: entry.previous_rank
        ? Math.abs(entry.rank - entry.previous_rank)
        : 1,
      debutChartDate: "29th January, 2025",
      peakChartDate: "2nd February, 2025",
    })) || mockCreators;

  // Format country name for display (replace underscores with spaces)
  const formatCountryName = (country: string) => {
    return country.replace(/_/g, " ");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      // Navbar shows when scrolling up or at top
      if (currentScrollY <= 100 || difference < -5) {
        setNavbarVisible(true);
      }
      // Navbar hides when scrolling down past 100px
      else if (currentScrollY > 100 && difference > 0) {
        setNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 px-5 md:px-8 lg:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-4 ">
          <h1 className="text-[24px] md:text-[34px] font-extrabold leading-tight md:leading-17.5 text-black mb-1 md:mb-2">
            Top 100 Creators
          </h1>
          <p className="text-[14px] md:text-[18px] font-medium text-black mb-4 md:mb-6">
            Your update of the top 100 creators
          </p>
        </div>

        {/* Filter Dropdown & Table Headers */}
        <div
          className="sticky z-40 bg-white flex flex-col transition-all duration-300"
          style={{ top: navbarVisible ? "88px" : "0px" }}
        >
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-2 lg:gap-0 items-center pb-4 pt-2">
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
                      className={`text-left px-3 py-2 text-[14px] text-black rounded hover:bg-gray-100 transition-colors ${
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
                    {formatCountryName(selectedCountry)}
                  </span>
                  <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                {countriesLoading ? (
                  <div className="p-3 text-center text-sm text-gray-500">
                    Loading countries...
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {activeCountries.map((countryData) => (
                      <button
                        key={countryData.country}
                        onClick={() => {
                          setSelectedCountry(countryData.country);
                          setGlobalOpen(false);
                        }}
                        className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 text-black transition-colors ${
                          selectedCountry === countryData.country
                            ? "bg-gray-100 font-semibold"
                            : "font-normal"
                        }`}
                      >
                        {formatCountryName(countryData.country)}
                      </button>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          {/* Table Headers - Desktop */}
          <div className="hidden md:grid grid-cols-[50px_1fr_60px_60px_60px_100px] lg:grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-2 lg:gap-4 border-b px-4 py-2">
            <div className="text-[14px] lg:text-[20px] font-medium text-center text-black">
              #
            </div>
            <div className="text-[18px] font-bold text-black">CREATORS</div>
            <div className="flex items-center justify-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help">
                    <QuestionIcon />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[13px] text-gray-700">
                    The creator&apos;s position on this chart during the
                    previous chart week
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[15px] font-bold text-black">LW</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help">
                    <QuestionIcon />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[13px] text-gray-700">
                    The highest position a creator has ever achieved on this
                    chart
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[15px] font-bold text-black">PEAK</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help">
                    <QuestionIcon />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[13px] text-gray-700">
                    The total number of weeks a creator has appeared on this
                    chart
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[15px] font-bold text-black">WOC</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help">
                    <QuestionIcon />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[13px] text-gray-700">
                    Creator Performance Index - Overall score based on
                    popularity, engagement, and chart performance
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[15px] font-bold text-black">
                <span className="lg:hidden">CPI</span>
                <span className="hidden lg:inline">CPI SCORE</span>
              </span>
            </div>
            <div className="hidden lg:block"></div>
          </div>

          {/* Table Headers - Mobile */}
          <div className="md:hidden grid grid-cols-[40px_1fr_48px] gap-3 border-b px-0 py-2">
            <div className="text-[12px] font-medium text-center text-black">
              #
            </div>
            <div className="text-[12px] font-bold text-black">CREATORS</div>
            <div className="flex items-center justify-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help">
                    <Image
                      src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                      alt="Help"
                      width={10}
                      height={10}
                      className="md:w-3 md:h-3"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[12px] text-gray-700">
                    Creator Performance Index - Overall score based on
                    popularity, engagement, and chart performance
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[12px] md:text-[14px] font-bold text-black">
                CPI
              </span>
            </div>
          </div>
        </div>

        {/* Creators List */}
        <div className="space-y-0">
          {creatorsLoading ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">Loading creators...</p>
            </div>
          ) : creators.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No creators found</p>
              <p className="text-sm mt-2">Try selecting a different country</p>
            </div>
          ) : (
            creators.map((creator, index) => (
              <div key={index} className="border-b">
                {/* Desktop View */}
                <div
                  className="hidden md:grid grid-cols-[50px_1fr_60px_60px_60px_100px] lg:grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-2 lg:gap-4 py-6 px-4 items-center hover:bg-gray-50 transition-colors cursor-pointer relative"
                  onClick={() => toggleRow(index)}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[18px] font-semibold text-black">
                      {index + 1}
                    </span>
                    {getRankBadge(index, creator.change)}
                  </div>

                  {/* Creator Info Column */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-[80px] h-[70px] rounded-[5px] overflow-hidden">
                      <Image
                        src={creator.imageUrl}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[18px] font-bold text-black hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator?.id}`);
                          }}
                        >
                          {creator.name}
                        </span>
                        {creator.verified && <VerifyIcon />}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {creator.platforms.tiktok && (
                          <div className="w-6 h-6 relative">
                            <Image
                              src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                              alt="TikTok"
                              width={18}
                              height={18}
                            />
                          </div>
                        )}
                        {creator.platforms.youtube && (
                          <div className="w-7 h-6 relative">
                            <Image
                              src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                              alt="YouTube"
                              width={20}
                              height={18}
                            />
                          </div>
                        )}
                        {creator.platforms.instagram && (
                          <div className="w-6 h-6 relative">
                            <Image
                              src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                              alt="Instagram"
                              width={18}
                              height={18}
                            />
                          </div>
                        )}
                        {creator.platforms.facebook && (
                          <div className="w-6 h-6 relative">
                            <Image
                              src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                              alt="Facebook"
                              width={18}
                              height={18}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats Columns */}
                  <div className="text-[20px] font-normal text-black text-center">
                    {creator.lastWeek}
                  </div>
                  <div className="text-[20px] font-normal text-black text-center">
                    {creator.peak}
                  </div>
                  <div className="text-[20px] font-normal text-black text-center">
                    {creator.woc}
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[16px] font-bold px-3 py-2 rounded-[3px] min-w-[40px]">
                      {creator.cpiScore}
                    </div>
                  </div>

                  {/* View/Close Button */}
                  <div className="hidden lg:flex justify-center">
                    {(hoveredRow === index || expandedRow === index) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRow(index);
                        }}
                        className="flex items-center gap-2 text-[15px] font-semibold text-black hover:text-gray-700 transition-colors"
                      >
                        {expandedRow === index ? (
                          <svg
                            width="16"
                            height="16"
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
                        ) : (
                          <svg
                            width="16"
                            height="16"
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
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div
                  className="md:hidden grid grid-cols-[40px_1fr_48px] gap-3 py-4 px-0 items-start cursor-pointer"
                  onClick={() => toggleRow(index)}
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 pt-1">
                    <span className="text-[16px] md:text-[20px] font-semibold text-black">
                      {index + 1}
                    </span>
                    {getRankBadge(index, creator.change)}
                  </div>

                  {/* Creator Info Column */}
                  <div className="flex items-stretch gap-3 md:gap-5">
                    <div className="relative w-14 md:w-20 aspect-square rounded-[4px] md:rounded-[5px] overflow-hidden flex-shrink-0">
                      <Image
                        src={creator.imageUrl}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2 min-w-0">
                      <div className="flex items-center gap-1 md:gap-2">
                        <span
                          className="text-[15px] md:text-[18px] font-bold text-black hover:underline cursor-pointer truncate"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator.id}`);
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
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        {creator.platforms.tiktok && (
                          <Image
                            src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                            alt="TikTok"
                            width={14}
                            height={14}
                            className="md:w-5 md:h-5"
                          />
                        )}
                        {creator.platforms.youtube && (
                          <Image
                            src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                            alt="YouTube"
                            width={14}
                            height={14}
                            className="md:w-5 md:h-5"
                          />
                        )}
                        {creator.platforms.instagram && (
                          <Image
                            src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                            alt="Instagram"
                            width={14}
                            height={14}
                            className="md:w-5 md:h-5"
                          />
                        )}
                        {creator.platforms.facebook && (
                          <Image
                            src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                            alt="Facebook"
                            width={14}
                            height={14}
                            className="md:w-5 md:h-5"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 text-[12px] md:text-[15px] text-gray-600">
                        <span>
                          LW:{" "}
                          <span className="font-medium text-black">
                            {creator.lastWeek}
                          </span>
                        </span>
                        <span>
                          Peak:{" "}
                          <span className="font-medium text-black">
                            {creator.peak}
                          </span>
                        </span>
                        <span>
                          WOC:{" "}
                          <span className="font-medium text-black">
                            {creator.woc}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score Column */}
                  <div className="flex justify-end pt-1">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[14px] md:text-[16px] font-bold px-2 md:px-3 py-1.5 md:py-2 rounded-[3px] min-w-[34px] md:min-w-[44px]">
                      {creator.cpiScore}
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Desktop */}
                {expandedRow === index && (
                  <div className="hidden md:block px-4 pb-8">
                    <div className="md:ml-[154px] lg:ml-53 space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-black min-w-45">
                          Debut Entry Date
                        </span>
                        <span className="text-[15px] font-normal text-black">
                          {creator.debutChartDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-black min-w-45">
                          Debut Entry Position
                        </span>
                        <span className="text-[15px] font-normal text-black">
                          {creator.peakChartDate}
                        </span>
                      </div>
                      <button className="mt-4 px-8 py-3 bg-[#14532d] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1a6b3d] transition-colors">
                        Share Promo Card
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded Content - Mobile */}
                {expandedRow === index && (
                  <div className="md:hidden px-0 pb-6">
                    <div className="ml-[52px] space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold text-black">
                          Debut Entry Date
                        </span>
                        <span className="text-[13px] font-normal text-black">
                          {creator.debutChartDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold text-black">
                          Debut Entry Position
                        </span>
                        <span className="text-[13px] font-normal text-black">
                          {creator.peakChartDate}
                        </span>
                      </div>
                      <button className="mt-3 w-full py-2.5 bg-[#14532d] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1a6b3d] transition-colors">
                        Share Promo Card
                      </button>
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(index);
                          }}
                          className="flex items-center gap-1.5 text-[13px] font-semibold text-black"
                        >
                          Close
                          <svg
                            width="14"
                            height="14"
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
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
