"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  Users,
  Globe,
  Zap,
  Star,
  Flag,
  Rocket,
  BarChart3,
  Clock,
  Flame,
  Crown,
  Sparkles,
  CheckCircle2,
  History,
  Medal,
} from "lucide-react";

interface IdentityRecord {
  id: number;
  record: string;
  scope: string;
  scopeIcon?: "flag" | "globe" | "category";
  scopeFlag?: string; // emoji flag
  rank: string;
  period: string;
  status: "Active" | "Historical" | "Permanent";
  icon: string;
  category: string;
}

const mockRecords: IdentityRecord[] = [
  {
    id: 1,
    record: "Highest-Ranked Creator in Nigeria (2026)",
    scope: "Nigeria",
    scopeIcon: "flag",
    scopeFlag: "🇳🇬",
    rank: "#1",
    period: "2026",
    status: "Active",
    icon: "trophy",
    category: "Nigeria",
  },
  {
    id: 2,
    record: "Longest #1 Streak — Nigeria",
    scope: "Nigeria",
    scopeIcon: "flag",
    scopeFlag: "🇳🇬",
    rank: "8 weeks",
    period: "2025–2026",
    status: "Active",
    icon: "trending-up",
    category: "Nigeria",
  },
  {
    id: 3,
    record: "Most Weeks in Top 10 — Nigeria",
    scope: "Nigeria",
    scopeIcon: "flag",
    scopeFlag: "🇳🇬",
    rank: "42 weeks",
    period: "All-Time",
    status: "Historical",
    icon: "target",
    category: "Nigeria",
  },
  {
    id: 4,
    record: "First Nigerian Creator to Enter Global Top 50",
    scope: "Nigeria · Global",
    scopeIcon: "flag",
    scopeFlag: "🇳🇬",
    rank: "#47",
    period: "Week 18 · 2026",
    status: "Permanent",
    icon: "award",
    category: "Nigeria · Global",
  },
  {
    id: 5,
    record: "Youngest Creator to Reach Top 10 — Nigeria",
    scope: "Nigeria",
    scopeIcon: "flag",
    scopeFlag: "🇳🇬",
    rank: "Age 21",
    period: "2026",
    status: "Permanent",
    icon: "users",
    category: "Nigeria",
  },
  {
    id: 6,
    record: "Top African Creator Globally",
    scope: "Africa",
    scopeIcon: "globe",
    rank: "#6",
    period: "Week 22 · 2026",
    status: "Active",
    icon: "globe",
    category: "Africa",
  },
  {
    id: 7,
    record: "First West African Creator to Enter Global Top 20",
    scope: "West Africa",
    scopeIcon: "globe",
    rank: "#18",
    period: "Week 14 · 2026",
    status: "Permanent",
    icon: "award",
    category: "West Africa",
  },
  {
    id: 8,
    record: "Highest CPI Score Ever by an African Creator",
    scope: "Africa",
    scopeIcon: "globe",
    rank: "CPI 94.2",
    period: "2026",
    status: "Permanent",
    icon: "zap",
    category: "Africa",
  },
  {
    id: 9,
    record: "Most Countries Reached in One Chart Week",
    scope: "Global",
    scopeIcon: "globe",
    rank: "18 countries",
    period: "Week 9 · 2026",
    status: "Historical",
    icon: "flag",
    category: "Global",
  },
  {
    id: 10,
    record: "Highest-Ranked Comedy Creator Globally",
    scope: "Global",
    scopeIcon: "globe",
    rank: "#1",
    period: "2026",
    status: "Active",
    icon: "star",
    category: "Comedy · Global",
  },
  {
    id: 11,
    record: "First Tech Creator to Enter Global Top 30",
    scope: "Global",
    scopeIcon: "globe",
    rank: "#29",
    period: "Week 11 · 2025",
    status: "Permanent",
    icon: "rocket",
    category: "Tech · Global",
  },
  {
    id: 12,
    record: "Longest Charting Creator — Comedy",
    scope: "Comedy",
    scopeIcon: "category",
    rank: "64 weeks",
    period: "All-Time",
    status: "Historical",
    icon: "bar-chart",
    category: "Comedy",
  },
  {
    id: 13,
    record: "Most Weeks at #1 — Comedy",
    scope: "Comedy",
    scopeIcon: "category",
    rank: "12 weeks",
    period: "2026",
    status: "Active",
    icon: "trending-up",
    category: "Comedy",
  },
  {
    id: 14,
    record: "Fastest Rise to Top 10",
    scope: "Global",
    scopeIcon: "globe",
    rank: "3 weeks",
    period: "2026",
    status: "Permanent",
    icon: "flame",
    category: "Global",
  },
  {
    id: 15,
    record: "Biggest Week-over-Week CPI Jump",
    scope: "Global",
    scopeIcon: "globe",
    rank: "+14.6 CPI",
    period: "Week 7 · 2026",
    status: "Historical",
    icon: "bar-chart",
    category: "Global",
  },
  {
    id: 16,
    record: "Longest Continuous Chart Run",
    scope: "Global",
    scopeIcon: "globe",
    rank: "78 weeks",
    period: "All-Time",
    status: "Historical",
    icon: "clock",
    category: "Global",
  },
  {
    id: 17,
    record: "Most Top 10 Appearances (All-Time)",
    scope: "Global",
    scopeIcon: "globe",
    rank: "39 appearances",
    period: "All-Time",
    status: "Active",
    icon: "medal",
    category: "Global",
  },
  {
    id: 18,
    record: "First Creator to Debut at #1",
    scope: "Global",
    scopeIcon: "globe",
    rank: "#1 debut",
    period: "Week 1 · 2025",
    status: "Permanent",
    icon: "crown",
    category: "Global",
  },
  {
    id: 19,
    record: "First Creator from Nigeria on Global Chart",
    scope: "Nigeria · Global",
    scopeIcon: "flag",
    scopeFlag: "🇳🇬",
    rank: "#96",
    period: "Week 40 · 2024",
    status: "Permanent",
    icon: "flag",
    category: "Nigeria · Global",
  },
  {
    id: 20,
    record: "First Verified Creator to Reach CPI 90+",
    scope: "Global",
    scopeIcon: "globe",
    rank: "CPI 91.3",
    period: "2026",
    status: "Permanent",
    icon: "sparkles",
    category: "Global",
  },
];

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    trophy: Trophy,
    "trending-up": TrendingUp,
    target: Target,
    award: Award,
    users: Users,
    globe: Globe,
    zap: Zap,
    star: Star,
    flag: Flag,
    rocket: Rocket,
    "bar-chart": BarChart3,
    clock: Clock,
    flame: Flame,
    crown: Crown,
    sparkles: Sparkles,
    medal: Medal,
  };
  return iconMap[iconName] || Trophy;
};

