"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as React.ComponentType<any>;

// ---------------------------------------------------------------------------
// Platform detection helpers
// ---------------------------------------------------------------------------
type Platform =
  | "youtube"
  | "facebook"
  | "tiktok"
  | "twitter"
  | "instagram"
  | "other";

function detectPlatform(url: string): Platform {
  try {
    const host = new URL(url).hostname.replace("www.", "").toLowerCase();
    if (host.includes("youtube.com") || host.includes("youtu.be"))
      return "youtube";
    if (host.includes("facebook.com") || host.includes("fb.watch"))
      return "facebook";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host.includes("twitter.com") || host.includes("x.com"))
      return "twitter";
    if (host.includes("instagram.com")) return "instagram";
  } catch {
    // not a valid URL
  }
  return "other";
}

// ---------------------------------------------------------------------------
// Twitter / X embed
// ---------------------------------------------------------------------------
function TwitterEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const loadWidget = useCallback(() => {
    if (!containerRef.current) return;
    const win = window as any;
    if (win.twttr?.widgets) {
      // Clear old content, build fresh tweet
      containerRef.current.innerHTML = "";
      win.twttr.widgets.createTweet(extractTweetId(url), containerRef.current, {
        theme: "light",
        align: "center",
        conversation: "none",
        dnt: true,
      });
    }
  }, [url]);

  useEffect(() => {
    const win = window as any;
    if (win.twttr?.widgets) {
      loadWidget();
      return;
    }
    // Load Twitter widget.js once
    if (!document.getElementById("twitter-wjs")) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = loadWidget;
      document.body.appendChild(script);
    } else {
      // Script tag exists but not loaded yet — poll
      const interval = setInterval(() => {
        if (win.twttr?.widgets) {
          clearInterval(interval);
          loadWidget();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loadWidget]);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black aspect-video">
      <div className="relative w-full h-full aspect-video flex items-center justify-center">
        <div ref={containerRef} className="w-full max-w-[550px]" />
      </div>
    </div>
  );
}

function extractTweetId(url: string): string {
  // Handles https://x.com/user/status/123 and https://twitter.com/user/status/123
  const match = url.match(/\/status\/(\d+)/);
  return match?.[1] ?? "";
}

// ---------------------------------------------------------------------------
// TikTok embed
// ---------------------------------------------------------------------------
function TikTokEmbed({ url }: { url: string }) {
  const videoId = extractTikTokId(url);
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black aspect-video">
      <div className="relative w-full h-full aspect-video">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en-US`}
          className="absolute inset-0 w-full h-full border-0"
          style={{ objectFit: "contain", background: "black" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function extractTikTokId(url: string): string {
  // Handles https://www.tiktok.com/@user/video/1234567890
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? "";
}

// ---------------------------------------------------------------------------
// Instagram embed
// ---------------------------------------------------------------------------
function InstagramEmbed({ url }: { url: string }) {
  // Normalise to embed URL: /reel/ABC123/ → /reel/ABC123/embed/
  let embedUrl = url.replace(/\/$/, "");
  if (!embedUrl.endsWith("/embed")) embedUrl += "/embed/";
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black aspect-video">
      <div className="relative w-full h-full aspect-video">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          style={{ objectFit: "contain", background: "black" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

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
  const [playing, setPlaying] = useState(false);
  const platform = videoUrl ? detectPlatform(videoUrl) : "other";

  // Platforms that ReactPlayer handles natively
  const useReactPlayer =
    platform === "youtube" || platform === "facebook" || platform === "other";

  const renderEmbed = () => {
    if (!videoUrl) return null;
    if (platform === "twitter") return <TwitterEmbed url={videoUrl} />;
    if (platform === "tiktok") return <TikTokEmbed url={videoUrl} />;
    if (platform === "instagram") return <InstagramEmbed url={videoUrl} />;
    // youtube / facebook / direct video files
    return (
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        playing
        style={{ position: "absolute", top: 0, left: 0, objectFit: "contain" }}
        config={{ file: { attributes: { style: { objectFit: "contain" } } } }}
      />
    );
  };

  return (
    <div className="w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black border-0 lg:border lg:border-[#e4e4e7] rounded-none lg:rounded-2xl shadow-none lg:shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden">
        {videoUrl && playing ? (
          renderEmbed()
        ) : (
          <>
            {/* Thumbnail */}
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-contain opacity-90"
              />
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white/30 backdrop-blur-[2px] border border-white/60 flex items-center justify-center hover:bg-white/40 transition-all"
                aria-label="Play video"
                onClick={() => videoUrl && setPlaying(true)}
              >
                <Play
                  className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1"
                  fill="white"
                />
              </button>
            </div>
          </>
        )}
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
