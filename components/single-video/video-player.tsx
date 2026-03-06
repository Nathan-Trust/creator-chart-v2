"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function isDirectMediaUrl(pathname: string): boolean {
  return /\.(mp4|webm|ogg|mov|m3u8|mpd|m4v|avi)(\?|$)/i.test(pathname);
}

function detectPlatform(url: string): Platform {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "").toLowerCase();

    // Direct media file URLs (e.g. CDN .mp4 links) should always use
    // the generic ReactPlayer, even if the hostname belongs to a social platform.
    if (isDirectMediaUrl(parsed.pathname)) return "other";

    if (host === "youtube.com" || host === "youtu.be") return "youtube";
    if (host === "facebook.com" || host === "fb.watch") return "facebook";
    if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return "tiktok";
    if (host === "twitter.com" || host === "x.com") return "twitter";
    if (host === "instagram.com") return "instagram";
  } catch {
    // not a valid URL
  }
  return "other";
}

// ---------------------------------------------------------------------------
// Helpers to extract IDs from social URLs
// ---------------------------------------------------------------------------
function extractTweetId(url: string): string {
  const match = url.match(/\/status\/(\d+)/);
  return match?.[1] ?? "";
}

function extractTikTokId(url: string): string {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? "";
}

function extractInstagramShortcode(url: string): string {
  // matches /reel/ABC123/ or /p/ABC123/
  const match = url.match(/\/(reel|p)\/([^/?]+)/);
  return match?.[2] ?? "";
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

  // Only treat the URL as valid if it looks like an actual URL
  const isValidUrl = !!videoUrl && /^https?:\/\//i.test(videoUrl);
  const platform = isValidUrl ? detectPlatform(videoUrl) : "other";
  const isDirectFile = isValidUrl && isDirectMediaUrl(videoUrl);

  const isSocialEmbed =
    isValidUrl &&
    (platform === "twitter" ||
      platform === "tiktok" ||
      platform === "instagram");

  const renderEmbed = () => {
    if (!isValidUrl) return null;

    // Direct media files (.mp4, .webm, etc.) — use native <video> element
    // for maximum compatibility with CDN URLs (Instagram, TikTok CDNs, etc.)
    if (isDirectFile) {
      return (
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      );
    }

    if (platform === "twitter") {
      const tweetId = extractTweetId(videoUrl);
      return (
        <iframe
          src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark`}
          className="border-0 rounded-xl"
          style={{ width: "100%", maxWidth: 550, height: 650 }}
          sandbox="allow-scripts allow-same-origin allow-popups"
          scrolling="no"
          allowFullScreen
        />
      );
    }

    if (platform === "tiktok") {
      const videoId = extractTikTokId(videoUrl);
      return (
        <iframe
          src={`https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=1`}
          className="border-0 rounded-xl"
          style={{ width: 325, height: 578 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          scrolling="no"
          allowFullScreen
        />
      );
    }

    if (platform === "instagram") {
      const shortcode = extractInstagramShortcode(videoUrl);
      const embedUrl = shortcode
        ? `https://www.instagram.com/reel/${shortcode}/embed/`
        : `${videoUrl.replace(/\/$/, "")}/embed/`;
      return (
        <iframe
          src={embedUrl}
          className="border-0 rounded-xl"
          style={{ width: "100%", maxWidth: 400, height: 550 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          scrolling="no"
          allowFullScreen
        />
      );
    }

    // youtube / facebook — use ReactPlayer
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
      {isSocialEmbed ? (
        /* Social embeds (Instagram, TikTok, X) — auto-sized, centered */
        <div className="w-full flex justify-center">{renderEmbed()}</div>
      ) : (
        /* YouTube / Facebook / direct — aspect-video with play button */
        <div className="relative w-full aspect-video bg-black border-0 lg:border lg:border-[#e4e4e7] rounded-none lg:rounded-2xl shadow-none lg:shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          {isValidUrl && playing ? (
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
                  onClick={() => isValidUrl && setPlaying(true)}
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
      )}

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
