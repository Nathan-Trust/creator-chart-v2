"use client";
import React from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export interface Video {
  rank: number;
  title: string;
  creator: string;
  verified: boolean;
  lastWeek: number;
  peak: number;
  woc: number;
  streams: number;
  trend: "up" | "down" | "new" | "reentry" | "none";
  trendValue?: number;
}

interface VideosTableProps {
  headerColor?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  scoreText?: string;
  videos?: Video[];
  buttonLink?: string;
}

const defaultVideos: Video[] = [
  {
    rank: 1,
    title: "Champion",
    creator: "Davido",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "up",
    trendValue: 1,
  },
  {
    rank: 2,
    title: "Ordinary",
    creator: "Allex Warren",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "new",
  },
  {
    rank: 3,
    title: "Memories",
    creator: "Maroon 5",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "reentry",
  },
  {
    rank: 4,
    title: "Chanel",
    creator: "Tyla",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "down",
    trendValue: 1,
  },
  {
    rank: 5,
    title: "Wild Flower",
    creator: "Billie Ellish",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "none",
  },
];

export default function VideosTable({
  headerColor = "#78181b",
  title = "TOP\n100\nVIDEOS",
  subtitle = "The most viewed videos",
  buttonText = "View Video Rankings",
  scoreText = "SCORE",
  videos = defaultVideos,
  buttonLink = "#",
}: VideosTableProps) {
  const router = useRouter();
  const getTrendBadge = (trend: Video["trend"], trendValue?: number) => {
    if (trend === "new")
      return (
        <>
          {/* Mobile version */}
          <div className="lg:hidden bg-[#e3f2fd] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <span className="text-[#1565c0] text-[10px] font-semibold">
              New
            </span>
          </div>
          {/* Desktop version */}
          <div className="hidden lg:flex bg-[rgba(32,120,236,0.2)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <span className="text-[#2078ec] text-[12px] font-medium">New</span>
          </div>
        </>
      );
    if (trend === "reentry")
      return (
        <>
          {/* Mobile version */}
          <div className="lg:hidden bg-[#e3f2fd] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <span className="text-[#1565c0] text-[10px] font-semibold">
              Re-entry
            </span>
          </div>
          {/* Desktop version */}
          <div className="hidden lg:flex bg-[rgba(32,120,236,0.2)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
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
          <div className="lg:hidden bg-[#e8f5e9] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <span className="text-[#2e7d32] text-[10px] font-semibold">
              ↑{trendValue}
            </span>
          </div>
          {/* Desktop version */}
          <div className="hidden lg:flex bg-[rgba(35,140,77,0.3)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <div className="flex items-center">
              <svg
                width="12"
                height="12"
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
          <div className="lg:hidden bg-[#ffebee] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
            <span className="text-[#c62828] text-[10px] font-semibold">
              ↓{trendValue}
            </span>
          </div>
          {/* Desktop version */}
          <div className="hidden lg:flex bg-[rgba(179,38,30,0.3)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
            <div className="flex items-center">
              <svg
                width="12"
                height="12"
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
        <div className="lg:hidden bg-[#eeeeee] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
          <span className="text-[#666666] text-[10px] font-semibold">-</span>
        </div>
        {/* Desktop version */}
        <div className="hidden lg:flex bg-[rgba(0,0,0,0.2)] items-center justify-center px-3 py-0.5 rounded-[9px]">
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
    <div className="w-full lg:max-w-[650px] h-full flex flex-col">
      {/* Header with dynamic background color */}
      <div
        className="rounded-t-lg p-8 flex items-start justify-between h-[220px] lg:h-[280px]"
        style={{ backgroundColor: headerColor }}
      >
        <div>
          <h2 className="text-3xl lg:text-[44px] font-extrabold text-white leading-snug lg:leading-[60px]">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-white/80 text-md lg:text-[20px] font-medium mt-1">
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
          <div className="hidden lg:flex items-center px-5 py-3 border-b">
            <div className="w-[40px] text-[18px] font-bold text-black text-center">
              #
            </div>
            <div className="flex-1 text-[16px] font-bold text-black ml-5">
              VIDEOS
            </div>
            <div className="w-[56px] hidden lg:flex text-center  items-center justify-center gap-1">
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
            <div className="w-[73px] hidden lg:flex text-center  items-center justify-center gap-1">
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
            <div className="w-[71px] hidden lg:flex text-center  items-center justify-center gap-1">
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

          {/* Table Header - Mobile */}
          <div className="flex lg:hidden items-center px-3 md:px-5 py-2 md:py-3 border-b">
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
          {videos.map((video, index) => (
            <div key={video.rank}>
              {/* Desktop Row */}
              <div className="hidden lg:flex items-center px-5 py-3">
                {/* Rank & Trend */}
                <div className="w-[40px] flex flex-col items-center gap-0.5">
                  <span className="text-[16px] font-semibold text-black">
                    {video.rank}
                  </span>
                  {getTrendBadge(video.trend, video.trendValue)}
                </div>

                {/* Video Thumbnail with play button */}
                <div className="flex-1 flex items-center gap-3 ml-5 min-w-0">
                  <div className="w-[60px] h-[52px] relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={videoThumbnails[index % videoThumbnails.length]}
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
                <div className="w-[56px] text-center text-[16px] font-semibold text-black">
                  {video.lastWeek}
                </div>
                <div className="w-[73px] text-center text-[16px] font-semibold text-black">
                  {video.peak}
                </div>
                <div className="w-[71px] text-center text-[16px] font-semibold text-black">
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

              {/* Mobile Row */}
              <div className="lg:hidden flex items-start px-3 md:px-5 py-3 md:py-4">
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
                  <div className="w-[70px] md:w-[90px] relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={videoThumbnails[index % videoThumbnails.length]}
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
              {video.rank < videos.length && (
                <div className="h-px bg-gray-200 mx-3 md:mx-5" />
              )}
            </div>
          ))}
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
    </div>
  );
}