const getIconBackground = (index: number) => {
  const colors = [
    "bg-[#f0fdf4]", // green
    "bg-[#f0fdf4]", // green
    "bg-[#eff8ff]", // blue
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#f0fdf4]", // green
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#eff8ff]", // blue
    "bg-[#f0fdf4]", // green
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#eff8ff]", // blue
    "bg-[#f0fdf4]", // green
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#eff8ff]", // blue
    "bg-[#eff8ff]", // blue
    "bg-[#f0fdf4]", // green
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#fffbeb]", // yellow/orange
    "bg-[#fffbeb]", // yellow/orange
  ];
  return colors[index % colors.length];
};

const getIconColor = (index: number) => {
  const colors = [
    "text-[#10b981]", // green
    "text-[#10b981]", // green
    "text-[#3b82f6]", // blue
    "text-[#f59e0b]", // yellow/orange
    "text-[#f59e0b]", // yellow/orange
    "text-[#10b981]", // green
    "text-[#f59e0b]", // yellow/orange
    "text-[#f59e0b]", // yellow/orange
    "text-[#3b82f6]", // blue
    "text-[#10b981]", // green
    "text-[#f59e0b]", // yellow/orange
    "text-[#3b82f6]", // blue
    "text-[#10b981]", // green
    "text-[#f59e0b]", // yellow/orange
    "text-[#3b82f6]", // blue
    "text-[#3b82f6]", // blue
    "text-[#10b981]", // green
    "text-[#f59e0b]", // yellow/orange
    "text-[#f59e0b]", // yellow/orange
    "text-[#f59e0b]", // yellow/orange
  ];
  return colors[index % colors.length];
};

