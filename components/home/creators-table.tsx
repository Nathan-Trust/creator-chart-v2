import React from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
}

const mockCreators: Creator[] = [
  {
    rank: 1,
    name: "Carter Efe",
    verified: true,
    platforms: ["tiktok", "youtube", "instagram", "facebook"],
    lastWeek: 2,
    peak: 1,
    woc: 7,
    cpiScore: 87,
    trend: "up",
    trendValue: 1,
  },
  {
    rank: 2,
    name: "P-Square",
    verified: true,
    platforms: ["tiktok", "youtube", "instagram"],
    lastWeek: 2,
    peak: 1,
    woc: 7,
    cpiScore: 87,
    trend: "new",
  },
  {
    rank: 3,
    name: "P-Square",
    verified: true,
    platforms: ["youtube", "twitter"],
    lastWeek: 2,
    peak: 1,
    woc: 7,
    cpiScore: 87,
    trend: "reentry",
  },
  {
    rank: 4,
    name: "P-Square",
    verified: true,
    platforms: ["tiktok", "instagram"],
    lastWeek: 2,
    peak: 1,
    woc: 7,
    cpiScore: 87,
    trend: "down",
    trendValue: 1,
  },
  {
    rank: 5,
    name: "P-Square",
    verified: true,
    platforms: ["tiktok", "youtube", "instagram", "facebook"],
    lastWeek: 2,
    peak: 1,
    woc: 7,
    cpiScore: 87,
    trend: "none",
  },
];

export default function CreatorsTable() {
  const getTrendBadge = (trend: Creator["trend"], trendValue?: number) => {
    if (trend === "new")
      return (
        <div className="bg-[rgba(32,120,236,0.2)] flex items-center justify-center px-1.5 py-0.5 rounded-[9px]">
          <span className="text-[#2078ec] text-[12px] font-medium">New</span>
        </div>
      );
    if (trend === "reentry")
      return (
        <div className="bg-[rgba(32,120,236,0.2)] flex items-center justify-center px-1.5 py-0.5 rounded-[9px]">
          <span className="text-[#2078ec] text-[12px] font-medium">
            Re-entry
          </span>
        </div>
      );
    if (trend === "up")
      return (
        <div className="bg-[rgba(35,140,77,0.3)] flex items-center justify-center px-1.5 py-0.5 rounded-[9px]">
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
      );
    if (trend === "down")
      return (
        <div className="bg-[rgba(179,38,30,0.3)] flex items-center justify-center px-1.5 py-0.5 rounded-[9px]">
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
      );
    return (
      <div className="bg-[rgba(0,0,0,0.2)] flex items-center justify-center px-3 py-0.5 rounded-[9px]">
        <span className="text-[rgba(0,0,0,0.6)] text-[12px] font-medium">
          -
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[650px] h-full flex flex-col">
      {/* Header with rounded corners */}
      <div className="bg-[#121416] rounded-t-lg p-8 flex items-start justify-between h-[280px]">
        <div>
          <h2 className="text-[44px] font-extrabold text-white leading-[60px]">
            TOP
            <br />
            100
            <br />
            CREATORS
          </h2>
          <p className="text-white/80 text-[20px] font-medium mt-1">
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
          {/* Table Header */}
          <div className="flex items-center px-5 py-3 border-b">
            <div className="w-[40px] text-[18px] font-bold text-black text-center">
              #
            </div>
            <div className="flex-1 text-[16px] font-bold text-black ml-5">
              CREATORS
            </div>
            <div className="w-[56px] text-center flex items-center justify-center gap-1">
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
            <div className="w-[73px] text-center flex items-center justify-center gap-1">
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
            <div className="w-[71px] text-center flex items-center justify-center gap-1">
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

          {/* Table Body */}
          {mockCreators.map((creator) => (
            <div key={creator.rank}>
              <div className="flex items-center px-5 py-3">
                {/* Rank & Trend */}
                <div className="w-[40px] flex flex-col items-center gap-0.5">
                  <span className="text-[16px] font-semibold text-black">
                    {creator.rank}
                  </span>
                  {getTrendBadge(creator.trend, creator.trendValue)}
                </div>

                {/* Creator Info */}
                <div className="flex-1 flex items-center gap-3 ml-5 min-w-0">
                  <div className="w-[60px] h-[52px] relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/6ceea5221003e7bfa3126f43e08f71ecede73acf.png"
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
                <div className="w-[56px] text-center text-[16px] font-semibold text-black">
                  {creator.lastWeek}
                </div>
                <div className="w-[73px] text-center text-[16px] font-semibold text-black">
                  {creator.peak}
                </div>
                <div className="w-[71px] text-center text-[16px] font-semibold text-black">
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
              {/* Divider Line */}
              {creator.rank < mockCreators.length && (
                <div className="h-px bg-gray-200 mx-5" />
              )}
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-8 mb-8 mx-4 bg-[#121416] rounded-lg p-2.5 flex items-center justify-center">
          <button className="flex items-center gap-3 text-white text-[16px] font-bold">
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
