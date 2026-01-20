"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Creator {
  rank: number;
  lastWeek: number;
  peak: number;
  woc: number;
  cpiScore: number;
  name: string;
  verified: boolean;
  imageUrl: string;
  platforms: {
    tiktok: boolean;
    youtube: boolean;
    instagram: boolean;
    facebook: boolean;
  };
  change: number;
  debutChartDate: string;
  peakChartDate: string;
}

const mockCreators: Creator[] = Array(6)
  .fill(null)
  .map(() => ({
    rank: 1,
    lastWeek: 2,
    peak: 2,
    woc: 2,
    cpiScore: 87,
    name: "Carter Efe",
    verified: true,
    imageUrl: "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png",
    platforms: {
      tiktok: true,
      youtube: true,
      instagram: true,
      facebook: true,
    },
    change: 1,
    debutChartDate: "29th January, 2025",
    peakChartDate: "2nd February, 2025",
  }));

const QuestionIcon = () => (
  <Image
    src="/aa79614e0a8078a7ecabf856d944255d922e18b6.svg"
    alt="Help"
    width={14}
    height={14}
  />
);

const VerifyIcon = () => (
  <Image
    src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
    alt="Verified"
    width={24}
    height={24}
  />
);

const ArrowUpIcon = () => (
  <Image
    src="/51bd690896d1734971384cd24af9735c6f9f3e8f.svg"
    alt="Up"
    width={14}
    height={14}
  />
);

export default function TopCreatorClient() {
  const router = useRouter();
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

  const countries = ["Global" ,"United States", "Nigeria"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      // Navbar shows when scrolling up or at top
      if (currentScrollY <= 100 || difference < -5) {
        setNavbarVisible(true);
      }
      // Navbar hides when scrolling down past 100px
      else if (currentScrollY > 100 && difference > 0) {
        setNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-[34px] font-extrabold leading-17.5 text-black mb-2">
            Top 100 Creators
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
          <div className="text-[18px] font-bold text-black">CREATORS</div>
          <div className="flex items-center justify-center gap-1.5">
            <Popover>
              <PopoverTrigger asChild>
                <button className="cursor-help">
                <QuestionIcon/>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                <p className="text-[13px] text-gray-700">
                  The creator&apos;s position on this chart during the previous chart week
                </p>
              </PopoverContent>
            </Popover>
            <span className="text-[15px] font-bold text-black">LW</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Popover>
              <PopoverTrigger asChild>
                <button className="cursor-help">
                <QuestionIcon/>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                <p className="text-[13px] text-gray-700">
                  The highest position a creator has ever achieved on this chart
                </p>
              </PopoverContent>
            </Popover>
            <span className="text-[15px] font-bold text-black">PEAK</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Popover>
              <PopoverTrigger asChild>
                <button className="cursor-help">
                <QuestionIcon/>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                <p className="text-[13px] text-gray-700">
                  The total number of weeks a creator has appeared on this chart
                </p>
              </PopoverContent>
            </Popover>
            <span className="text-[15px] font-bold text-black">WOC</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Popover>
              <PopoverTrigger asChild>
                <button className="cursor-help">
                <QuestionIcon/>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                <p className="text-[13px] text-gray-700">
                  Creator Performance Index - Overall score based on popularity, engagement, and chart performance
                </p>
              </PopoverContent>
            </Popover>
            <span className="text-[15px] font-bold text-black">CPI SCORE</span>
          </div>
          <div></div>
        </div>

        {/* Creators List */}
        <div className="space-y-0">
          {mockCreators.map((creator, index) => (
            <div key={index} className="border-b">
              <div
                className="grid grid-cols-[80px_1fr_120px_120px_120px_180px_100px] gap-4 py-6 px-4 items-center hover:bg-gray-50 transition-colors cursor-pointer relative"
                onClick={() => toggleRow(index)}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Rank Column */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[18px] font-semibold text-black">
                    {index + 1}
                  </span>
                  <div className="flex items-center gap-0.5 px-2 py-1 bg-[rgba(35,140,77,0.3)] rounded-lg">
                    <ArrowUpIcon />
                    <span className="text-[10px] font-medium text-[#238c4d]">
                      +{creator.change}
                    </span>
                  </div>
                </div>

                {/* Creator Info Column */}
                <div className="flex items-center gap-4">
                  <div className="relative w-[80px] h-[70px] rounded-[5px] overflow-hidden">
                    <Image
                      src={creator.imageUrl}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="text-[18px] font-bold text-black hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/creator/${index + 1}`);
                        }}
                      >
                        {creator.name}
                      </span>
                      {creator.verified && <VerifyIcon />}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {creator.platforms.tiktok && (
                        <div className="w-6 h-6 relative">
                          <Image
                            src="/da945c51edc819e8c1efac3ddf2d6ee3e8199af0.svg"
                            alt="TikTok"
                            width={18}
                            height={18}
                          />
                        </div>
                      )}
                      {creator.platforms.youtube && (
                        <div className="w-7 h-6 relative">
                          <Image
                            src="/51de99b844393c85f4cc28bbdabb9cb5cd9b16df.svg"
                            alt="YouTube"
                            width={20}
                            height={18}
                          />
                        </div>
                      )}
                      {creator.platforms.instagram && (
                        <div className="w-6 h-6 relative">
                          <Image
                            src="/ffbc6a388c53456a0f549bc2ccdd025225a494d3.svg"
                            alt="Instagram"
                            width={18}
                            height={18}
                          />
                        </div>
                      )}
                      {creator.platforms.facebook && (
                        <div className="w-6 h-6 relative">
                          <Image
                            src="/78ff35e4b31f565a817a75d0e0f0a2a32cb30f9a.svg"
                            alt="Facebook"
                            width={18}
                            height={18}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Columns */}
                <div className="text-[20px] font-normal text-black text-center">
                  {creator.lastWeek}
                </div>
                <div className="text-[20px] font-normal text-black text-center">
                  {creator.peak}
                </div>
                <div className="text-[20px] font-normal text-black text-center">
                  {creator.woc}
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center bg-[#14532d] text-white text-[16px] font-bold px-3 py-2 rounded-[3px] min-w-[40px]">
                    {creator.cpiScore}
                  </div>
                </div>

                {/* View/Close Button */}
                <div className="flex justify-center">
                  {(hoveredRow === index || expandedRow === index) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(index);
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
                <div className="px-4 pb-8  ">
                  <div className="ml-53 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-semibold text-black min-w-45">
                        Debut Chart Date
                      </span>
                      <span className="text-[15px] font-normal text-black">
                        {creator.debutChartDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-semibold text-black min-w-45">
                        Peak Chart Date
                      </span>
                      <span className="text-[15px] font-normal text-black">
                        {creator.peakChartDate}
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
}
