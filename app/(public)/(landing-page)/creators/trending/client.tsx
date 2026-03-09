"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { ChevronDown } from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useFilterStore,
  syncFiltersFromURL,
  getApiCountryCode,
  AVAILABLE_COUNTRIES,
} from "@/lib/stores/filter-store";
import { useGetTrendingCreators } from "@/hooks/useGetTrendingCreators";
import type { TrendingCreatorEntryDto } from "@/services/trending-creator.service";
import { getWeekRanges, type WeekRange } from "@/util/week-dates";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { TrendBadge } from "@/components/shared/trend-badge";

interface TrendingCreator {
  id: string;
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

const countryCodeToName: Record<string, string> = {
  NG: "Nigeria",
  GH: "Ghana",
  KE: "Kenya",
  ZA: "South Africa",
  GB: "United Kingdom",
  US: "United States",
  CM: "Cameroon",
  TZ: "Tanzania",
  UG: "Uganda",
  ET: "Ethiopia",
  EG: "Egypt",
  MA: "Morocco",
  SN: "Senegal",
  CI: "Ivory Coast",
  RW: "Rwanda",
  ZW: "Zimbabwe",
  IN: "India",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  BR: "Brazil",
};

/** Format ISO date to "29th January, 2025" */
function formatChartDate(dateStr: string): string {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const date = parseISO(dateStr);
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    return `${day}${suffix} ${format(date, "MMMM, yyyy")}`;
  } catch {
    return dateStr;
  }
}

/**
 * Derive a display status from the DTO badge/change fields.
 */
function deriveStatus(
  entry: TrendingCreatorEntryDto,
): "at-peak" | "approaching-peak" | "rising-fast" {
  const badge = (entry.badge ?? "").toLowerCase();
  if (badge.includes("peak")) return "at-peak";
  if (badge.includes("approach")) return "approaching-peak";
  if (badge.includes("rising") || badge.includes("fast")) return "rising-fast";

  // Fallback heuristics
  if (entry.stats?.peakRank === entry.rank) return "at-peak";
  const change = entry.change ?? "";
  if (change.startsWith("+") || change === "New") return "rising-fast";
  return "rising-fast";
}

/**
 * Map a trending-creator API entry to the local TrendingCreator display shape.
 */
function mapTrendingCreator(entry: TrendingCreatorEntryDto): TrendingCreator {
  const stats = entry.stats;
  const growthRaw = Math.round(stats?.followerGrowth ?? stats?.cpiChange ?? 0);
  const growthPercent =
    growthRaw > 0 ? `+${growthRaw}%` : growthRaw < 0 ? `${growthRaw}%` : "0%";

  const c = entry.creator;
  const avatar =
    c?.avatarUrl ||
    c?.instagramMetrics?.avatarUrl ||
    c?.xMetrics?.avatarUrl ||
    c?.youtubeMetrics?.avatarUrl ||
    c?.tiktokMetrics?.avatarUrl ||
    c?.facebookMetrics?.avatarUrl ||
    "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png";

  return {
    id: entry.creatorId ?? c?._id ?? entry._id ?? "",
    rank: entry.rank,
    name: c?.displayName || c?.name || "Unknown",
    verified: c?.verified ?? false,
    countryCode: (entry.country ?? "").toUpperCase(),
    ranking: entry.subtitle ?? "-",
    country:
      countryCodeToName[(entry.country ?? "").toUpperCase()] ??
      entry.country ??
      "-",
    growthPercent,
    status: deriveStatus(entry),
    statusRank: `#${stats?.peakRank ?? entry.rank}`,
    thumbnail: avatar,
    change: entry.change ?? "-",
    debutChartDate: formatChartDate(stats?.debutEntryDate ?? "-"),
    peakChartDate: "-",
  };
}

const TrendingCreatorsClient = () => {
  const router = useRouter();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dateRanges = useMemo(() => getWeekRanges(6), []);
  const [selectedWeek, setSelectedWeek] = useState<WeekRange>(dateRanges[0]);
  const { country: selectedCountry, setCountry: setSelectedCountry } =
    useFilterStore();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Derive API country filter
  const apiCountry = getApiCountryCode(selectedCountry);

  // Fetch trending creators from API
  const { creators: rawCreators, isLoading } = useGetTrendingCreators(
    {
      country: apiCountry,
      limit: 100,
      weekStartDate: selectedWeek.weekStartDate,
    },
    true,
  );

  // Map API data to display shape, fall back to empty array
  const creators: TrendingCreator[] = useMemo(() => {
    if (rawCreators.length > 0) return rawCreators.map(mapTrendingCreator);
    return [];
  }, [rawCreators]);

  const countries = AVAILABLE_COUNTRIES;

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

  const getCountryFlag = (countryCode: string, size: number = 20) => {
    return (
      <CircleFlag
        countryCode={countryCode.toLowerCase()}
        height={size}
        width={size}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 px-5 md:px-8 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
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
                    {selectedWeek.label}
                  </span>
                  <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-1">
                  {dateRanges.map((range) => (
                    <button
                      key={range.weekStartDate}
                      onClick={() => {
                        setSelectedWeek(range);
                        setWeeklyOpen(false);
                      }}
                      className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
                        selectedWeek.weekStartDate === range.weekStartDate
                          ? "bg-gray-100 font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {range.label}
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
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          data={creators.length ?? 0}
          numberOfSkeleton={1}
          skeleton={<>Loading....</>}
          emptyState={
            <p className="py-16 text-center text-gray-500">
              No trending creators found for the selected filters.
            </p>
          }
        >
          <div className="space-y-0">
            {creators.map((creator, index) => (
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
                      <TrendBadge movement={creator.change} variant="listing" />
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
                              if (creator.id)
                                router.push(`/creator/${creator.id}`);
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
                          {selectedCountry === "Global" && (
                            <span className="inline-flex items-center gap-1.5 bg-[#f2f6f5] border border-black/8 rounded-full pl-2 pr-3 py-1">
                              {getCountryFlag(creator.countryCode, 18)}
                              <span className="text-[13px] font-medium text-[#0b0b0b]">
                                {creator.country}
                              </span>
                            </span>
                          )}
                        </div>
                        <span className="text-[14px] font-medium text-[rgba(31,31,31,0.5)]">
                          {creator.ranking}
                        </span>
                        <div className="flex items-center gap-2">
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
                      <TrendBadge movement={creator.change} variant="listing" />
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
                                if (creator.id)
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
                            {selectedCountry === "Global" && (
                              <span className="flex-shrink-0 inline-flex items-center gap-1 bg-[#f2f6f5] border border-black/8 rounded-full pl-1 pr-2 py-0.5">
                                {getCountryFlag(creator.countryCode, 14)}
                                <span className="text-[11px] font-medium text-[#0b0b0b]">
                                  {creator.country}
                                </span>
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] md:text-[14px] font-medium text-[rgba(31,31,31,0.5)] truncate">
                            {creator.ranking}
                          </span>
                          <div
                            className={`flex items-center ${index === 0 ? "gap-2" : ""}`}
                          >
                            <div className="w-fit">
                              {getGrowthBadge(creator.growthPercent)}
                            </div>
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
        </FetchLoadingAndEmptyState>
      </div>
    </div>
  );
};

export default TrendingCreatorsClient;
