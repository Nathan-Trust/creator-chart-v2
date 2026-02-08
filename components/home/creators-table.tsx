"use client";
import React from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";

interface Creator {
  rank: number;
  name: string;
  verified: boolean;
  platforms: string[];
  lastWeek: number;
  peak: number;
  woc: number;
  cpiScore: number;
  trend: "up" | "down" | "new" | "reentry" | "none";
  trendValue?: number;
  avatar: string;
  creator_id: string;
}

// TEMPORARY: Static mock data while backend is being developed
const MOCK_CREATORS: Creator[] = [
  {
    rank: 1,
    name: "Comedy King",
    verified: true,
    platforms: ["youtube", "tiktok", "instagram"],
    lastWeek: 2,
    peak: 1,
    woc: 24,
    cpiScore: 98,
    trend: "up",
    trendValue: 1,
    avatar: "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
    creator_id: "creator-1",
  },
  {
    rank: 2,
    name: "Laughs Daily",
    verified: true,
    platforms: ["tiktok", "instagram"],
    lastWeek: 1,
    peak: 1,
    woc: 18,
    cpiScore: 97,
    trend: "down",
    trendValue: 1,
    avatar: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    creator_id: "creator-2",
  },
  {
    rank: 3,
    name: "Viral Vibes",
    verified: true,
    platforms: ["youtube", "tiktok"],
    lastWeek: 5,
    peak: 3,
    woc: 12,
    cpiScore: 95,
    trend: "up",
    trendValue: 2,
    avatar: "/c9d16bc2baf7fe3d693ca126dd7a838dc5a4b3da.png",
    creator_id: "creator-3",
  },
  {
    rank: 4,
    name: "Meme Machine",
    verified: false,
    platforms: ["tiktok", "instagram", "twitter"],
    lastWeek: 3,
    peak: 2,
    woc: 20,
    cpiScore: 94,
    trend: "down",
    trendValue: 1,
    avatar: "/ba79e0bf3d00ddf3f1221c52a300df4fe0fb3f0c.png",
    creator_id: "creator-4",
  },
  {
    rank: 5,
    name: "The Funny One",
    verified: true,
    platforms: ["youtube", "instagram"],
    lastWeek: 4,
    peak: 4,
    woc: 8,
    cpiScore: 92,
    trend: "down",
    trendValue: 1,
    avatar: "/25e5a98e3bb746e2d47829f93902bb5487bb9be3.png",
    creator_id: "creator-5",
  },
  {
    rank: 6,
    name: "Sketch Master",
    verified: true,
    platforms: ["youtube", "instagram", "twitter"],
    lastWeek: 8,
    peak: 5,
    woc: 16,
    cpiScore: 90,
    trend: "up",
    trendValue: 2,
    avatar: "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
    creator_id: "creator-6",
  },
  {
    rank: 7,
    name: "Prank Pro",
    verified: false,
    platforms: ["tiktok", "youtube"],
    lastWeek: 6,
    peak: 6,
    woc: 14,
    cpiScore: 89,
    trend: "down",
    trendValue: 1,
    avatar: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
    creator_id: "creator-7",
  },
  {
    rank: 8,
    name: "Daily Doses",
    verified: true,
    platforms: ["instagram", "tiktok"],
    lastWeek: 10,
    peak: 7,
    woc: 10,
    cpiScore: 87,
    trend: "up",
    trendValue: 2,
    avatar: "/c9d16bc2baf7fe3d693ca126dd7a838dc5a4b3da.png",
    creator_id: "creator-8",
  },
  {
    rank: 9,
    name: "Stand Up Star",
    verified: true,
    platforms: ["youtube"],
    lastWeek: 7,
    peak: 5,
    woc: 22,
    cpiScore: 86,
    trend: "down",
    trendValue: 2,
    avatar: "/ba79e0bf3d00ddf3f1221c52a300df4fe0fb3f0c.png",
    creator_id: "creator-9",
  },
  {
    rank: 10,
    name: "Joke Factory",
    verified: false,
    platforms: ["tiktok", "instagram"],
    lastWeek: 9,
    peak: 8,
    woc: 6,
    cpiScore: 85,
    trend: "down",
    trendValue: 1,
    avatar: "/25e5a98e3bb746e2d47829f93902bb5487bb9be3.png",
    creator_id: "creator-10",
  },
];

