"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Play } from "lucide-react";
import { useFilterStore, syncFiltersFromURL } from "@/lib/stores/filter-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetActiveCountries } from "@/hooks/useGetRankings";
import { useGetViralVideos } from "@/hooks/useGetVideoRankings";
import { VideoPlayerDialog } from "@/components/shared/video-player-dialog";

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
  videoUrl?: string;
}

const TrendingVideosClient = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [weeklyRange, setWeeklyRange] = useState("Jan 9 - 15, 2026");
  const { country: selectedCountry, setCountry: setSelectedCountry } =
    useFilterStore();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Fetch active countries
  const { countries: activeCountries, isLoading: countriesLoading } =
    useGetActiveCountries();

  // Fetch viral videos based on selected country
  const { videos: viralVideos, isLoading: videosLoading } =
    useGetViralVideos(selectedCountry);

  const dateRanges = [
    "Jan 9 - 15, 2026",
    "Jan 2 - 8, 2026",
    "Dec 26 - Jan 1, 2025",
    "Dec 19 - 25, 2025",
    "Dec 12 - 18, 2025",
    "Dec 5 - 11, 2025",
  ];

  const mockVideos: Video[] = Array(6)
    .fill(null)
    .map(() => ({
      rank: 1,
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

  // Transform fetched videos to match Video interface
  const videos: Video[] =
    viralVideos.length > 0
      ? viralVideos.map((entry) => ({
          rank: entry.rank,
          lastWeek: entry.previous_rank || entry.rank,
          peak: entry.rank,
          woc: 1,
          streamScore: Math.round(entry.score),
          title: entry.video.title || "Untitled",
          creator: entry.video.creator.display_name,
          verified: entry.video.creator.is_verified,
          thumbnail:
            entry.video.thumbnail ||
            "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
          videoUrl: entry.video.video_url,
          change: entry.previous_rank
            ? `${Math.abs(entry.rank - entry.previous_rank)}`
            : "1",
          debutChartDate: "09-02-2023",
          peakChartDate: "09-02-2023",
        }))
      : mockVideos;

  // Format country name for display (replace underscores with spaces)
  const formatCountryName = (country: string) => {
    return country.replace(/_/g, " ");
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

  const getRankBadge = (index: number, change: string) => {
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

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 px-5 md:px-8 xl:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[34px] font-extrabold leading-tight md:leading-17.5 text-black mb-1 md:mb-2">
            Viral Videos
          </h1>
          <p className="text-[14px] md:text-[18px] font-medium text-black mb-4 md:mb-6">
            Your update of the most viral videos
          </p>
        </div>

        {/* Filter Dropdown & Table Headers */}
        <div
          className="sticky z-40 bg-white flex flex-col transition-all duration-300"
          style={{ top: navbarVisible ? "88px" : "0px" }}
        >
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-2 xl:gap-0 items-center pb-4 pt-2">
            <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
              <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-[14px] xl:text-[16px] font-semibold text-black">
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
                <div className="inline-flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-[14px] xl:text-[16px] font-semibold text-black">
                    {formatCountryName(selectedCountry)}
                  </span>
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5" />
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
                        className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
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
          <div className="hidden md:grid grid-cols-[50px_1fr_60px_60px_60px_100px] lg:grid-cols-[50px_1fr_80px_80px_80px_100px_70px] xl:grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-2 xl:gap-4 border-b px-4 py-2">
            <div className="text-[14px] xl:text-[20px] font-medium text-center text-black">
              #
            </div>
            <div className="text-[18px] font-bold text-black">VIDEOS</div>
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
              <span className="text-[15px] font-bold text-black">LW</span>
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
              <span className="text-[15px] font-bold text-black">PEAK</span>
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
              <span className="text-[15px] font-bold text-black">WOC</span>
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
              <span className="text-[15px] font-bold text-black">STREAM</span>
            </div>
            <div className="hidden xl:block"></div>
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
                STREAM
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
                  className="hidden md:grid grid-cols-[50px_1fr_60px_60px_60px_100px] lg:grid-cols-[50px_1fr_80px_80px_80px_100px_70px] xl:grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-2 xl:gap-4 py-6 px-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedRow(expandedRow === index ? null : index)
                  }
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[18px] font-semibold text-black">
                      {index + 1}
                    </span>
                    {getRankBadge(index, video.change)}
                  </div>

                  {/* Video Column */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="relative w-[80px] h-[70px] rounded-[5px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (video.videoUrl) setSelectedVideo(video);
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

                  {/* Last Week */}
                  <div className="text-[20px] font-normal text-black text-center">
                    {video.lastWeek}
                  </div>

                  {/* Peak */}
                  <div className="text-[20px] font-normal text-black text-center">
                    {video.peak}
                  </div>

                  {/* WOC */}
                  <div className="text-[20px] font-normal text-black text-center">
                    {video.woc}
                  </div>

                  {/* Stream Score */}
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[16px] font-bold px-3 py-2 rounded-[3px] min-w-[40px]">
                      {video.streamScore}
                    </div>
                  </div>

                  {/* View/Close Button */}
                  <div className="hidden lg:flex justify-center">
                    {(hoveredRow === index || expandedRow === index) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRow(expandedRow === index ? null : index);
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
                  onClick={() =>
                    setExpandedRow(expandedRow === index ? null : index)
                  }
                >
                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 pt-1 md:pt-2">
                    <span className="text-[16px] md:text-[24px] font-semibold text-black">
                      {index + 1}
                    </span>
                    {getRankBadge(index, video.change)}
                  </div>

                  {/* Video Info Column */}
                  <div className="flex items-stretch gap-3 md:gap-5 min-w-0 flex-1">
                    <div
                      className="relative w-14 h-14 md:w-[100px] md:h-auto md:aspect-square rounded-[4px] md:rounded-[5px] overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (video.videoUrl) setSelectedVideo(video);
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
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-[13px] md:text-[17px] font-medium text-black truncate">
                          {video.creator}
                        </span>
                        {video.verified && (
                          <Image
                            src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                            alt="verified"
                            width={14}
                            height={14}
                            className="md:w-[18px] md:h-[18px] shrink-0"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:gap-5 text-[12px] md:text-[16px] text-gray-600">
                        <span>
                          LW:{" "}
                          <span className="font-semibold text-black">
                            {video.lastWeek}
                          </span>
                        </span>
                        <span>
                          Peak:{" "}
                          <span className="font-semibold text-black">
                            {video.peak}
                          </span>
                        </span>
                        <span>
                          WOC:{" "}
                          <span className="font-semibold text-black">
                            {video.woc}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score Column */}
                  <div className="flex justify-end pt-1 md:pt-2">
                    <div className="flex items-center justify-center bg-[#14532d] text-white text-[14px] md:text-[18px] font-bold px-2 md:px-4 py-1.5 md:py-2.5 rounded-[3px] min-w-[34px] md:min-w-[52px]">
                      {video.streamScore}
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Desktop */}
                {expandedRow === index && (
                  <div className="hidden md:block px-4 pb-8">
                    <div className="md:ml-[154px] xl:ml-53 space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-black min-w-45">
                          Debut Chart Date
                        </span>
                        <span className="text-[15px] font-normal text-black">
                          {video.debutChartDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-black min-w-45">
                          Peak Chart Date
                        </span>
                        <span className="text-[15px] font-normal text-black">
                          {video.peakChartDate}
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
                          {video.debutChartDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold text-black">
                          Peak Chart Date
                        </span>
                        <span className="text-[13px] font-normal text-black">
                          {video.peakChartDate}
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

      <VideoPlayerDialog
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl}
        videoTitle={selectedVideo?.title}
      />
    </div>
  );
};

export default TrendingVideosClient;
