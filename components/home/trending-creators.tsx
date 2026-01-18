import React from "react";
import Image from "next/image";

interface TrendingCreator {
  rank: number;
  name: string;
  country: string;
  countryFlag: "nigeria" | "peru" | "chad";
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
    countryFlag: "nigeria",
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
    countryFlag: "peru",
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
    countryFlag: "chad",
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
    countryFlag: "peru",
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
    countryFlag: "chad",
    verified: true,
    growth: "+98%",
    status: "rising-fast",
    statusRank: "#4",
    trend: "none",
  },
];

export default function TrendingCreators() {
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
        <div className="bg-[#fffbeb] flex items-center gap-4 px-2.5 py-1 rounded-[8px] h-[32px] w-[117px]">
          {/* Fire icon from Figma */}
          <img
            src="/b4603aaffcaf035fc4b68e1a976ea524ac9158bd.svg"
            alt="fire"
            className="w-[18px] h-[22px]"
          />
          <span className="text-[#dc831a] text-[16px] font-semibold">
            At Peak
          </span>
        </div>
      );
    if (status === "approaching-peak")
      return (
        <div className="bg-[#faf5ff] flex items-center gap-4 px-2.5 py-1 rounded-[8px] h-[32px]">
          {/* Purple rocket from Figma */}
          <img
            src="/d02caf3462af88d4beb3439c31c92ad69e17736f.svg"
            alt="rocket"
            className="w-6 h-6"
          />
          <span className="text-[#b35afb] text-[16px] font-semibold">
            Approacing Peak
          </span>
        </div>
      );
    return (
      <div className="bg-[#ecfdf5] flex items-center gap-4 px-2.5 py-1 rounded-[8px] h-[32px]">
        {/* Green rocket from Figma */}
        <img
          src="/3931706a1c0b7a69172be5436781ba72d2b5b409.svg"
          alt="rocket"
          className="w-6 h-6"
        />
        <span className="text-[#43b997] text-[16px] font-semibold">
          Rising fast
        </span>
      </div>
    );
  };

  const getCountryFlag = (flag: TrendingCreator["countryFlag"]) => {
    // Use actual SVG assets from Figma
    if (flag === "nigeria")
      return (
        <img
          src="/a4968338b72a4edd117fe5d2af90694017ff468a.svg"
          alt="Nigeria flag"
          className="w-[14px] h-[14px]"
        />
      );
    if (flag === "peru")
      return (
        <img
          src="/34f6af41524f1c57736af291a304945e9e6aff74.svg"
          alt="Peru flag"
          className="w-[18px] h-[18px]"
        />
      );
    return (
      <img
        src="/9a5acd577b00105f76938d3bd0c5bf86de3fd9ea.svg"
        alt="Chad flag"
        className="w-[18px] h-[18px]"
      />
    );
  };

  return (
    <div className="w-full max-w-[650px] h-full flex flex-col">
      {/* Header with orange background */}
      <div className="bg-[#dc831a] rounded-t-lg p-8 flex items-center justify-between h-[318px]">
        <div>
          <h2 className="text-[48px] font-extrabold text-white leading-[70px]">
            TRENDING
            <br />
            CREATORS
          </h2>
          <p className="text-white/80 text-[24px] font-medium mt-0">
            Creators rapidly gaining momentum
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

      {/* Creators List */}
      <div className="bg-white rounded-b-lg  overflow-hidden flex-1 flex flex-col justify-between">
        <div>
          {mockTrendingCreators.map((creator) => (
            <div key={creator.rank}>
              <div className="flex items-center gap-[17px] px-3 py-4 relative">
                {/* Rank & Trend - positioned on left */}
                <div className="w-[33px] flex flex-col items-center gap-0.5">
                  <span className="text-[20px] font-semibold text-black">
                    {creator.rank}
                  </span>
                  {getTrendBadge(creator.trend, creator.trendValue)}
                </div>

                {/* Creator Avatar */}
                <div className="w-[75px] h-[64px] relative rounded-lg overflow-hidden">
                  <Image
                    src="/326ee8c6a3752daeeb2baed405a4798a36da76de.png"
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                </div>

                {/* Creator Info */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] font-bold text-black">
                      {creator.name}
                    </span>
                    {creator.verified && (
                      <img
                        src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                        alt="verified"
                        className="w-6 h-6"
                      />
                    )}
                    <div className="w-[24px] h-[24px] flex items-center justify-center">
                      {getCountryFlag(creator.countryFlag)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-[#e2e8f0] px-4 py-[5px] rounded-[8px]">
                      <span className="text-[#1f1f1f] text-[16px] font-medium">
                        {creator.country}
                      </span>
                    </div>
                    <div className="bg-[rgba(35,140,77,0.3)] flex items-center h-[32px] px-4 py-0.5 rounded-[9px]">
                      <img
                        src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
                        alt="up"
                        className="w-3 h-3"
                      />
                      <span className="text-[#238c4d] text-[12px] font-medium">
                        {creator.growth}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-1.5">
                  {getStatusBadge(creator.status)}
                  <div className="bg-[#f1f5f9] h-[32px] px-2.5 py-1 rounded-[8px] flex items-center justify-center">
                    <span className="text-[16px] font-semibold text-black">
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
            <button className="flex items-center gap-3 text-white text-[16px] font-bold">
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
