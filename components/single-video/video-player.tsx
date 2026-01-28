"use client";

import React from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  thumbnailUrl?: string;
  videoUrl?: string;
  title: string;
  isMobile?: boolean;
}

export function VideoPlayer({
  thumbnailUrl,
  videoUrl,
  title,
  isMobile = false,
}: VideoPlayerProps) {
  return (
    <div className="w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black border-0 lg:border lg:border-[#e4e4e7] rounded-none lg:rounded-2xl shadow-none lg:shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Thumbnail */}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white/30 backdrop-blur-[2px] border border-white/60 flex items-center justify-center hover:bg-white/40 transition-all"
            aria-label="Play video"
          >
            <Play
              className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1"
              fill="white"
            />
          </button>
        </div>
      </div>

      {/* AI Hint - only show on desktop */}
      {!isMobile && (
        <div className="mt-5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#dcfce7] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
                fill="#16a34a"
              />
              <path
                d="M8 10L11 13L14 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#14532d]">
              Why is this trending?
            </p>
            <p className="text-sm text-[#166534]">
              Ask CreatorChart AI to analyze the viral factors of this video.
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