const StatusBadge = ({ status }: { status: IdentityRecord["status"] }) => {
  const styles = {
    Active: {
      bg: "bg-[#f0fdf4]",
      border: "border-[rgba(22,163,74,0.2)]",
      text: "text-[#10b981]",
      icon: CheckCircle2,
    },
    Historical: {
      bg: "bg-[#eff8ff]",
      border: "border-[rgba(0,0,0,0.08)]",
      text: "text-[#94a3b8]",
      icon: History,
    },
    Permanent: {
      bg: "bg-[#fffbeb]",
      border: "border-[rgba(180,83,9,0.2)]",
      text: "text-[#b45309]",
      icon: Medal,
    },
  };

  const style = styles[status];
  const Icon = style.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${style.bg} ${style.border}`}
    >
      <Icon className={`w-2.5 h-2.5 ${style.text}`} />
      <span className={`text-xs font-medium ${style.text}`}>{status}</span>
    </div>
  );
};

export default function IdentityRecordsTable() {
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

  return (
    <div className="w-full">
      {/* Table Headers */}
      <div
        className="sticky z-40 backdrop-blur flex flex-col transition-all duration-300"
        style={{ top: navbarVisible ? "88px" : "0px" }}
      >
        {/* Desktop Headers */}
        <div className="hidden lg:grid grid-cols-[1fr_200px_150px_180px_150px] gap-4 border-b px-4 py-2 bg-[#f1f5f9]">
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            RECORD
          </div>
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-center">
            SCOPE
          </div>
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-center">
            RANK
          </div>
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-center">
            PERIOD
          </div>
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-center">
            STATUS
          </div>
        </div>

        {/* Mobile Headers */}
        <div className="lg:hidden grid grid-cols-[1fr_80px] gap-3 border-b px-0 py-2 bg-[#f1f5f9]">
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            RECORD
          </div>
          <div className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-center">
            STATUS
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-lg overflow-hidden">
        {mockRecords.map((record, index) => {
          const Icon = getIconComponent(record.icon);
          return (
            <div key={record.id} className="border-b last:border-b-0">
              {/* Desktop View */}
              <div className="hidden lg:grid grid-cols-[1fr_200px_150px_180px_150px] gap-4 py-5 px-4 items-center transition-colors hover:bg-gray-50">
                {/* Record info */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-md ${getIconBackground(index)}`}
                  >
                    <Icon className={`w-5 h-5 ${getIconColor(index)}`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-semibold text-[#0f1724]">
                      {record.record}
                    </span>
                    <span className="text-[13px] font-normal text-[#94a3b8]">
                      {record.category}
                    </span>
                  </div>
                </div>

                {/* Scope */}
                <div className="flex items-center justify-center gap-2">
                  {record.scopeFlag && (
                    <span className="text-base">{record.scopeFlag}</span>
                  )}
                  {record.scopeIcon === "globe" && (
                    <Globe className="w-3.5 h-3.5 text-[#0f1724]" />
                  )}
                  <span className="text-[14px] font-medium text-[#0f1724]">
                    {record.scope}
                  </span>
                </div>

                {/* Rank */}
                <div className="text-center">
                  <span className="text-[14px] font-semibold text-[#0f1724]">
                    {record.rank}
                  </span>
                </div>

                {/* Period */}
                <div className="text-center">
                  <span className="text-[14px] font-normal text-[#94a3b8]">
                    {record.period}
                  </span>
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <StatusBadge status={record.status} />
                </div>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden py-4 px-0">
                <div className="grid grid-cols-[1fr_80px] gap-3 items-start">
                  {/* Record info */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-md shrink-0 ${getIconBackground(index)}`}
                    >
                      <Icon className={`w-5 h-5 ${getIconColor(index)}`} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-[14px] font-semibold text-[#0f1724] break-words">
                        {record.record}
                      </span>
                      <span className="text-[12px] font-normal text-[#94a3b8]">
                        {record.category}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[12px] text-gray-600">
                        <span className="flex items-center gap-1">
                          {record.scopeFlag && (
                            <span className="text-sm">{record.scopeFlag}</span>
                          )}
                          {record.scopeIcon === "globe" && (
                            <Globe className="w-3 h-3" />
                          )}
                          <span className="font-medium text-black">
                            {record.scope}
                          </span>
                        </span>
                        <span>
                          Rank:{" "}
                          <span className="font-medium text-black">
                            {record.rank}
                          </span>
                        </span>
                        <span className="text-[#94a3b8]">{record.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex justify-end">
                    <StatusBadge status={record.status} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
