"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Play } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
}

const TopVideosClient = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [weeklyRange, setWeeklyRange] = useState("Jan 9 - 15, 2026");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  const dateRanges = [
    "Jan 9 - 15, 2026",
    "Jan 2 - 8, 2026",
    "Dec 26 - Jan 1, 2025",
    "Dec 19 - 25, 2025",
    "Dec 12 - 18, 2025",
    "Dec 5 - 11, 2025",
  ];

  const countries = ["Global", "United States", "Nigeria"];

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

  const getRankBadge = (index: number, change: string) => {
    if (index === 0) {
      return (
        <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
          <Image
            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
            alt="arrow-up"
            width={14}
            height={14}
          />
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
          <div className="rotate-180">
            <Image
              src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
              alt="arrow-down"
              width={14}
              height={14}
              style={{
                filter:
                  "invert(32%) sepia(89%) saturate(2094%) hue-rotate(347deg) brightness(87%) contrast(88%)",
              }}
            />
          </div>
          <span className="text-[10px] font-medium text-[#b3261e]">-1</span>
        </div>
      );
    } else if (index === 4) {
      return (
        <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
          <Image
            src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
            alt="arrow-up"
            width={14}
            height={14}
          />
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
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-[34px] font-extrabold leading-17.5 text-black mb-2">
            Top 100 Videos
          </h1>
          <p className="text-[18px] font-medium text-black mb-6">
            Your update of the top 100 creators
          </p>
        </div>

        {/* Filter Dropdown */}
        <div
          className="sticky z-40 bg-white pb-6 pt-2 transition-all duration-300"
          style={{ top: navbarVisible ? "88px" : "0px" }}
        >
          <Popover open={weeklyOpen} onOpenChange={setWeeklyOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-6 px-4 py-2.5 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[18px] font-semibold text-black">
                  {weeklyRange}
                </span>
                <ChevronDown className="w-5 h-5" />
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
                    className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
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
              <div className="inline-flex items-center gap-6 px-4 py-2.5 ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[18px] font-semibold text-black">
                  {selectedCountry}
                </span>
                <ChevronDown className="w-5 h-5" />
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

        {/* Table Headers */}
        <div
          className="sticky z-30 bg-white grid grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-4 border-b px-4 py-2 transition-all duration-300"
          style={{ top: navbarVisible ? "164px" : "76px" }}
        >
          <div className="text-[20px] font-medium text-center text-black">
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
                  The video&apos;s position on this chart during the previous chart week
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
                  Stream Score - Overall score based on engagement and streaming metrics
                </p>
              </PopoverContent>
            </Popover>
            <span className="text-[15px] font-bold text-black">STREAM</span>
          </div>
          <div></div>
        </div>

        {/* Videos List */}
        <div className="space-y-0">
          {mockVideos.map((video, index) => (
            <div key={index} className="border-b">
              <div
                className="grid grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-4 py-6 px-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
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
                <div className="flex items-center gap-4">
                  <div className="relative w-[80px] h-[70px] rounded-[5px] overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-6 h-6 fill-white text-white"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-black">
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
                <div className="flex justify-center">
                  {(hoveredRow === index || expandedRow === index) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedRow(expandedRow === index ? null : index);
                      }}
                      className="flex items-center gap-2 text-[15px] font-semibold text-black hover:text-gray-700 transition-colors"
                    >
                      {expandedRow === index ? (
                        <>
                          Close
                          <svg
                            width="20"
                            height="20"
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
                        </>
                      ) : (
                        <>
                          View
                          <svg
                            width="20"
                            height="20"
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
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedRow === index && (
                <div className="px-4 pb-8 ">
                  <div className="ml-53 space-y-4">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopVideosClient;
