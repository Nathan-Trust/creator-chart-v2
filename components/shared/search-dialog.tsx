"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { stripUrl } from "@/util/text";
import { useGetRankings } from "@/hooks/useGetRankings";
import { useGetTopVideos } from "@/hooks/useGetVideoRankings";

interface SearchCreator {
  id: string;
  rank: number | null;
  name: string;
  verified: boolean;
  platforms: string[];
  cpiScore: number | null;
}

interface SearchVideo {
  id: string;
  rank: number;
  title: string;
  creator: string;
  verified: boolean;
  score: number | string;
  thumbnail?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const videoThumbnails = [
  "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
  "/c9d16bc2baf7fe3d693ca126dd7a838dc5a4b3da.png",
  "/ba79e0bf3d00ddf3f1221c52a300df4fe0fb3f0c.png",
];

export default function SearchDialog({
  open,
  onOpenChange,
}: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch data from real APIs
  const { rankings } = useGetRankings({ limit: 50 }, open);
  const { videos: rawVideos } = useGetTopVideos({ limit: 20 }, open);

  // Map API data to search-friendly shapes
  const allCreators: SearchCreator[] = useMemo(
    () =>
      rankings.map((r) => ({
        id: r.creatorId?._id ?? r._id,
        rank: r.rank ?? null,
        name: r.creatorId?.name ?? "Unknown",
        verified: r.creatorId?.isVerified ?? false,
        platforms: r.creatorId?.socialHandles
          ? Object.keys(r.creatorId.socialHandles).filter(
              (k) =>
                r.creatorId?.socialHandles?.[
                  k as keyof typeof r.creatorId.socialHandles
                ],
            )
          : [],
        cpiScore: r.scores?.cpi ? Math.round(r.scores.cpi) : null,
      })),
    [rankings],
  );

  const allVideos: SearchVideo[] = useMemo(
    () =>
      rawVideos.map((v) => ({
        id: v.video?.videoUrl ?? v._id ?? "",
        rank: v.rank,
        title: stripUrl(v.video?.title || "Untitled"),
        creator: v.creator?.name ?? "Unknown",
        verified: v.creator?.verified ?? false,
        score: v.score != null ? String(Math.round(v.score)) : "-",
        thumbnail: v.video?.thumbnailUrl,
      })),
    [rawVideos],
  );

  const quickNavItems = [
    { label: "Top 100 Creators", path: "/creators/top", icon: "👥" },
    { label: "Top 100 Videos", path: "/videos/top", icon: "🎬" },
    { label: "Top Viral Videos", path: "/", icon: "🔥" },
    { label: "Trending Creators", path: "/creators/trending", icon: "📈" },
  ];

  // Filter results based on search query
  const filteredCreators = useMemo(
    () =>
      allCreators.filter((creator) =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [allCreators, searchQuery],
  );

  const filteredVideos = useMemo(
    () =>
      allVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.creator.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [allVideos, searchQuery],
  );

  const showQuickNav = searchQuery.trim() === "";
  const showResults = searchQuery.trim() !== "";
  const totalResults = filteredCreators.length + filteredVideos.length;

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Removed useEffect for setSelectedIndex(0)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showQuickNav) {
      const maxIndex = quickNavItems.length - 1;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, maxIndex));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        router.push(quickNavItems[selectedIndex].path);
        onOpenChange(false);
        setSearchQuery("");
      }
    } else if (showResults) {
      const maxIndex = totalResults - 1;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, maxIndex));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        // Handle selection - you can add navigation logic here
        onOpenChange(false);
        setSearchQuery("");
      }
    }
  };

  const handleQuickNavClick = (path: string) => {
    router.push(path);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[700px] lg:w-[640px] p-0 gap-0 bg-white rounded-lg overflow-hidden"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search creators or videos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 text-[16px] outline-none text-black placeholder:text-gray-400"
          />
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              Esc
            </kbd>
          </div>
        </div>

        {/* Results Container */}
        <div className="max-h-[500px] overflow-y-auto">
          {/* Quick Navigation */}
          {showQuickNav && (
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                Quick Navigation
              </div>
              <div className="space-y-1">
                {quickNavItems.map((item, index) => (
                  <button
                    key={item.path}
                    onClick={() => handleQuickNavClick(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      selectedIndex === index
                        ? "bg-[#f8fafc]"
                        : "hover:bg-[#f8fafc]"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[16px] font-semibold text-black">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {showResults && (
            <div className="p-3">
              {/* Creators Section */}
              {filteredCreators.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Creators
                  </div>
                  <div className="space-y-1">
                    {filteredCreators.map((creator, index) => (
                      <div
                        key={creator.id}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${
                          selectedIndex === index
                            ? "bg-[#f8fafc]"
                            : "hover:bg-[#f8fafc]"
                        }`}
                        onClick={() => {
                          router.push(`/creator/${creator.id}`);
                          onOpenChange(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="w-[52px] h-[45px] relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src="/6ceea5221003e7bfa3126f43e08f71ecede73acf.png"
                            alt={creator.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[16px] font-bold text-black truncate">
                              {creator.name}
                            </span>
                            {creator.verified && (
                              <svg
                                width="18"
                                height="18"
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
                          <div className="flex items-center gap-1 mt-1">
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
                        <div className="flex items-center gap-2">
                          {creator.rank != null && (
                            <span className="text-sm text-gray-500">
                              #{creator.rank}
                            </span>
                          )}
                          {creator.cpiScore != null && (
                            <div className="bg-[#14532d] w-[40px] h-[34px] rounded flex items-center justify-center">
                              <span className="text-white text-[14px] font-bold">
                                {creator.cpiScore}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Section */}
              {filteredVideos.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Videos
                  </div>
                  <div className="space-y-1">
                    {filteredVideos.map((video, index) => (
                      <div
                        key={video.id}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${
                          selectedIndex === filteredCreators.length + index
                            ? "bg-[#f8fafc]"
                            : "hover:bg-[#f8fafc]"
                        }`}
                      >
                        <div className="w-[52px] h-[45px] relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              video.thumbnail ||
                              videoThumbnails[index % videoThumbnails.length]
                            }
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[16px] font-bold text-black truncate block">
                            {video.title}
                          </span>
                          <div className="flex items-center gap-2 min-w-0 mt-1">
                            <span className="text-[14px] font-medium text-gray-600 truncate">
                              {video.creator}
                            </span>
                            {video.verified && (
                              <Image
                                src="/aabc79871b0bf602773f24969eb8e5c15b9c8348.svg"
                                alt="verified"
                                width={16}
                                height={16}
                                className="flex-shrink-0"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            #{video.rank}
                          </span>
                          <div className="bg-[#14532d] w-[40px] h-[34px] rounded flex items-center justify-center">
                            <span className="text-white text-[14px] font-bold">
                              {video.score}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {totalResults === 0 && (
                <div className="px-3 py-12 text-center">
                  <p className="text-gray-500 text-[16px]">
                    No results found for &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
