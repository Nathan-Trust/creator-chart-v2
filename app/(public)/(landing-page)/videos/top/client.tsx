"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Play } from "lucide-react";
import { TrendBadge } from "@/components/shared/trend-badge";
import { stripUrl } from "@/util/text";
import { format, parseISO } from "date-fns";
import { CircleFlag } from "react-circle-flags";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetTopVideos } from "@/hooks/useGetVideoRankings";
import {
  useFilterStore,
  syncFiltersFromURL,
  getApiCountryCode,
  AVAILABLE_COUNTRIES,
  AVAILABLE_WEEKS,
} from "@/lib/stores/filter-store";

const countryCodeMap: Record<string, string> = {
  nigeria: "ng",
  ghana: "gh",
  kenya: "ke",
  south_africa: "za",
  "south africa": "za",
  united_kingdom: "gb",
  "united kingdom": "gb",
  united_states: "us",
  "united states": "us",
  cameroon: "cm",
  tanzania: "tz",
  uganda: "ug",
  ethiopia: "et",
  egypt: "eg",
  morocco: "ma",
  senegal: "sn",
  india: "in",
  canada: "ca",
  australia: "au",
  germany: "de",
  france: "fr",
  brazil: "br",
};

function getCountryCodeFromName(country: string): string {
  return (
    countryCodeMap[country.toLowerCase()] ?? country.slice(0, 2).toLowerCase()
  );
}

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

const staticCountries = AVAILABLE_COUNTRIES.map((c) => ({ country: c }));

interface Video {
  rank: number;
  lastWeek: string;
  peak: string;
  woc: string;
  streamScore: number;
  title: string;
  creator: string;
  verified: boolean;
  thumbnail: string;
  change: string;
  debutChartDate: string;
  debutEntryPosition: number | string;
  peakChartDate: string;
  videoUrl?: string;
  country?: string;
  countryCode?: string;
}

