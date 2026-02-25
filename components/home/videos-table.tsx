"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { useGetTopVideos } from "@/hooks/useGetVideoRankings";
import type { VideoRankingEntryDto } from "@/services/video-ranking.service";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as React.ComponentType<any>;

export interface Video {
  rank: number;
  title: string;
  creator: string;
  verified: boolean;
  lastWeek: number | string;
  peak: number | string;
  woc: number | string;
  streams: number | string;
  trend: "up" | "down" | "new" | "reentry" | "none";
  trendValue?: number;
  thumbnail?: string;
  videoUrl?: string;
}

/** Map a raw top-video entry from the API to the display shape */
function mapVideoEntry(entry: VideoRankingEntryDto): Video {
  return {
    rank: entry.rank,
    title: entry.title || "Untitled",
    creator: entry.creatorId?.name ?? "Unknown",
    verified: entry.creatorId?.isVerified ?? false,
    lastWeek: "-", // Not available in top-videos endpoint
    peak: "-",
    woc: "-",
    streams: entry.topVideoScore != null ? entry.topVideoScore.toFixed(2) : "-",
    trend: "none", // No movement info in video ranking entries
    thumbnail: entry.thumbnailUrl,
    videoUrl: undefined,
  };
}

interface VideosTableProps {
  headerColor?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  scoreText?: string;
  buttonLink?: string;
  country?: string;
}

