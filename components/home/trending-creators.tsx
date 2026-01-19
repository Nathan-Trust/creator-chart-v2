"use client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { CreatorChartsRoutes } from "@/routes";
import { useRouter } from "next/navigation";

interface TrendingCreator {
  rank: number;
  name: string;
  country: string;
  countryCode: string;
  verified: boolean;
  growth: string;
  status: "at-peak" | "approaching-peak" | "rising-fast";
  statusRank: string;
  trend: "up" | "down" | "new" | "reentry" | "none";
  trendValue?: number;
}

const mockTrendingCreators: TrendingCreator[] = [
  {
    rank: 1,
    name: "Davido",
    country: "Nigeria",
    countryCode: "NG",
    verified: true,
    growth: "+98%",
    status: "at-peak",
    statusRank: "#1",
    trend: "up",
    trendValue: 1,
  },
  {
    rank: 2,
    name: "Davido",
    country: "Peru",
    countryCode: "PE",
    verified: true,
    growth: "+98%",
    status: "at-peak",
    statusRank: "#1",
    trend: "new",
  },
  {
    rank: 3,
    name: "Davido",
    country: "Romania",
    countryCode: "RO",
    verified: true,
    growth: "+98%",
    status: "approaching-peak",
    statusRank: "#2",
    trend: "reentry",
  },
  {
    rank: 4,
    name: "Davido",
    country: "Nigeria",
    countryCode: "NG",
    verified: true,
    growth: "+98%",
    status: "rising-fast",
    statusRank: "#1",
    trend: "down",
    trendValue: 1,
  },
  {
    rank: 5,
    name: "Davido",
    country: "Nigeria",
    countryCode: "NG",
    verified: true,
    growth: "+98%",
    status: "rising-fast",
    statusRank: "#4",
    trend: "none",
  },
];