export default function CreatorsTable({
  buttonLink = "#",
}: {
  buttonLink?: string;
}) {
  const router = useRouter();

  const displayCreators = MOCK_CREATORS;
  const getTrendBadge = (trend: Creator["trend"], trendValue?: number) => {
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

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header with rounded corners */}
      <div className="bg-[#121416] rounded-t-lg p-8 flex items-start justify-between h-[220px] desktop:h-70">
        <div>
          <h2 className="text-3xl desktop:text-[44px] font-extrabold text-white leading-snug desktop:leading-[60px]">
            TOP
            <br />
            100
            <br />
            CREATORS
          </h2>
          <p className="text-white/80 text-md desktop:text-[20px] font-medium mt-1">
            The top creators
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

      {/* Table - no shadcn table component, custom layout */}
      <div className="bg-white rounded-b-lg overflow-hidden flex-1 flex flex-col justify-between">
        <div>
          {/* Table Header - Desktop */}
          <div className="hidden desktop:flex items-center px-5 py-3 border-b">
            <div className="w-[40px] text-[18px] font-bold text-black text-center">
              #
            </div>
            <div className="flex-1 text-[16px] font-bold text-black ml-5">
              CREATORS
            </div>
            <div className="w-[56px] flex text-center items-center justify-center gap-1">
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
                    The creator&apos;s position on this chart during the
                    previous chart week
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">LW</span>
            </div>
            <div className="w-[73px] flex text-center items-center justify-center gap-1">
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
                    The highest position a creator has ever achieved on this
                    chart
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">PEAK</span>
            </div>
            <div className="w-[71px] flex text-center items-center justify-center gap-1">
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
                    The total number of weeks a creator has appeared on this
                    chart
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
                    Creator Performance Index - Overall score based on
                    engagement and growth metrics
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[14px] font-bold text-black">
                CPI SCORE
              </span>
            </div>
          </div>
          {/* Table Header - Mobile/Tablet */}
          <div className="flex desktop:hidden items-center px-3 md:px-5 py-2 md:py-3 border-b">
            <div className="w-[32px] md:w-[40px] text-[16px] md:text-[18px] font-bold text-black text-center">
              #
            </div>
            <div className="flex-1 text-[15px] md:text-[16px] font-bold text-black ml-3 md:ml-4">
              CREATORS
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
                    Creator Performance Index - Overall score based on
                    engagement and growth metrics
                  </p>
                </PopoverContent>
              </Popover>
              <span className="text-[13px] md:text-[15px] font-bold text-black">
                CPI
              </span>
            </div>
          </div>
          {/* Table Body */}
          <FetchLoadingAndEmptyState
            isLoading={false}
            data={displayCreators?.length ?? 0}
            skeleton={() => (
              <>
                {/* Desktop Skeleton */}
                <div className="hidden desktop:flex items-center px-5 py-3 animate-pulse">
                  <div className="w-[40px] flex flex-col items-center gap-0.5">
                    <div className="h-5 w-6 bg-gray-200 rounded" />
                    <div className="h-4 w-8 bg-gray-200 rounded" />
                  </div>
                  <div className="flex-1 flex items-center gap-3 ml-5">
                    <div className="w-[60px] h-[52px] bg-gray-200 rounded-lg" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-5 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="w-[56px] flex justify-center">
                    <div className="w-6 h-5 bg-gray-200 rounded" />
                  </div>
                  <div className="w-[73px] flex justify-center">
                    <div className="w-6 h-5 bg-gray-200 rounded" />
                  </div>
                  <div className="w-[71px] flex justify-center">
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
                    <div className="w-[50px] md:w-[60px] aspect-square bg-gray-200 rounded-md" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="h-5 w-28 bg-gray-200 rounded" />
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
                <p className="text-lg font-medium">No creators found</p>
                <p className="text-sm mt-2">
                  Check back later for updated rankings
                </p>
              </div>
            }
            numberOfSkeleton={5}
            contentClassName="block"
          >
            {displayCreators?.map((creator) => (
              <div key={creator.creator_id}>
                {/* Desktop Row */}
                <div
                  className="hidden desktop:flex items-center px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/creator/${creator.creator_id}`)}
                >
                  {/* Rank & Trend */}
                  <div className="w-[30px] md:w-[40px] flex flex-col items-center gap-0.5">
                    <span className="text-[16px] font-semibold text-black">
                      {creator.rank}
                    </span>
                    {getTrendBadge(creator.trend, creator.trendValue)}
                  </div>

                  {/* Creator Info */}
                  <div className="flex-1 flex items-center gap-3 ml-3 md:ml-5 min-w-0">
                    <div className="w-[60px] h-[52px] relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[16px] font-bold text-black truncate">
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.418 5.643C15.2801 5.42264 15.0769 5.25076 14.8367 5.15128C14.5966 5.0518 14.3313 5.02968 14.078 5.088L12.28 5.501C12.0957 5.54335 11.9043 5.54335 11.72 5.501L9.922 5.088C9.66866 5.02968 9.40345 5.0518 9.16327 5.15128C8.9231 5.25076 8.71991 5.42264 8.582 5.643L7.602 7.207C7.502 7.367 7.367 7.502 7.207 7.603L5.643 8.583C5.42302 8.72079 5.25139 8.92365 5.15193 9.16341C5.05248 9.40318 5.03013 9.66796 5.088 9.921L5.501 11.721C5.5432 11.9049 5.5432 12.0961 5.501 12.28L5.088 14.079C5.02991 14.3322 5.05214 14.5972 5.15161 14.8372C5.25107 15.0771 5.42283 15.2801 5.643 15.418L7.207 16.398C7.367 16.498 7.502 16.633 7.603 16.793L8.583 18.357C8.865 18.808 9.403 19.031 9.922 18.912L11.72 18.499C11.9043 18.4566 12.0957 18.4566 12.28 18.499L14.079 18.912C14.3322 18.9701 14.5972 18.9479 14.8372 18.8484C15.0771 18.7489 15.2801 18.5772 15.418 18.357L16.398 16.793C16.498 16.633 16.633 16.498 16.793 16.398L18.358 15.418C18.5782 15.2799 18.7499 15.0767 18.8492 14.8365C18.9484 14.5964 18.9704 14.3312 18.912 14.078L18.5 12.28C18.4576 12.0957 18.4576 11.9043 18.5 11.72L18.913 9.921C18.9712 9.66792 18.9491 9.40299 18.8498 9.16303C18.7505 8.92307 18.579 8.71999 18.359 8.582L16.794 7.602C16.6342 7.50182 16.4992 7.36678 16.399 7.207L15.418 5.643ZM14.915 9.77C14.9769 9.65627 14.9922 9.52298 14.9577 9.39817C14.9233 9.27337 14.8418 9.16678 14.7304 9.10084C14.619 9.0349 14.4864 9.01475 14.3604 9.04462C14.2344 9.07449 14.1249 9.15206 14.055 9.261L11.44 13.687L9.861 12.175C9.81416 12.1269 9.75811 12.0887 9.69619 12.0628C9.63428 12.0368 9.56777 12.0236 9.50063 12.0239C9.43349 12.0241 9.36709 12.038 9.30541 12.0645C9.24372 12.091 9.188 12.1296 9.14158 12.1781C9.09516 12.2266 9.05898 12.284 9.03521 12.3468C9.01143 12.4096 9.00054 12.4765 9.0032 12.5436C9.00585 12.6107 9.02198 12.6766 9.05064 12.7373C9.0793 12.798 9.11989 12.8523 9.17 12.897L11.204 14.846C11.2584 14.8981 11.3239 14.9371 11.3956 14.9603C11.4673 14.9835 11.5432 14.9902 11.6178 14.9799C11.6925 14.9696 11.7638 14.9426 11.8265 14.9009C11.8892 14.8592 11.9417 14.8038 11.98 14.739L14.915 9.77Z"
                              fill="#2078EC"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {creator.platforms.includes("tiktok") && (
                          <div className="w-4 h-4 relative flex-shrink-0">
                            <Image
                              src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                              alt="TikTok"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.includes("youtube") && (
                          <div className="w-[18px] h-4 relative flex-shrink-0">
                            <Image
                              src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                              alt="YouTube"
                              width={18}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.includes("instagram") && (
                          <div className="w-4 h-4 relative flex-shrink-0">
                            <Image
                              src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                              alt="Instagram"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.includes("facebook") && (
                          <div className="w-4 h-4 relative flex-shrink-0">
                            <Image
                              src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                              alt="Facebook"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                        {creator.platforms.includes("twitter") && (
                          <div className="w-4 h-4 relative flex-shrink-0">
                            <Image
                              src="/010c352c2cf1f4b98457627615817e4628e08a8d.svg"
                              alt="X (Twitter)"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="w-[50px] md:w-[56px] text-center text-[16px] font-semibold text-black">
                    {creator.lastWeek}
                  </div>
                  <div className="w-[60px] md:w-[73px] text-center text-[16px] font-semibold text-black">
                    {creator.peak}
                  </div>
                  <div className="w-[60px] md:w-[71px] text-center text-[16px] font-semibold text-black">
                    {creator.woc}
                  </div>
                  <div className="w-[95px] flex justify-center">
                    <div className="bg-[#14532d] w-[40px] h-[34px] rounded flex items-center justify-center">
                      <span className="text-white text-[16px] font-bold">
                        {creator.cpiScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet Row */}
                <div
                  className="desktop:hidden flex items-start px-3 md:px-5 py-3 md:py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/creator/${creator.rank}`)}
                >
                  {/* Rank & Trend */}
                  <div className="w-[32px] md:w-[40px] flex flex-col items-center gap-0.5 pt-0.5">
                    <span className="text-[16px] md:text-[18px] font-semibold text-black">
                      {creator.rank}
                    </span>
                    {getTrendBadge(creator.trend, creator.trendValue)}
                  </div>

                  {/* Creator Info */}
                  <div className="flex-1 flex items-stretch gap-2 md:gap-3 ml-3 md:ml-4 min-w-0">
                    <div className="w-[50px] md:w-[60px] aspect-square relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/6ceea5221003e7bfa3126f43e08f71ecede73acf.png"
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-1 md:gap-2 min-w-0">
                        <span className="text-[15px] md:text-[16px] font-bold text-black truncate">
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 md:w-[20px] md:h-[20px]"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.418 5.643C15.2801 5.42264 15.0769 5.25076 14.8367 5.15128C14.5966 5.0518 14.3313 5.02968 14.078 5.088L12.28 5.501C12.0957 5.54335 11.9043 5.54335 11.72 5.501L9.922 5.088C9.66866 5.02968 9.40345 5.0518 9.16327 5.15128C8.9231 5.25076 8.71991 5.42264 8.582 5.643L7.602 7.207C7.502 7.367 7.367 7.502 7.207 7.603L5.643 8.583C5.42302 8.72079 5.25139 8.92365 5.15193 9.16341C5.05248 9.40318 5.03013 9.66796 5.088 9.921L5.501 11.721C5.5432 11.9049 5.5432 12.0961 5.501 12.28L5.088 14.079C5.02991 14.3322 5.05214 14.5972 5.15161 14.8372C5.25107 15.0771 5.42283 15.2801 5.643 15.418L7.207 16.398C7.367 16.498 7.502 16.633 7.603 16.793L8.583 18.357C8.865 18.808 9.403 19.031 9.922 18.912L11.72 18.499C11.9043 18.4566 12.0957 18.4566 12.28 18.499L14.079 18.912C14.3322 18.9701 14.5972 18.9479 14.8372 18.8484C15.0771 18.7489 15.2801 18.5772 15.418 18.357L16.398 16.793C16.498 16.633 16.633 16.498 16.793 16.398L18.358 15.418C18.5782 15.2799 18.7499 15.0767 18.8492 14.8365C18.9484 14.5964 18.9704 14.3312 18.912 14.078L18.5 12.28C18.4576 12.0957 18.4576 11.9043 18.5 11.72L18.913 9.921C18.9712 9.66792 18.9491 9.40299 18.8498 9.16303C18.7505 8.92307 18.579 8.71999 18.359 8.582L16.794 7.602C16.6342 7.50182 16.4992 7.36678 16.399 7.207L15.418 5.643ZM14.915 9.77C14.9769 9.65627 14.9922 9.52298 14.9577 9.39817C14.9233 9.27337 14.8418 9.16678 14.7304 9.10084C14.619 9.0349 14.4864 9.01475 14.3604 9.04462C14.2344 9.07449 14.1249 9.15206 14.055 9.261L11.44 13.687L9.861 12.175C9.81416 12.1269 9.75811 12.0887 9.69619 12.0628C9.63428 12.0368 9.56777 12.0236 9.50063 12.0239C9.43349 12.0241 9.36709 12.038 9.30541 12.0645C9.24372 12.091 9.188 12.1296 9.14158 12.1781C9.09516 12.2266 9.05898 12.284 9.03521 12.3468C9.01143 12.4096 9.00054 12.4765 9.0032 12.5436C9.00585 12.6107 9.02198 12.6766 9.05064 12.7373C9.0793 12.798 9.11989 12.8523 9.17 12.897L11.204 14.846C11.2584 14.8981 11.3239 14.9371 11.3956 14.9603C11.4673 14.9835 11.5432 14.9902 11.6178 14.9799C11.6925 14.9696 11.7638 14.9426 11.8265 14.9009C11.8892 14.8592 11.9417 14.8038 11.98 14.739L14.915 9.77Z"
                              fill="#2078EC"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1">
                        {creator.platforms.includes("tiktok") && (
                          <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] relative flex-shrink-0">
                            <Image
                              src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                              alt="TikTok"
                              width={14}
                              height={14}
                              className="md:w-[18px] md:h-[18px]"
                            />
                          </div>
                        )}
                        {creator.platforms.includes("youtube") && (
                          <div className="w-[16px] h-[14px] md:w-[20px] md:h-[18px] relative flex-shrink-0">
                            <Image
                              src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                              alt="YouTube"
                              width={16}
                              height={14}
                              className="md:w-[20px] md:h-[18px]"
                            />
                          </div>
                        )}
                        {creator.platforms.includes("instagram") && (
                          <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] relative flex-shrink-0">
                            <Image
                              src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                              alt="Instagram"
                              width={14}
                              height={14}
                              className="md:w-[18px] md:h-[18px]"
                            />
                          </div>
                        )}
                        {creator.platforms.includes("facebook") && (
                          <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] relative flex-shrink-0">
                            <Image
                              src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                              alt="Facebook"
                              width={14}
                              height={14}
                              className="md:w-[18px] md:h-[18px]"
                            />
                          </div>
                        )}
                        {creator.platforms.includes("twitter") && (
                          <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] relative flex-shrink-0">
                            <Image
                              src="/010c352c2cf1f4b98457627615817e4628e08a8d.svg"
                              alt="X (Twitter)"
                              width={14}
                              height={14}
                              className="md:w-[18px] md:h-[18px]"
                            />
                          </div>
                        )}
                      </div>
                      {/* LW, Peak, WOC inline */}
                      <div className="flex items-center gap-2 md:gap-3 text-[12px] md:text-[13px] text-gray-600">
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

                  {/* CPI Score */}
                  <div className="w-[48px] md:w-[70px] flex justify-end pt-0.5">
                    <div className="bg-[#14532d] w-[36px] md:w-[42px] h-[30px] md:h-[34px] rounded flex items-center justify-center">
                      <span className="text-white text-[13px] md:text-[15px] font-bold">
                        {creator.cpiScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                {/* {creator.rank < mockCreators.length && (
                  <div className="h-px bg-gray-200 mx-3 md:mx-5" />
                )} */}
              </div>
            ))}{" "}
          </FetchLoadingAndEmptyState>{" "}
        </div>

        {/* View More Button */}
        <div className="mt-8 mb-8 mx-4 bg-[#121416] rounded-lg p-2.5 flex items-center justify-center">
          <button
            onClick={() => router.push(buttonLink)}
            className="flex items-center gap-3 text-white text-[16px] font-bold"
          >
            View Creator Rankings
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
