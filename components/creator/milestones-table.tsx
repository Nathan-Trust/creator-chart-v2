"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, Trophy, TrendingUp, Star, Award } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  icon: "trophy" | "trending" | "star" | "award";
  value: string;
}

const dateRanges = ["All Time", "2026", "2025", "2024", "2023", "2022"];

const categories = [
  "All",
  "Chart Achievements",
  "View Milestones",
  "Engagement",
  "Growth",
];

const mockMilestones: Milestone[] = [
  {
    id: 1,
    title: "First #1 Position",
    description: "Reached #1 on Weekly Top Creators — Nigeria",
    date: "February 2, 2025",
    category: "Chart Achievements",
    icon: "trophy",
    value: "#1",
  },
  {
    id: 2,
    title: "100M Total Views",
    description: "Surpassed 100 million total views across all content",
    date: "January 15, 2025",
    category: "View Milestones",
    icon: "star",
    value: "100M",
  },
  {
    id: 3,
    title: "Top 10 for 50 Weeks",
    description: "Maintained Top 10 position for 50 consecutive weeks",
    date: "December 20, 2024",
    category: "Chart Achievements",
    icon: "trending",
    value: "50 Weeks",
  },
  {
    id: 4,
    title: "Peak CPI Score of 92",
    description: "Achieved highest CPI score on Global Charts",
    date: "November 8, 2024",
    category: "Chart Achievements",
    icon: "award",
    value: "92",
  },
  {
    id: 5,
    title: "10M Followers",
    description: "Reached 10 million followers milestone",
    date: "October 3, 2024",
    category: "Growth",
    icon: "star",
    value: "10M",
  },
  {
    id: 6,
    title: "Viral Video - 50M Views",
    description: "Single video reached 50 million views",
    date: "September 15, 2024",
    category: "View Milestones",
    icon: "trophy",
    value: "50M",
  },
];

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "trophy":
      return <Trophy className="w-6 h-6" />;
    case "trending":
      return <TrendingUp className="w-6 h-6" />;
    case "star":
      return <Star className="w-6 h-6" />;
    case "award":
      return <Award className="w-6 h-6" />;
    default:
      return <Trophy className="w-6 h-6" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Chart Achievements":
      return "bg-[#14532d] text-white";
    case "View Milestones":
      return "bg-[#2078ec] text-white";
    case "Engagement":
      return "bg-[#7cc24a] text-white";
    case "Growth":
      return "bg-[#f59e0b] text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

export default function MilestonesTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [yearRange, setYearRange] = useState<string>(dateRanges[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  const [yearOpen, setYearOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

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

  const visibleMilestones = useMemo(() => {
    let filtered = mockMilestones;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }

    if (yearRange !== "All Time") {
      filtered = filtered.filter((m) => m.date.includes(yearRange));
    }

    return filtered;
  }, [selectedCategory, yearRange]);

  return (
    <div className="w-full">
      {/* Filter Dropdown & Header */}
      <div
        className="sticky z-40 backdrop-blur flex flex-col transition-all duration-300"
        style={{ top: navbarVisible ? "88px" : "0px" }}
      >
        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-0 pb-4 pt-2">
          <Popover open={yearOpen} onOpenChange={setYearOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[14px] lg:text-[16px] font-semibold text-black">
                  {yearRange}
                </span>
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
              <div className="flex flex-col gap-1">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setYearRange(range);
                      setYearOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
                      yearRange === range
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

          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <div className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:ml-4 border border-black rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[14px] lg:text-[16px] font-semibold text-black">
                  {selectedCategory}
                </span>
                <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
              <div className="flex flex-col gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 transition-colors ${
                      selectedCategory === category
                        ? "bg-gray-100 font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Section Header */}
        <div className="border-b px-3 lg:px-4 py-3 lg:py-4">
          <h3 className="text-[16px] lg:text-[18px] font-bold text-black">
            Career Milestones ({visibleMilestones.length})
          </h3>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-0">
        {visibleMilestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="border-b transition-colors"
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center gap-6 py-6 px-4">
              {/* Icon */}
              <div
                className={`flex items-center justify-center rounded-full w-[60px] h-[60px] ${getCategoryColor(milestone.category)}`}
              >
                {getIcon(milestone.icon)}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-[18px] font-bold text-black">
                    {milestone.title}
                  </h4>
                  <span
                    className={`text-[12px] font-semibold px-3 py-1 rounded-full ${getCategoryColor(milestone.category)}`}
                  >
                    {milestone.category}
                  </span>
                </div>
                <p className="text-[15px] text-gray-600">
                  {milestone.description}
                </p>
                <span className="text-[14px] font-medium text-gray-500">
                  {milestone.date}
                </span>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden flex items-start gap-3 py-4 px-3">
              {/* Icon */}
              <div
                className={`flex items-center justify-center rounded-full w-[44px] h-[44px] flex-shrink-0 ${getCategoryColor(milestone.category)}`}
              >
                <div className="scale-75">{getIcon(milestone.icon)}</div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h4 className="text-[15px] font-bold text-black">
                  {milestone.title}
                </h4>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${getCategoryColor(milestone.category)}`}
                >
                  {milestone.category}
                </span>
                <p className="text-[13px] text-gray-600 line-clamp-2">
                  {milestone.description}
                </p>
                <span className="text-[12px] font-medium text-gray-500">
                  {milestone.date}
                </span>
              </div>
            </div>
          </div>
        ))}

        {visibleMilestones.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[16px] text-gray-500">
              No milestones found for the selected filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
