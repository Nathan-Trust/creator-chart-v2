"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Share2, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  syncFiltersFromURL,
  getApiCountryCode,
} from "@/lib/stores/filter-store";
import { useGetRankings } from "@/hooks/useGetRankings";
import type { RankingEntryDto } from "@/services/ranking.service";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnnualCreator {
  id: string;
  rank: number;
  name: string;
  verified: boolean;
  imageUrl: string;
}

// ---------------------------------------------------------------------------
// Scope tabs
// ---------------------------------------------------------------------------

const SCOPES = [
  { label: "Nigeria", emoji: "🇳🇬", value: "Nigeria" },
  { label: "West Africa", emoji: "🌍", value: "West_Africa" },
  { label: "Africa", emoji: "🌍", value: "Africa" },
  { label: "Global", emoji: "🌎", value: "Global" },
] as const;

type ScopeValue = (typeof SCOPES)[number]["value"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapRankingToAnnual(
  entry: RankingEntryDto,
  index: number,
): AnnualCreator {
  const creator = entry.creatorId;
  const avatar =
    creator?.instagramMetrics?.avatarUrl ||
    creator?.xMetrics?.avatarUrl ||
    creator?.youtubeMetrics?.avatarUrl ||
    creator?.tiktokMetrics?.avatarUrl ||
    creator?.facebookMetrics?.avatarUrl ||
    "/6ceea5221003e7bfa3126f43e08f71ecede73acf.png";

  return {
    id: creator?._id ?? entry._id,
    rank: index + 1,
    name: creator?.name ?? "Unknown",
    verified: creator?.isVerified ?? false,
    imageUrl: avatar,
  };
}

const VerifyIcon = ({ size = 16 }: { size?: number }) => (
  <Image
    src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
    alt="Verified"
    width={size}
    height={size}
  />
);

const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AnnualRankingsClient() {
  const router = useRouter();
  const [activeScope, setActiveScope] = useState<ScopeValue>("Global");
  const [scopeOpen, setScopeOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Scroll-aware navbar visibility (for sticky scope tabs)
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

  // Map scope to API country filter
  const apiCountry = useMemo(() => {
    if (activeScope === "Global") return "Global";
    if (activeScope === "West_Africa") return "West_Africa";
    if (activeScope === "Africa") return "Africa";
    return activeScope;
  }, [activeScope]);

  // Fetch top 10 rankings for the selected scope
  const { rankings, isLoading } = useGetRankings(
    { country: getApiCountryCode(apiCountry), limit: 10 },
    true,
  );

  const creators: AnnualCreator[] = useMemo(
    () => rankings.slice(0, 10).map(mapRankingToAnnual),
    [rankings],
  );

  return (
    <div className="min-h-screen bg-white py-8 md:py-16 section-px">
      <div className="max-w-360 mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[34px] font-extrabold leading-tight md:leading-17.5 text-black mb-1 md:mb-2">
            CreatorCharts Annual Rankings {CURRENT_YEAR}
          </h1>
          <p className="text-[14px] md:text-[18px] font-medium text-black mb-4 md:mb-6">
            Official Year-End Performance Index — The Top 10 highest-ranked
            creators across each scope based on verified annual performance
            data.
          </p>
        </div>

        {/* Scope Filter - Sticky */}
        <div
          className="sticky z-40 bg-white flex flex-col transition-all duration-300"
          style={{ top: navbarVisible ? "88px" : "0px" }}
        >
          <div className="flex flex-wrap gap-3 items-center pb-4 pt-2">
            <Popover open={scopeOpen} onOpenChange={setScopeOpen}>
              <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/8 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-[14px] font-medium text-[#0b0b0b]">
                    {SCOPES.find((s) => s.value === activeScope)?.emoji}{" "}
                    {SCOPES.find((s) => s.value === activeScope)?.label}
                  </span>
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-1">
                  {SCOPES.map((scope) => (
                    <button
                      key={scope.value}
                      onClick={() => {
                        setActiveScope(scope.value);
                        setScopeOpen(false);
                      }}
                      className={`text-left px-3 py-2 text-[14px] rounded hover:bg-gray-100 text-black transition-colors ${
                        activeScope === scope.value
                          ? "bg-gray-100 font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {scope.emoji} {scope.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Rankings List */}
        <div className="space-y-0">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">Loading rankings...</p>
            </div>
          ) : creators.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No annual ranking data available yet.</p>
              <p className="text-sm mt-2">Try selecting a different scope</p>
            </div>
          ) : (
            creators.map((creator) => (
              <div key={creator.id} className={creator.rank === 1 ? "border-b border-[#d4af37]" : "border-b"}>
                {/* Desktop View */}
                <div
                  className={`hidden md:grid grid-cols-[80px_1fr_auto] gap-2 xl:gap-4 py-6 px-6 items-center hover:bg-gray-50 transition-colors cursor-pointer relative ${
                    creator.rank === 1 ? "hover:bg-[#fffdf5]" : ""
                  }`}
                  onClick={() => router.push(`/creator/${creator.id}`)}
                >
                  {/* Gold left accent for #1 */}
                  {creator.rank === 1 && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />
                  )}

                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-2">
                    {creator.rank === 1 ? (
                      <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center shadow-[0px_4px_12px_0px_rgba(212,175,55,0.4)]">
                        <span className="text-[20px] font-extrabold text-white">
                          1
                        </span>
                      </div>
                    ) : (
                      <span className="text-[18px] font-semibold text-[#0b0b0b]">
                        {creator.rank}
                      </span>
                    )}
                  </div>

                  {/* Creator Info Column */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={creator.imageUrl}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[16px] font-bold text-[#0b0b0b] hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator.id}`);
                          }}
                        >
                          {creator.name}
                        </span>
                        {creator.verified && <VerifyIcon size={16} />}
                      </div>
                      {creator.rank === 1 && (
                        <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed max-w-[500px]">
                          Dominating charts with consistent Top 10 presence and
                          highest aggregate cross-platform reach of{" "}
                          {CURRENT_YEAR}.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Share button */}
                  <div className="flex items-center">
                    {creator.rank === 1 ? (
                      <button
                        className="flex items-center gap-2 bg-black text-white rounded-md px-5 py-2.5 text-[14px] font-medium hover:bg-black/90 transition-colors shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                        Share Achievement
                      </button>
                    ) : (
                      <button
                        className="w-9 h-9 border border-black/8 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Share2 className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div
                  className={`md:hidden grid grid-cols-[36px_1fr_44px] gap-2.5 py-4 px-0 items-start cursor-pointer ${
                    creator.rank === 1 ? "relative" : ""
                  }`}
                  onClick={() => router.push(`/creator/${creator.id}`)}
                >
                  {/* Gold left accent for #1 */}
                  {creator.rank === 1 && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />
                  )}

                  {/* Rank Column */}
                  <div className="flex flex-col items-center gap-1.5 pt-1">
                    {creator.rank === 1 ? (
                      <div className="w-9 h-9 rounded-full bg-[#d4af37] flex items-center justify-center shadow-[0px_4px_12px_0px_rgba(212,175,55,0.4)]">
                        <span className="text-[14px] font-extrabold text-white">
                          1
                        </span>
                      </div>
                    ) : (
                      <span className="text-[15px] font-semibold text-[#0b0b0b]">
                        {creator.rank}
                      </span>
                    )}
                  </div>

                  {/* Creator Info Column */}
                  <div className="flex items-stretch gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={creator.imageUrl}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="text-[14px] font-bold text-[#0b0b0b] hover:underline cursor-pointer truncate"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/creator/${creator.id}`);
                          }}
                        >
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <div className="flex-shrink-0">
                            <VerifyIcon size={14} />
                          </div>
                        )}
                      </div>
                      {creator.rank === 1 && (
                        <p className="text-[12px] text-gray-500 leading-relaxed">
                          Top ranked creator of {CURRENT_YEAR}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Share Column */}
                  <div className="flex justify-end pt-1">
                    <button
                      className="w-9 h-9 border border-black/8 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Share2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
