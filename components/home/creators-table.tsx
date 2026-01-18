import React from "react";
import Image from "next/image";

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
      <div className="bg-[#121416] rounded-t-lg p-8 flex items-center justify-between h-[318px]">
        <div>
          <h2 className="text-[48px] font-extrabold text-white leading-[70px]">
            TOP
            <br />
            100
            <br />
            CREATORS
          </h2>
          <p className="text-white/80 text-[24px] font-medium mt-0">
            The top creators
          </p>
        </div>
        <div className="w-[70px] h-[86px] relative">
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
        <div className="flex items-center px-5 py-4 border-b">
          <div className="w-[40px] text-[32px] font-medium text-black">#</div>
          <div className="flex-1 text-[20px] font-bold text-black">
            CREATORS
          </div>
          <div className="w-[56px] text-center flex items-center justify-center gap-1.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.5" />
              <path
                d="M12 8V12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="0.5" fill="black" />
            </svg>
            <span className="text-[16px] font-bold text-black">LW</span>
          </div>
          <div className="w-[73px] text-center flex items-center justify-center gap-1.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.5" />
              <path
                d="M12 8V12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="0.5" fill="black" />
            </svg>
            <span className="text-[16px] font-bold text-black">PEAK</span>
          </div>
          <div className="w-[71px] text-center flex items-center justify-center gap-1.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.5" />
              <path
                d="M12 8V12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="0.5" fill="black" />
            </svg>
            <span className="text-[16px] font-bold text-black">WOC</span>
          </div>
          <div className="w-[114px] text-center flex items-center justify-center gap-1.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.5" />
              <path
                d="M12 8V12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="0.5" fill="black" />
            </svg>
            <span className="text-[16px] font-bold text-black">CPI SCORE</span>
          </div>
        </div>

        {/* Table Body */}
        {mockCreators.map((creator) => (
          <div key={creator.rank}>
            <div className="flex items-center px-5 py-4">
              {/* Rank & Trend */}
              <div className="w-[40px] flex flex-col items-center gap-0.5">
                <span className="text-[20px] font-semibold text-black">
                  {creator.rank}
                </span>
                {getTrendBadge(creator.trend, creator.trendValue)}
              </div>

              {/* Creator Info */}
              <div className="flex-1 flex items-center gap-[17px] ml-5">
                <div className="w-[75px] h-[64px] relative rounded-lg overflow-hidden">
                  <Image
                    src="/6ceea5221003e7bfa3126f43e08f71ecede73acf.png"
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] font-medium text-black">
                      {creator.name}
                    </span>
                    {creator.verified && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                  <div className="flex items-center gap-2">
                    {creator.platforms.includes("tiktok") && (
                      <div className="w-6 h-6 relative">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                        </svg>
                      </div>
                    )}
                    {creator.platforms.includes("youtube") && (
                      <div className="w-7 h-6 relative">
                        <svg
                          width="28"
                          height="24"
                          viewBox="0 0 28 24"
                          fill="none"
                        >
                          <path
                            d="M27.44 5.59c-.32-1.2-1.27-2.15-2.47-2.47C22.8 2.5 14 2.5 14 2.5s-8.8 0-10.97.62c-1.2.32-2.15 1.27-2.47 2.47C0 7.76 0 12 0 12s0 4.24.56 6.41c.32 1.2 1.27 2.15 2.47 2.47C5.2 21.5 14 21.5 14 21.5s8.8 0 10.97-.62c1.2-.32 2.15-1.27 2.47-2.47C28 16.24 28 12 28 12s0-4.24-.56-6.41z"
                            fill="#FF0000"
                          />
                          <path d="M11 15.5V8.5l7 3.5-7 3.5z" fill="white" />
                        </svg>
                      </div>
                    )}
                    {creator.platforms.includes("instagram") && (
                      <div className="w-6 h-6 relative">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="6"
                            fill="url(#ig-gradient)"
                          />
                          <defs>
                            <linearGradient
                              id="ig-gradient"
                              x1="0"
                              y1="24"
                              x2="24"
                              y2="0"
                            >
                              <stop offset="0%" stopColor="#FD5" />
                              <stop offset="50%" stopColor="#FF543E" />
                              <stop offset="100%" stopColor="#C837AB" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="12"
                            cy="12"
                            r="5"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                          />
                          <circle cx="18" cy="6" r="1.5" fill="white" />
                        </svg>
                      </div>
                    )}
                    {creator.platforms.includes("facebook") && (
                      <div className="w-6 h-6 relative">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="#1877F2"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                    )}
                    {creator.platforms.includes("twitter") && (
                      <div className="w-6 h-6 relative">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="w-[56px] text-center text-[20px] font-semibold text-black">
                {creator.lastWeek}
              </div>
              <div className="w-[73px] text-center text-[20px] font-semibold text-black">
                {creator.peak}
              </div>
              <div className="w-[71px] text-center text-[20px] font-semibold text-black">
                {creator.woc}
              </div>
              <div className="w-[114px] flex justify-center">
                <div className="bg-[#14532d] w-[44px] h-[39px] rounded flex items-center justify-center">
                  <span className="text-white text-[20px] font-bold">
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