export default function VideosTable({
  headerColor = "#78181b",
  title = "TOP\n100\nVIDEOS",
  subtitle = "The most viewed videos",
  buttonText = "View Video Rankings",
  scoreText = "SCORE",
  buttonLink = "#",
  country,
}: VideosTableProps) {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const { videos: rawVideos, isLoading } = useGetTopVideos(
    { country, limit: 10 },
    true,
  );

  const displayVideos = useMemo(
    () => rawVideos.map(mapVideoEntry),
    [rawVideos],
  );

  const getTrendBadge = (trend: Video["trend"], trendValue?: number) => {
    if (trend === "new")
      return (
        <>
          {/* Mobile version */}
          <div className="desktop:hidden bg-[#e3f2fd] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <span className="text-[#1565c0] text-[10px] font-semibold">
              New
            </span>
          </div>
          {/* Desktop version */}
          <div className="hidden desktop:flex bg-[rgba(32,120,236,0.2)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <span className="text-[#2078ec] text-[12px] font-medium">New</span>
          </div>
        </>
      );
    if (trend === "reentry")
      return (
        <>
          {/* Mobile version */}
          <div className="desktop:hidden bg-[#e3f2fd] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <span className="text-[#1565c0] text-[10px] font-semibold">
              Re-entry
            </span>
          </div>
          {/* Desktop version */}
          <div className="hidden desktop:flex bg-[rgba(32,120,236,0.2)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <span className="text-[#2078ec] text-[12px] font-medium">
              Re-entry
            </span>
          </div>
        </>
      );
    if (trend === "up")
      return (
        <>
          {/* Mobile version */}
          <div className="desktop:hidden bg-[#e8f5e9] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <div className="flex items-center">
              <ArrowUp
                className="w-2.5 h-2.5 text-[#2e7d32]"
                strokeWidth={2.5}
              />
              <span className="text-[#2e7d32] text-[10px] font-semibold">
                +{trendValue}
              </span>
            </div>
          </div>
          {/* Desktop version */}
          <div className="hidden desktop:flex bg-[rgba(35,140,77,0.3)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <div className="flex items-center">
              <ArrowUp className="w-3 h-3 text-[#238c4d]" strokeWidth={2.5} />
              <span className="text-[#238c4d] text-[12px] font-medium">
                +{trendValue}
              </span>
            </div>
          </div>
        </>
      );
    if (trend === "down")
      return (
        <>
          {/* Mobile version */}
          <div className="desktop:hidden bg-[#ffebee] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <div className="flex items-center">
              <ArrowDown
                className="w-2.5 h-2.5 text-[#c62828]"
                strokeWidth={2.5}
              />
              <span className="text-[#c62828] text-[10px] font-semibold">
                -{trendValue}
              </span>
            </div>
          </div>
          {/* Desktop version */}
          <div className="hidden desktop:flex bg-[rgba(179,38,30,0.3)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <div className="flex items-center">
              <ArrowDown className="w-3 h-3 text-[#b3261e]" strokeWidth={2.5} />
              <span className="text-[#b3261e] text-[12px] font-medium">
                -{trendValue}
              </span>
            </div>
          </div>
        </>
      );
    return (
      <>
        {/* Mobile version */}
        <div className="desktop:hidden bg-[#eeeeee] flex items-center justify-center px-4 py-0.5 rounded-[4px]">
          <span className="text-[#666666] text-[10px] font-semibold">-</span>
        </div>
        {/* Desktop version */}
        <div className="hidden desktop:flex bg-[rgba(0,0,0,0.2)] items-center justify-center px-3 py-0.5 rounded-[9px]">
          <span className="text-[rgba(0,0,0,0.6)] text-[12px] font-medium">
            -
          </span>
        </div>
      </>
    );
  };

  const videoThumbnails = [
    "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    "/c9d16bc2baf7fe3d693ca126dd7a838dc5a4b3da.png",
    "/ba79e0bf3d00ddf3f1221c52a300df4fe0fb3f0c.png",
    "/25e5a98e3bb746e2d47829f93902bb5487bb9be3.png",
    "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
  ];

  // Parse title into lines
  const titleLines = title.split("\n");

  return (
    <div className="w-full h-full flex flex-col overflow-hidden  ">
      {/* Header with dynamic background color */}
      <div
        className="rounded-t-lg p-8 flex items-start justify-between h-[220px] desktop:h-[280px]"
        style={{ backgroundColor: headerColor }}
      >
        <div>
          <h2 className="text-3xl desktop:text-[44px] font-extrabold text-white leading-snug desktop:leading-[60px]">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-white/80 text-md desktop:text-[20px] font-medium mt-1">
            {subtitle}
          </p>
        </div>
        <div className="w-[60px] h-[74px] relative">
          <Image
            src="/f2ee32afaffe6ff3652328a58b9b2fa730ddeb46.png"
            alt="Creator Charts Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Table - custom layout matching creators table */}
      <div className="bg-white rounded-b-lg overflow-hidden flex-1 flex flex-col justify-between">
        <div>
          {/* Table Header - Desktop */}
          <div className="hidden desktop:flex items-center px-4 md:px-5 py-3 border-b">
            <div className="w-[30px] md:w-[40px] text-[16px] md:text-[18px] font-bold text-black text-center">
              #
            </div>
            <div className="flex-1 text-[16px] font-bold text-black ml-3 md:ml-5">
              VIDEOS
            </div>
            <div className="w-[50px] md:w-[56px] flex text-center items-center justify-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="cursor-help">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8V12"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="0.5" fill="black" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    The video&apos;s position on this chart during the previous
                    chart week
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">LW</span>
            </div>
            <div className="w-[60px] md:w-[73px] flex text-center items-center justify-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="cursor-help">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8V12"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="0.5" fill="black" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    The highest position a video has ever achieved on this chart
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">PEAK</span>
            </div>
            <div className="w-[60px] md:w-[71px] flex text-center items-center justify-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="cursor-help">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8V12"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="0.5" fill="black" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    The total number of weeks a video has appeared on this chart
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">WOC</span>
            </div>
            <div className="w-[95px] text-center flex items-center justify-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="cursor-help">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8V12"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="0.5" fill="black" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    Video Performance Score - Overall score based on views and
                    engagement metrics
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">
                {scoreText}
              </span>
            </div>
          </div>
          {/* Table Header - Mobile/Tablet */}
          <div className="flex desktop:hidden items-center px-3 md:px-5 py-2 md:py-3 border-b">
            <div className="w-[32px] md:w-[40px] text-[16px] md:text-[18px] font-bold text-black text-center">
              #
            </div>
            <div className="flex-1 text-[15px] md:text-[16px] font-bold text-black ml-3 md:ml-4">
              VIDEOS
            </div>
            <div className="w-[48px] md:w-[70px] text-center flex items-center justify-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="cursor-help">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:w-[16px] md:h-[16px]"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8V12"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="0.5" fill="black" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-sm">
                    Video Performance Score - Overall score based on views and
                    engagement metrics
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[13px] md:text-[15px] font-bold text-black">
                CPI
              </span>
            </div>
          </div>
          {/* Table Rows */}
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            data={displayVideos?.length}
            skeleton={() => (
              <>
                {/* Desktop Skeleton */}
                <div className="hidden desktop:flex items-center px-4 md:px-5 py-3 animate-pulse">
                  <div className="w-[30px] md:w-[40px] flex flex-col items-center gap-0.5">
                    <div className="h-5 w-6 bg-gray-200 rounded" />
                    <div className="h-4 w-8 bg-gray-200 rounded" />
                  </div>
                  <div className="flex-1 flex items-center gap-3 ml-3 md:ml-5">
                    <div className="w-[60px] h-[52px] bg-gray-200 rounded-lg" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-5 w-40 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="w-[50px] md:w-[56px] flex justify-center">
                    <div className="w-6 h-5 bg-gray-200 rounded" />
                  </div>
                  <div className="w-[60px] md:w-[73px] flex justify-center">
                    <div className="w-6 h-5 bg-gray-200 rounded" />
                  </div>
                  <div className="w-[60px] md:w-[71px] flex justify-center">
                    <div className="w-6 h-5 bg-gray-200 rounded" />
                  </div>
                  <div className="w-[95px] flex justify-center">
                    <div className="w-[40px] h-[34px] bg-gray-200 rounded" />
                  </div>
                </div>
                {/* Mobile/Tablet Skeleton */}
                <div className="desktop:hidden flex items-start px-3 md:px-5 py-3 md:py-4 animate-pulse">
                  <div className="w-[32px] md:w-[40px] flex flex-col items-center gap-0.5">
                    <div className="h-5 w-6 bg-gray-200 rounded" />
                    <div className="h-4 w-8 bg-gray-200 rounded" />
                  </div>
                  <div className="flex-1 flex gap-2 md:gap-3 ml-3 md:ml-4">
                    <div className="w-[70px] md:w-[90px] aspect-video bg-gray-200 rounded-lg" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="h-5 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                      <div className="h-3 w-full bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="w-[48px] md:w-[70px] flex justify-end">
                    <div className="w-[36px] md:w-[42px] h-[30px] md:h-[34px] bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-px bg-gray-200 mx-3 md:mx-5" />
              </>
            )}
            emptyState={
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg font-medium">No videos found</p>
                <p className="text-sm mt-2">
                  Check back later for updated rankings
                </p>
              </div>
            }
            numberOfSkeleton={5}
            contentClassName="block"
          >
            {displayVideos?.map((video, index) => (
              <div key={video.rank}>
                {/* Desktop Row */}
                <div
                  className="hidden desktop:flex items-center px-4 md:px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/video/${video.rank}`)}
                >
                  {/* Rank & Trend */}
                  <div className="w-[30px] md:w-[40px] flex flex-col items-center gap-0.5">
                    <span className="text-[16px] font-semibold text-black">
                      {video.rank}
                    </span>
                    {getTrendBadge(video.trend, video.trendValue)}
                  </div>

                  {/* Video Thumbnail with play button */}
                  <div className="flex-1 flex items-center gap-3 ml-3 md:ml-5 min-w-0">
                    <div
                      className={`w-[60px] h-[52px] relative rounded-lg overflow-hidden flex-shrink-0 ${
                        video.videoUrl ? "cursor-pointer" : ""
                      }`}
                      onClick={() => video.videoUrl && setSelectedVideo(video)}
                    >
                      <Image
                        src={
                          video.thumbnail ||
                          videoThumbnails[index % videoThumbnails.length]
                        }
                        alt={video.title}
                        fill
                        className="object-cover"
                      />{" "}
                      <div className="absolute inset-0 bg-black/30 rounded-lg" />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <span className="text-[16px] font-bold text-black truncate">
                        {video.title}
                      </span>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[16px] font-medium text-black truncate">
                          {video.creator}
                        </span>
                        {video.verified && (
                          <Image
                            src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                            alt="verified"
                            width={20}
                            height={20}
                            className="flex-shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="w-[50px] md:w-[56px] text-center text-[16px] font-semibold text-black">
                    {video.lastWeek}
                  </div>
                  <div className="w-[60px] md:w-[73px] text-center text-[16px] font-semibold text-black">
                    {video.peak}
                  </div>
                  <div className="w-[60px] md:w-[71px] text-center text-[16px] font-semibold text-black">
                    {video.woc}
                  </div>
                  <div className="w-[95px] flex justify-center">
                    <div className="bg-[#14532d] w-[40px] h-[34px] rounded flex items-center justify-center">
                      <span className="text-white text-[16px] font-bold">
                        {video.streams}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet Row */}
                <div
                  className="desktop:hidden flex items-start px-3 md:px-5 py-3 md:py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/video/${video.rank}`)}
                >
                  {/* Rank & Trend */}
                  <div className="w-[32px] md:w-[40px] flex flex-col items-center gap-0.5 pt-0.5">
                    <span className="text-[16px] md:text-[18px] font-semibold text-black">
                      {video.rank}
                    </span>
                    {getTrendBadge(video.trend, video.trendValue)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-stretch gap-2 md:gap-3 ml-3 md:ml-4 min-w-0">
                    {/* Thumbnail */}
                    <div
                      className={`w-[70px] md:w-[90px] relative rounded-lg overflow-hidden flex-shrink-0 ${
                        video.videoUrl ? "cursor-pointer" : ""
                      }`}
                      onClick={() => video.videoUrl && setSelectedVideo(video)}
                    >
                      <Image
                        src={
                          video.thumbnail ||
                          videoThumbnails[index % videoThumbnails.length]
                        }
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:w-[20px] md:h-[20px]"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-1 md:gap-1.5 min-w-0 flex-1">
                      <span className="text-[15px] md:text-[16px] font-bold text-black truncate leading-tight">
                        {video.title}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2 min-w-0">
                        <span className="text-[13px] md:text-[14px] font-medium text-black truncate">
                          {video.creator}
                        </span>
                        {video.verified && (
                          <Image
                            src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                            alt="verified"
                            width={16}
                            height={16}
                            className="flex-shrink-0 md:w-[20px] md:h-[20px]"
                          />
                        )}
                      </div>
                      {/* Stats Inline */}
                      <div className="flex items-center gap-2 md:gap-3 text-[12px] md:text-[13px] text-gray-600">
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

                  {/* Score */}
                  <div className="w-[48px] md:w-[70px] flex justify-end pt-0.5">
                    <div className="bg-[#14532d] w-[36px] md:w-[42px] h-[30px] md:h-[34px] rounded flex items-center justify-center">
                      <span className="text-white text-[13px] md:text-[15px] font-bold">
                        {video.streams}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                {video.rank < displayVideos.length && (
                  <div className="h-px bg-gray-200 mx-3 md:mx-5" />
                )}
              </div>
            ))}{" "}
          </FetchLoadingAndEmptyState>{" "}
        </div>

        {/* View More Button with dynamic background */}
        <div
          className="mt-8 mb-8 mx-4 rounded-lg p-2.5 flex items-center justify-center"
          style={{ backgroundColor: headerColor }}
        >
          <button
            onClick={() => router.push(buttonLink)}
            className="flex items-center gap-3 text-white text-[16px] font-bold"
          >
            {buttonText}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="sm:max-w-[800px] p-0 bg-black overflow-hidden border-none text-white">
          <DialogHeader className="p-4 absolute z-10 w-full bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <DialogTitle className="text-white text-lg font-bold truncate pr-8">
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full relative bg-black flex items-center justify-center">
            {selectedVideo?.videoUrl && (
              <ReactPlayer
                key={selectedVideo.videoUrl}
                url={selectedVideo.videoUrl}
                width="100%"
                height="100%"
                controls
                playing
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
