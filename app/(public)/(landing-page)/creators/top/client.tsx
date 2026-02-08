"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  country?: string;
  countryFlag?: string;
  countryCode?: string;
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

const mockCreators: Creator[] = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: String(index + 1),
    rank: index + 1,
    lastWeek:
      index === 0
        ? 2
        : index === 1
          ? 0
          : index === 2
            ? 0
            : index === 3
              ? 2
              : index + 1,
    peak: index + 1,
    woc: Math.floor(Math.random() * 20) + 1,
    cpiScore: 98 - index * 2,
    name: [
      "Carter Efe",
      "Sabinus",
      "Mr Macaroni",
      "Brain Jotter",
      "Sydney Talker",
      "Taaooma",
      "Maraji",
      "Lasisi Elenu",
      "Broda Shaggi",
      "Josh2funny",
    ][index],
    verified: index < 8,
    imageUrl: [
      "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
      "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      "/c9d16bc2baf7fe3d693ca126dd7a838dc5a4b3da.png",
      "/ba79e0bf3d00ddf3f1221c52a300df4fe0fb3f0c.png",
      "/25e5a98e3bb746e2d47829f93902bb5487bb9be3.png",
      "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
      "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      "/c9d16bc2baf7fe3d693ca126dd7a838dc5a4b3da.png",
      "/ba79e0bf3d00ddf3f1221c52a300df4fe0fb3f0c.png",
      "/25e5a98e3bb746e2d47829f93902bb5487bb9be3.png",
    ][index % 5],
    country: [
      "Nigeria",
      "Nigeria",
      "Nigeria",
      "Ghana",
      "Kenya",
      "Nigeria",
      "South Africa",
      "Nigeria",
      "Ghana",
      "Nigeria",
    ][index],
    countryFlag: ["🇳🇬", "🇳🇬", "🇳🇬", "🇬🇭", "🇰🇪", "🇳🇬", "🇿🇦", "🇳🇬", "🇬🇭", "🇳🇬"][
      index
    ],
    countryCode: ["NG", "NG", "NG", "GH", "KE", "NG", "ZA", "NG", "GH", "NG"][
      index
    ],
    platforms: {
      tiktok: true,
      youtube: true,
      instagram: true,
      facebook: index % 2 === 0,
    },
    change: index === 0 ? 2 : index === 3 ? 1 : 1,
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  }));

const staticCountries = [
  { country: "Global", count: 100 },
  { country: "Nigeria", count: 45 },
  { country: "Ghana", count: 20 },
  { country: "Kenya", count: 15 },
  { country: "South_Africa", count: 10 },
  { country: "United_Kingdom", count: 8 },
  { country: "United_States", count: 2 },
];

const QuestionIcon = () => (
  <Image
    src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
    alt="Help"
    width={14}
    height={14}
  />
);

const VerifyIcon = ({ size = 16 }: { size?: number }) => (
  <Image
    src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
    alt="Verified"
    width={size}
    height={size}
  />
);

const getRankBadge = (index: number, change: number) => {
  if (index === 0) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dcfce7] rounded-full">
        <ArrowUp className="w-3 h-3 text-[#166534]" strokeWidth={2.5} />
        <span className="text-[11px] font-semibold text-[#166534]">
          +{change}
        </span>
      </div>
    );
  } else if (index === 1) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dbeafe] rounded-full">
        <span className="text-[11px] font-semibold text-[#1e40af]">New</span>
      </div>
    );
  } else if (index === 2) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dbeafe] rounded-full">
        <span className="text-[11px] font-semibold text-[#1e40af]">
          Re-entry
        </span>
      </div>
    );
  } else if (index === 3) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#fee2e2] rounded-full">
        <ArrowDown className="w-3 h-3 text-[#991b1b]" strokeWidth={2.5} />
        <span className="text-[11px] font-semibold text-[#991b1b]">
          -{change}
        </span>
      </div>
    );
  } else if (index === 4) {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dcfce7] rounded-full">
        <ArrowUp className="w-3 h-3 text-[#166534]" strokeWidth={2.5} />
        <span className="text-[11px] font-semibold text-[#166534]">
          +{change}
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-gray-100 rounded-full">
        <span className="text-[11px] font-semibold text-gray-500">-</span>
      </div>
    );
  }
};