export default function TrendingCreators() {
  const router = useRouter();
  const getTrendBadge = (
    trend: TrendingCreator["trend"],
    trendValue?: number,
  ) => {
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
            {/* Green up arrow from Figma */}
            <img
              src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
              alt="up"
              className="w-3 h-3"
            />
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
            {/* Red down arrow from Figma (rotated up arrow) */}
            <img
              src="/5f10c61cd1727b5280312d79ba35244e4e08fabe.svg"
              alt="down"
              className="w-3 h-3 rotate-180"
            />
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

  const getStatusBadge = (status: TrendingCreator["status"]) => {
    if (status === "at-peak")
      return (
        <div className="bg-[#fffbeb] flex items-center gap-3 px-2 py-1 rounded-[8px] h-[28px] w-[105px]">
          {/* Fire icon from Figma */}
          <img
            src="/b4603aaffcaf035fc4b68e1a976ea524ac9158bd.svg"
            alt="fire"
            className="w-[16px] h-[20px]"
          />
          <span className="text-[#dc831a] text-[14px] font-semibold">
            At Peak
          </span>
        </div>
      );
    if (status === "approaching-peak")
      return (
        <div className="bg-[#faf5ff] flex items-center gap-3 px-2 py-1 rounded-[8px] h-[28px]">
          {/* Purple rocket from Figma */}
          <img
            src="/d02caf3462af88d4beb3439c31c92ad69e17736f.svg"
            alt="rocket"
            className="w-5 h-5"
          />
          <span className="text-[#b35afb] text-[14px] font-semibold">
            Approaching Peak
          </span>
        </div>
      );
    return (
      <div className="bg-[#ecfdf5] flex items-center gap-3 px-2 py-1 rounded-[8px] h-[28px]">
        {/* Green rocket from Figma */}
        <img
          src="/3931706a1c0b7a69172be5436781ba72d2b5b409.svg"
          alt="rocket"
          className="w-5 h-5"
        />
        <span className="text-[#43b997] text-[14px] font-semibold">
          Rising fast
        </span>
      </div>
    );
  };

  const getCountryFlag = (countryCode: string) => {
    return (
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "2px",
        }}
        title={countryCode}
      />
    );
  };

  return (
    <div className="w-full max-w-[650px] h-full flex flex-col">
      {/* Header with orange background */}
      <div className="bg-[#dc831a] rounded-t-lg p-8 flex items-start justify-between h-[280px]">
        <div>
          <h2 className="text-[44px] font-extrabold text-white leading-[60px]">
            TRENDING
            <br />
            CREATORS
          </h2>
          <p className="text-white/80 text-[20px] font-medium mt-1">
            Creators rapidly gaining momentum
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

      {/* Creators List */}
      <div className="bg-white rounded-b-lg  overflow-hidden flex-1 flex flex-col justify-between">
        <div>
          {/* Table Header */}
          <div className="flex items-center px-5 py-3 border-b">
            <div className="w-[40px] text-[18px] font-bold text-black t">#</div>
            <div className="flex-1 text-[16px] font-bold text-black ml-5">
              CREATORS
            </div>
          </div>

          {mockTrendingCreators.map((creator) => (
            <div key={creator.rank}>
              <div className="flex items-center gap-3 px-5 py-3">
                {/* Rank & Trend */}
                <div className="w-[40px] flex flex-col items-center gap-0.5">
                  <span className="text-[16px] font-semibold text-black">
                    {creator.rank}
                  </span>
                  {getTrendBadge(creator.trend, creator.trendValue)}
                </div>

                {/* Creator Avatar */}
                <div className="w-[60px] h-[62px] relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/326ee8c6a3752daeeb2baed405a4798a36da76de.png"
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                </div>

                {/* Creator Info */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  {/* Name + Badges Row */}
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-black truncate">
                      {creator.name}
                    </span>
                    {creator.verified && (
                      <img
                        src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                        alt="verified"
                        className="w-4 h-4 shrink-0"
                      />
                    )}
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {getCountryFlag(creator.countryCode)}
                    </div>
                  </div>

                  {/* Rank/Category Text */}
                  <p className="text-[10px] font-medium text-[rgba(31,31,31,0.5)]">
                    #{creator.rank} Top 100 Creator
                  </p>

                  {/* Country + Growth Badges Row */}
                  <div className="flex items-start gap-2">
                    <div className="bg-[#e2e8f0] flex items-center h-[24px] px-2.5 py-0.5 rounded-[8px]">
                      <span className="text-[#1f1f1f] text-[10px] font-medium">
                        {creator.country}
                      </span>
                    </div>
                    <div className="bg-[rgba(35,140,77,0.3)] flex items-center h-[24px] px-2.5 py-0.5 rounded-[8px]">
                      <img
                        src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
                        alt="up"
                        className="w-2 h-2"
                      />
                      <span className="text-[#238c4d] text-[10px] font-medium">
                        {creator.growth}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {getStatusBadge(creator.status)}
                  <div className="bg-[#f1f5f9] h-[28px] px-2 py-1 rounded-[8px] flex items-center justify-center">
                    <span className="text-[14px] font-semibold text-black">
                      {creator.statusRank}
                    </span>
                  </div>
                </div>
              </div>
              {/* Divider Line */}
              {creator.rank < mockTrendingCreators.length && (
                <div className="h-px bg-black/20 mx-5" />
              )}
            </div>
          ))}
        </div>
        {/* View More Button with orange background */}
        <div className="mt-8 mb-8 mx-4 bg-[#dc831a] rounded-lg p-2.5 flex items-center justify-center">
          <button
            onClick={() => router.push(CreatorChartsRoutes.TRENDING_CREATORS)}
            className="flex items-center gap-3 text-white text-[16px] font-bold"
          >
            View Trending Creators
            {/* Arrow from Figma (rotated 180deg since it's left arrow) */}
            <img
              src="/cef826fe34f02780b70a3cc7a40c1fb4e9819b2c.svg"
              alt="arrow"
              className="w-4 h-4 rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