const TopVideosClient = () => {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { country: selectedCountry, setCountry: setSelectedCountry, weekStartDate, weekLabel, setWeek } =
    useFilterStore();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Fetch top videos based on selected country
  const { videos: topVideos, isLoading: videosLoading } = useGetTopVideos({
    country: getApiCountryCode(selectedCountry),
    weekStartDate,
  });

  const mockVideos: Video[] = Array(6)
    .fill(null)
    .map((_, index) => ({
      rank: index + 1,
      lastWeek: "2",
      peak: "2",
      woc: "2",
      streamScore: 87 - index * 3,
      title: ["Champion", "IF", "Feel", "Electricity", "Unavailable", "Aye"][
        index
      ],
      creator: ["Davido", "Davido", "Davido", "Pheelz", "Davido", "Davido"][
        index
      ],
      verified: true,
      thumbnail: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
      change: "+1",
      debutChartDate: "09-02-2023",
      debutEntryPosition: "-",
      peakChartDate: "09-02-2023",
      country: [
        "Nigeria",
        "Nigeria",
        "Ghana",
        "Kenya",
        "South Africa",
        "Nigeria",
      ][index],
      countryCode: ["NG", "NG", "GH", "KE", "ZA", "NG"][index],
    }));

  // Transform fetched videos to match Video interface
  const videos: Video[] =
    topVideos.length > 0
      ? topVideos.map((entry) => {
          return {
            rank: entry.rank,
            lastWeek:
              entry.chart?.lastWeekRank != null
                ? String(entry.chart.lastWeekRank)
                : "-",
            peak:
              entry.chart?.peakRank != null
                ? String(entry.chart.peakRank)
                : "-",
            woc:
              entry.chart?.weeksOnChart != null
                ? String(entry.chart.weeksOnChart)
                : "-",
            streamScore: Math.round(entry.score ?? 0),
            title: stripUrl(entry.video?.title || "Untitled"),
            creator: entry.creator?.name ?? "Unknown",
            verified: entry.creator?.verified ?? false,
            thumbnail:
              entry.video?.thumbnailUrl ||
              "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
            videoUrl: entry.video?.videoUrl,
            change: entry.chart?.rankMovement ?? "0",
            debutChartDate: entry.chart?.debutEntryDate ?? "-",
            debutEntryPosition: entry.chart?.debutEntryRank ?? "-",
            peakChartDate: "-",
            country: "",
            countryCode: "",
          };
        })
      : mockVideos;

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

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 section-px">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[34px] font-extrabold leading-tight md:leading-17.5 text-black mb-1 md:mb-2">
            Top 100 Videos
          </h1>
          <p className="text-[14px] md:text-[18px] font-medium text-black mb-4 md:mb-6">
            Your update of the top 100 videos
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
                    {weekLabel}
                  </span>
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] max-h-[300px] overflow-y-auto p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-1">
                  {AVAILABLE_WEEKS.map((range) => (
                    <button
                      key={range.weekStartDate}
                      onClick={() => {
                        setWeek(range);
                        setWeeklyOpen(false);
                      }}
                      className={`text-left px-3 py-2 text-[14px] text-black rounded hover:bg-gray-100 transition-colors ${
                        weekStartDate === range.weekStartDate
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
            className={`hidden md:grid gap-2 xl:gap-4 border-b border-black/8 px-6 py-4 ${
              selectedCountry === "Global"
                ? "grid-cols-[50px_1fr_80px_60px_60px_60px_100px] lg:grid-cols-[50px_1fr_120px_80px_80px_80px_100px] xl:grid-cols-[80px_1fr_200px_120px_120px_120px_180px]"
                : "grid-cols-[50px_1fr_60px_60px_60px_100px] lg:grid-cols-[50px_1fr_80px_80px_80px_100px] xl:grid-cols-[80px_1fr_120px_120px_120px_180px]"
            }`}
          >
            <div className="text-[12px] font-bold text-center text-gray-500 uppercase">
              #
            </div>
            <div className="text-[12px] font-bold text-gray-500 uppercase">
              VIDEOS
            </div>
            {selectedCountry === "Global" && (
              <div className="text-[12px] font-bold text-gray-500 uppercase">
                COUNTRY
              </div>
            )}
            <div className="flex items-center justify-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="cursor-help">
                    <Image
                      src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                      alt="Help"
                      width={14}
                      height={14}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    The video&apos;s position on this chart during the previous
                    chart week
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
                  <button type="button" className="cursor-help">
                    <Image
                      src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                      alt="Help"
                      width={14}
                      height={14}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    The highest position a video has ever achieved on this chart
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
                  <button type="button" className="cursor-help">
                    <Image
                      src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                      alt="Help"
                      width={14}
                      height={14}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    The total number of weeks a video has appeared on this chart
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
                  <button type="button" className="cursor-help">
                    <Image
                      src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                      alt="Help"
                      width={14}
                      height={14}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    Stream Score - Overall score based on engagement and
                    streaming metrics
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[12px] font-bold text-gray-500 uppercase">
                SCORE
              </span>
            </div>
          </div>

          {/* Table Headers - Mobile */}
          <div className="md:hidden grid grid-cols-[40px_1fr_48px] gap-3 border-b px-0 py-2">
            <div className="text-[12px] font-medium text-center text-black">
              #
            </div>
            <div className="text-[12px] md:text-[18px] font-bold text-black">
              VIDEOS
            </div>
            <div className="flex items-center justify-center gap-1 md:gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help">
                    <Image
                      src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
                      alt="Help"
                      width={10}
                      height={10}
                      className="md:w-4 md:h-4"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[12px] text-gray-700">
                    Stream Score - Overall score based on engagement and
                    streaming metrics
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[12px] md:text-[18px] font-bold text-black">
                SCORE
              </span>
            </div>
          </div>
        </div>

        {/* Videos List */}
        <div className="space-y-0">
          {videosLoading ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">Loading videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No videos found</p>
              <p className="text-sm mt-2">Try selecting a different country</p>
            </div>
          ) : (
            videos.map((video, index) => (
              <div key={index} className="border-b">
                {/* Desktop View */}
                <div
                  className={`hidden md:grid gap-2 xl:gap-4 py-6 px-6 items-center hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedCountry === "Global"
                      ? "grid-cols-[50px_1fr_80px_60px_60px_60px_100px] lg:grid-cols-[50px_1fr_120px_80px_80px_80px_100px] xl:grid-cols-[80px_1fr_200px_120px_120px_120px_180px]"
                      : "grid-cols-[50px_1fr_60px_60px_60px_100px] lg:grid-cols-[50px_1fr_80px_80px_80px_100px] xl:grid-cols-[80px_1fr_120px_120px_120px_180px]"
                  }`}
                  onClick={() =>
                    setExpandedRow(expandedRow === index ? null : index)
                  }
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[18px] font-semibold text-black">
                      {video.rank}
                    </span>
                    <TrendBadge movement={video.change} variant="listing" />
                  </div>

                  {/* Video Column */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="relative w-[80px] h-[70px] rounded-[5px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        const params = new URLSearchParams();
                        if (video.thumbnail)
                          params.set("thumbnail", video.thumbnail);
                        params.set("title", video.title);
                        params.set("creator", video.creator);
                        router.push(
                          `/video/${encodeURIComponent(video.videoUrl || video.rank.toString())}?${params.toString()}`,
                        );
                      }}
                    >
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
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="text-[18px] font-bold text-black truncate">
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

                  {/* Country Column (Global only) */}
                  {selectedCountry === "Global" && video.countryCode && (
                    <div className="flex items-center">
                      <div className="flex items-center gap-2.5 bg-[#f2f6f5] border border-black/8 rounded-full pl-2.5 pr-3.5 py-1.5">
                        {getCountryFlag(video.countryCode, 20)}
                        <span className="text-[14px] font-medium text-[#0b0b0b]">
                          {video.country}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Last Week */}
                  <div className="text-[16px] font-medium text-[#0b0b0b] text-center">
                    {video.lastWeek}
                  </div>

                  {/* Peak */}
                  <div className="text-[16px] font-medium text-[#0b0b0b] text-center">
                    {video.peak}
                  </div>

                  {/* WOC */}
                  <div className="text-[16px] font-medium text-[#0b0b0b] text-center">
                    {video.woc}
                  </div>

                  {/* Stream Score */}
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[15px] font-bold w-[44px] h-[36px] rounded-[6px]">
                      {video.streamScore}
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div
                  className="md:hidden grid grid-cols-[40px_1fr_48px] gap-3 py-4 px-0 items-start cursor-pointer"
                  onClick={() =>
                    setExpandedRow(expandedRow === index ? null : index)
                  }
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 pt-1 md:pt-2">
                    <span className="text-[16px] md:text-[24px] font-semibold text-black">
                      {video.rank}
                    </span>
                    <TrendBadge movement={video.change} variant="listing" />
                  </div>

                  {/* Video Info Column */}
                  <div className="flex items-stretch gap-3 md:gap-5 min-w-0 flex-1">
                    <div
                      className="relative w-14 h-14 md:w-[100px] md:h-auto md:aspect-square rounded-[4px] md:rounded-[5px] overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        const params = new URLSearchParams();
                        if (video.thumbnail)
                          params.set("thumbnail", video.thumbnail);
                        params.set("title", video.title);
                        params.set("creator", video.creator);
                        router.push(
                          `/video/${encodeURIComponent(video.videoUrl || video.rank.toString())}?${params.toString()}`,
                        );
                      }}
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-5 h-5 md:w-8 md:h-8 fill-white text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-1 md:gap-1.5 min-w-0 flex-1 py-0.5">
                      <span className="text-[15px] md:text-[20px] font-bold text-black truncate block">
                        {video.title}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                        <span className="text-[13px] md:text-[17px] font-medium text-black truncate">
                          {video.creator}
                        </span>
                        {video.verified && (
                          <div className="shrink-0 w-4 h-4 md:w-5 md:h-5">
                            <Image
                              src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                              alt="Verified"
                              width={16}
                              height={16}
                              className="md:w-5 md:h-5"
                            />
                          </div>
                        )}
                        {selectedCountry === "Global" && video.countryCode && (
                          <span className="shrink-0 inline-flex items-center gap-1 bg-[#f2f6f5] border border-black/8 rounded-full pl-1 pr-2 py-0.5">
                            {getCountryFlag(video.countryCode, 14)}
                            <span className="text-[11px] font-medium text-[#0b0b0b]">
                              {video.country}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:gap-5 text-[12px] md:text-[16px] text-gray-600">
                        <span>
                          LW:{" "}
                          <span className="font-medium text-black">
                            {video.lastWeek}
                          </span>
                        </span>
                        <span>
                          Peak:{" "}
                          <span className="font-medium text-black">
                            {video.peak}
                          </span>
                        </span>
                        <span>
                          WOC:{" "}
                          <span className="font-medium text-black">
                            {video.woc}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score Column */}
                  <div className="flex justify-end pt-1 md:pt-2">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[13px] font-bold w-[38px] h-[32px] rounded-[6px]">
                      {video.streamScore}
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Desktop */}
                {expandedRow === index && (
                  <div className="hidden md:block px-6 pb-8">
                    <div className="md:ml-[58px] xl:ml-[96px] space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-black min-w-45">
                          Debut Chart Date
                        </span>
                        <span className="text-[15px] font-normal text-black">
                          {formatChartDate(video.debutChartDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-black min-w-45">
                          Debut Entry Position
                        </span>
                        <span className="text-[15px] font-normal text-black">
                          {video.debutEntryPosition}
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
                          Debut Chart Date
                        </span>
                        <span className="text-[13px] font-normal text-black">
                          {formatChartDate(video.debutChartDate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold text-black">
                          Debut Entry Position
                        </span>
                        <span className="text-[13px] font-normal text-black">
                          {video.debutEntryPosition}
                        </span>
                      </div>
                      <button className="mt-3 w-full py-2.5 bg-[#14532d] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1a6b3d] transition-colors">
                        Share Promo Card
                      </button>
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRow(null);
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
};

export default TopVideosClient;