export default function TopCreatorClient() {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
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

  const dateRanges = [
    "Jan 9 - 15, 2026",
    "Jan 2 - 8, 2026",
    "Dec 26 - Jan 1, 2025",
    "Dec 19 - 25, 2025",
    "Dec 12 - 18, 2025",
    "Dec 5 - 11, 2025",
  ];

  // Use static data for now
  const creators: Creator[] = mockCreators;

  // Format country name for display (replace underscores with spaces)
  const formatCountryName = (country: string) => {
    return country.replace(/_/g, " ");
  };

  // Helper function to render circular country flag
  const getCountryFlag = (countryCode: string, size: number = 20) => {
    return (
      <CircleFlag
        countryCode={countryCode.toLowerCase()}
        height={size}
        width={size}
      />
    );
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
    <div className="min-h-screen bg-white py-8 md:py-16 section-px">
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
          <div className="flex flex-wrap gap-3 items-center pb-4 pt-2">
            <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
              <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/8 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-[14px] font-medium text-[#0b0b0b]">
                    {weeklyRange}
                  </span>
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5" />
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
                <div className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/8 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-[14px] font-medium text-[#0b0b0b]">
                    {formatCountryName(selectedCountry)}
                  </span>
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-1">
                  {staticCountries.map((countryData) => (
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
              </PopoverContent>
            </Popover>
          </div>

          {/* Table Headers - Desktop */}
          <div
            className={`hidden md:grid gap-2 xl:gap-4 border-b border-black/8 px-6 py-4 items-center ${
              selectedCountry === "Global"
                ? "grid-cols-[50px_1fr_80px_65px_65px_65px_100px] lg:grid-cols-[50px_1fr_120px_80px_80px_80px_100px_70px] xl:grid-cols-[80px_1fr_200px_105px_105px_105px_120px]"
                : "grid-cols-[50px_1fr_65px_65px_65px_100px] lg:grid-cols-[50px_1fr_80px_80px_80px_100px_70px] xl:grid-cols-[80px_1fr_105px_105px_105px_120px]"
            }`}
          >
            <div className="text-[12px] font-bold text-center text-gray-500 uppercase">
              #
            </div>
            <div className="text-[12px] font-bold text-gray-500 uppercase">
              CREATORS
            </div>
            {selectedCountry === "Global" && (
              <div className="text-[12px] font-bold text-gray-500 uppercase">
                COUNTRY
              </div>
            )}
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
              <span className="text-[12px] font-bold text-gray-500 uppercase">
                LW
              </span>
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
              <span className="text-[12px] font-bold text-gray-500 uppercase">
                PEAK
              </span>
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
              <span className="text-[12px] font-bold text-gray-500 uppercase">
                WOC
              </span>
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
              <span className="text-[12px] font-bold text-gray-500 uppercase">
                <span className="xl:hidden">CPI</span>
                <span className="hidden xl:inline">CPI SCORE</span>
              </span>
            </div>
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
          {creators.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No creators found</p>
              <p className="text-sm mt-2">Try selecting a different country</p>
            </div>
          ) : (
            creators.map((creator, index) => (
              <div key={index} className="border-b">
                {/* Desktop View */}
                <div
                  className={`hidden md:grid gap-2 xl:gap-4 py-6 px-6 items-center hover:bg-gray-50 transition-colors cursor-pointer relative ${
                    selectedCountry === "Global"
                      ? "grid-cols-[50px_1fr_80px_65px_65px_65px_100px] lg:grid-cols-[50px_1fr_120px_80px_80px_80px_100px_70px] xl:grid-cols-[80px_1fr_200px_105px_105px_105px_120px]"
                      : "grid-cols-[50px_1fr_65px_65px_65px_100px] lg:grid-cols-[50px_1fr_80px_80px_80px_100px_70px] xl:grid-cols-[80px_1fr_105px_105px_105px_120px]"
                  }`}
                  onClick={() => toggleRow(index)}
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[18px] font-semibold text-[#0b0b0b]">
                      {index + 1}
                    </span>
                    {getRankBadge(index, creator.change)}
                  </div>

                  {/* Creator Info Column */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={creator.imageUrl}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[16px] font-bold text-[#0b0b0b] hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator?.id}`);
                          }}
                        >
                          {creator.name}
                        </span>
                        {creator.verified && <VerifyIcon size={16} />}
                      </div>
                      <div className="flex items-center gap-2">
                        {creator.platforms.tiktok && (
                          <div className="flex items-center justify-center w-[18px] h-[18px]">
                            <Image
                              src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                              alt="TikTok"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.youtube && (
                          <div className="flex items-center justify-center w-[18px] h-[18px]">
                            <Image
                              src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                              alt="YouTube"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.instagram && (
                          <div className="flex items-center justify-center w-[18px] h-[18px]">
                            <Image
                              src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                              alt="Instagram"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.facebook && (
                          <div className="flex items-center justify-center w-[18px] h-[18px]">
                            <Image
                              src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                              alt="Facebook"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Country Column (Global only) */}
                  {selectedCountry === "Global" && creator.countryCode && (
                    <div className="flex items-center">
                      <div className="flex items-center gap-2.5 bg-[#f2f6f5] border border-black/8 rounded-full pl-2.5 pr-3.5 py-1.5">
                        {getCountryFlag(creator.countryCode, 20)}
                        <span className="text-[14px] font-medium text-[#0b0b0b]">
                          {creator.country}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Stats Columns */}
                  <div className="text-[16px] font-medium text-[#0b0b0b] text-center">
                    {creator.lastWeek}
                  </div>
                  <div className="text-[16px] font-medium text-[#0b0b0b] text-center">
                    {creator.peak}
                  </div>
                  <div className="text-[16px] font-medium text-[#0b0b0b] text-center">
                    {creator.woc}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[15px] font-bold w-[44px] h-[36px] rounded-[6px]">
                      {creator.cpiScore}
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div
                  className="md:hidden grid grid-cols-[36px_1fr_44px] gap-2.5 py-4 px-0 items-start cursor-pointer"
                  onClick={() => toggleRow(index)}
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 pt-1">
                    <span className="text-[15px] font-semibold text-[#0b0b0b]">
                      {index + 1}
                    </span>
                    {getRankBadge(index, creator.change)}
                  </div>

                  {/* Creator Info Column */}
                  <div className="flex items-stretch gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={creator.imageUrl}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="text-[14px] font-bold text-[#0b0b0b] hover:underline cursor-pointer truncate"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator.id}`);
                          }}
                        >
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <div className="flex-shrink-0">
                            <VerifyIcon size={14} />
                          </div>
                        )}
                        {selectedCountry === "Global" &&
                          creator.countryCode && (
                            <span className="flex-shrink-0 inline-flex items-center gap-1 bg-[#f2f6f5] border border-black/8 rounded-full pl-1 pr-2 py-0.5">
                              {getCountryFlag(creator.countryCode, 14)}
                              <span className="text-[11px] font-medium text-[#0b0b0b]">
                                {creator.country}
                              </span>
                            </span>
                          )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {creator.platforms.tiktok && (
                          <div className="flex items-center justify-center w-[16px] h-[16px]">
                            <Image
                              src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                              alt="TikTok"
                              width={14}
                              height={14}
                            />
                          </div>
                        )}
                        {creator.platforms.youtube && (
                          <div className="flex items-center justify-center w-[16px] h-[16px]">
                            <Image
                              src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                              alt="YouTube"
                              width={14}
                              height={14}
                            />
                          </div>
                        )}
                        {creator.platforms.instagram && (
                          <div className="flex items-center justify-center w-[16px] h-[16px]">
                            <Image
                              src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                              alt="Instagram"
                              width={14}
                              height={14}
                            />
                          </div>
                        )}
                        {creator.platforms.facebook && (
                          <div className="flex items-center justify-center w-[16px] h-[16px]">
                            <Image
                              src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                              alt="Facebook"
                              width={14}
                              height={14}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span>
                          LW:{" "}
                          <span className="font-medium text-[#0b0b0b]">
                            {creator.lastWeek}
                          </span>
                        </span>
                        <span>
                          Peak:{" "}
                          <span className="font-medium text-[#0b0b0b]">
                            {creator.peak}
                          </span>
                        </span>
                        <span>
                          WOC:{" "}
                          <span className="font-medium text-[#0b0b0b]">
                            {creator.woc}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score Column */}
                  <div className="flex justify-end pt-1">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[13px] font-bold w-[38px] h-[32px] rounded-[6px]">
                      {creator.cpiScore}
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Desktop */}
                {expandedRow === index && (
                  <div className="hidden md:block px-6 pb-8">
                    <div className="md:ml-[58px] xl:ml-[96px] space-y-4">
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
                          12
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
                          12
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
