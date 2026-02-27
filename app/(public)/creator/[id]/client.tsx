"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Dot,
  TrendingUp,
  HelpCircle,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import { FastAverageColor } from "fast-average-color";
import { useThemeStore } from "@/lib/stores/theme-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChartsTable from "@/components/creator/charts-table";
import VideosTable from "@/components/creator/videos-table";
import MilestonesTable from "@/components/creator/milestones-table";
import CountriesTable from "@/components/creator/countries-table";
import IdentityRecordsTable from "@/components/creator/identity-records-table";
import { useGetCreatorProfileById } from "@/hooks/useGetCreatorProfileById";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";

// Verified check icon
const imgGroup =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14z' fill='%23E0E0E0'/%3E%3Cpath d='M4.5 7l2 2 3-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgUsa = "/31837ce8ddd2a679753c22bddb78a60dd3bafb4c.png";

// Social media icons for mobile
const imgYoutube =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M15.665 4.108a2.01 2.01 0 0 0-1.414-1.425C13.004 2.333 8 2.333 8 2.333s-5.004 0-6.251.35a2.01 2.01 0 0 0-1.414 1.425c-.347 1.257-.347 3.892-.347 3.892s0 2.635.347 3.892a2.01 2.01 0 0 0 1.414 1.425c1.247.35 6.251.35 6.251.35s5.004 0 6.251-.35a2.01 2.01 0 0 0 1.414-1.425c.347-1.257.347-3.892.347-3.892s0-2.635-.347-3.892zM6.5 10.167V5.833L10.5 8l-4 2.167z' fill='%236B7280'/%3E%3C/svg%3E";
const imgInstagram =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M8 1.44c2.136 0 2.389.008 3.233.047.78.036 1.203.166 1.485.276.373.145.64.318.92.598.28.28.453.547.598.92.11.282.24.705.276 1.485.039.844.047 1.097.047 3.233s-.008 2.389-.047 3.233c-.036.78-.166 1.203-.276 1.485a2.476 2.476 0 0 1-.598.92c-.28.28-.547.453-.92.598-.282.11-.705.24-1.485.276-.844.039-1.097.047-3.233.047s-2.389-.008-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.476 2.476 0 0 1-.92-.598 2.476 2.476 0 0 1-.598-.92c-.11-.282-.24-.705-.276-1.485-.039-.844-.047-1.097-.047-3.233s.008-2.389.047-3.233c.036-.78.166-1.203.276-1.485.145-.373.318-.64.598-.92.28-.28.547-.453.92-.598.282-.11.705-.24 1.485-.276.844-.039 1.097-.047 3.233-.047zM8 0C5.827 0 5.555.009 4.702.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76c-.198.51-.332 1.09-.372 1.942C.009 5.555 0 5.827 0 8s.009 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.332 1.942.372.853.039 1.125.048 3.298.048s2.445-.009 3.298-.048c.852-.04 1.433-.174 1.942-.372a3.917 3.917 0 0 0 1.417-.923c.445-.444.72-.89.923-1.417.198-.51.332-1.09.372-1.942.039-.853.048-1.125.048-3.298s-.009-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942a3.917 3.917 0 0 0-.923-1.417A3.917 3.917 0 0 0 13.24.42c-.51-.198-1.09-.332-1.942-.372C10.445.009 10.173 0 8 0zm0 3.892a4.108 4.108 0 1 0 0 8.216 4.108 4.108 0 0 0 0-8.216zm0 6.775a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334zm5.23-6.937a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z' fill='%236B7280'/%3E%3C/svg%3E";
const imgTwitter =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M12.6.75h2.454l-5.36 6.126L16 15.25h-4.937l-3.867-5.055L2.846 15.25H.392l5.733-6.552L0 .75h5.063l3.495 4.621L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z' fill='%236B7280'/%3E%3C/svg%3E";
const imgTiktok =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M11.5 0h-2.667v10.889c0 1.178-.955 2.133-2.133 2.133s-2.133-.955-2.133-2.133.955-2.133 2.133-2.133c.222 0 .444.033.667.111V6.089a4.825 4.825 0 0 0-.667-.044A4.811 4.811 0 0 0 1.889 10.889 4.811 4.811 0 0 0 6.7 15.733a4.811 4.811 0 0 0 4.8-4.844V5.556c.889.667 2 1.111 3.2 1.111V4c-1.778 0-3.2-1.778-3.2-4z' fill='%236B7280'/%3E%3C/svg%3E";

interface CreatorProfileClientProps {
  creatorId: string;
}

export default function CreatorProfileClient({
  creatorId,
}: CreatorProfileClientProps) {
  const { profile, isLoading, error } = useGetCreatorProfileById(creatorId);

  const { backgroundColor, setBackgroundColor } = useThemeStore();
  const [activeTab, setActiveTab] = useState<
    "charts" | "videos" | "milestone" | "countries" | "identity"
  >("charts");

  // Extract color from artist image on mount
  useEffect(() => {
    const extractImageColor = async () => {
      if (!profile) return;

      try {
        const fac = new FastAverageColor();
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        const imageSrc = "/610b3ca5eed1b6fdc6095c95d03192ac19d7d98d.jpg";
        img.src = imageSrc;

        console.log("Loading image for color extraction:", imageSrc);

        img.onload = async () => {
          try {
            const color = await fac.getColor(img);
            console.log("Extracted color:", color);

            // Get the dominant color and create a darker, more saturated version
            const r = color.value[0];
            const g = color.value[1];
            const b = color.value[2];

            // Convert to HSL to manipulate saturation and lightness
            const max = Math.max(r, g, b) / 255;
            const min = Math.min(r, g, b) / 255;
            const l = (max + min) / 2;

            let h = 0;
            let s = 0;

            if (max !== min) {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

              const rNorm = r / 255;
              const gNorm = g / 255;
              const bNorm = b / 255;

              switch (max) {
                case rNorm:
                  h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
                  break;
                case gNorm:
                  h = ((bNorm - rNorm) / d + 2) / 6;
                  break;
                case bNorm:
                  h = ((rNorm - gNorm) / d + 4) / 6;
                  break;
              }
            }

            // Create a dark, rich version: increase saturation, reduce lightness
            const newS = Math.min(s * 1.3, 0.7);
            const newL = 0.18;

            // Convert back to RGB
            const hslToRgb = (h: number, s: number, l: number) => {
              let r, g, b;
              if (s === 0) {
                r = g = b = l;
              } else {
                const hue2rgb = (p: number, q: number, t: number) => {
                  if (t < 0) t += 1;
                  if (t > 1) t -= 1;
                  if (t < 1 / 6) return p + (q - p) * 6 * t;
                  if (t < 1 / 2) return q;
                  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                  return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
              }
              return [
                Math.round(r * 255),
                Math.round(g * 255),
                Math.round(b * 255),
              ];
            };

            const [newR, newG, newB] = hslToRgb(h, newS, newL);
            const darkColor = `rgb(${newR}, ${newG}, ${newB})`;

            console.log("Setting background color:", darkColor);
            setBackgroundColor(darkColor);
          } catch (err) {
            console.error("Error extracting color:", err);
          }
        };

        img.onerror = (error) => {
          console.error("Error loading image:", error);
        };
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    extractImageColor();
  }, [setBackgroundColor, profile]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <FetchLoadingAndEmptyState
      isLoading={isLoading}
      data={profile ? 1 : 0}
      numberOfSkeleton={1}
      contentClassName="w-full block"
      skeleton={() => (
        <div className="bg-[#f3f2f3] flex flex-col items-center pb-[60px] pt-0 px-0 min-h-screen w-full">
          {/* Header Skeleton - Responsive */}
          <div className="flex flex-col min-h-[280px] md:min-h-[320px] lg:min-h-[380px] min-[1248px]:min-h-[450px] items-center justify-center mb-[-60px] overflow-hidden pb-[70px] pt-6 md:pt-8 lg:pt-10 min-[1248px]:pt-[28px] px-4 md:px-6 lg:px-8 min-[1248px]:px-0 relative w-full bg-gray-300 animate-pulse">
            <div className="flex flex-col min-[1248px]:flex-row items-center min-[1248px]:items-center max-w-[1200px] relative w-full min-[1248px]:w-[1200px] gap-3 md:gap-4 lg:gap-6 min-[1248px]:gap-12">
              {/* Image skeleton - Responsive */}
              <div className="relative shrink-0 pb-4 md:pb-5 lg:pb-6 min-[1248px]:pb-0">
                <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] min-[1248px]:w-[250px] min-[1248px]:h-[250px] bg-gray-400 rounded-[6px] min-[1248px]:rounded-sm shadow-lg" />
              </div>

              {/* Text skeletons - Responsive */}
              <div className="flex flex-col items-center min-[1248px]:items-start gap-2 md:gap-2.5 lg:gap-3">
                {/* Verified badge skeleton */}
                <div className="h-6 md:h-7 w-32 md:w-36 bg-gray-400/80 rounded-full" />
                {/* Name skeleton */}
                <div className="h-8 md:h-10 lg:h-12 min-[1248px]:h-14 w-48 md:w-56 lg:w-64 min-[1248px]:w-80 bg-gray-400 rounded" />
                {/* Followers skeleton */}
                <div className="h-4 md:h-5 w-56 md:w-64 lg:w-72 bg-gray-400/80 rounded" />
                {/* Category badge skeleton */}
                <div className="h-8 md:h-9 w-24 md:w-28 bg-gray-400/80 rounded-full" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton - Responsive */}
          <div className="w-full px-4 md:px-6 lg:px-8 min-[1248px]:px-0 max-w-[1200px] min-[1248px]:w-[1200px] mb-[-60px] relative">
            {/* Status Card - Mobile/Tablet skeleton */}
            <div className="min-[1248px]:hidden bg-white border border-[rgba(0,0,0,0.08)] p-4 md:p-5 lg:p-6 rounded-[8px] shadow animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-24 bg-gray-300 rounded" />
                  <div className="h-5 w-20 bg-gray-300 rounded" />
                </div>
                <div className="h-10 w-32 bg-gray-300 rounded-full" />
              </div>
            </div>

            {/* Desktop toolbar skeleton */}
            <div className="hidden min-[1248px]:flex absolute bg-white border border-[rgba(0,0,0,0.08)] items-center justify-between left-[24px] px-[25px] py-[17px] right-[24px] rounded-[8px] shadow top-0 animate-pulse">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
                <div className="bg-gray-300 h-8 w-px" />
                <div className="h-4 w-96 bg-gray-300 rounded" />
              </div>
              <div className="h-10 w-36 bg-gray-300 rounded-full" />
            </div>

            {/* Mobile/Tablet Content Layout */}
            <div className="min-[1248px]:hidden flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8">
              {/* This Week Charts skeleton */}
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="h-6 w-36 bg-gray-300 rounded" />
                <div className="bg-white rounded-[8px] shadow p-4 md:p-5 space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="h-4 w-32 bg-gray-300 rounded" />
                      <div className="h-6 w-12 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance skeleton */}
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="h-6 w-40 bg-gray-300 rounded" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white p-4 md:p-5 rounded-[8px] shadow animate-pulse"
                    >
                      <div className="h-3 w-20 bg-gray-300 rounded mb-3" />
                      <div className="h-7 w-16 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Content Layout */}
            <div className="hidden min-[1248px]:flex flex-col gap-8 mt-24">
              {/* Desktop grid - Two columns */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex flex-col gap-8">
                  {/* This Week Charts skeleton */}
                  <div className="flex flex-col gap-4">
                    <div className="h-6 w-36 bg-gray-300 rounded" />
                    <div className="bg-white rounded-[8px] shadow p-6 space-y-4 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div className="h-4 w-40 bg-gray-300 rounded" />
                          <div className="h-6 w-12 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chart Performance skeleton */}
                  <div className="flex flex-col gap-4">
                    <div className="h-6 w-44 bg-gray-300 rounded" />
                    <div className="bg-white rounded-[8px] shadow p-6 space-y-4 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <div className="h-4 w-32 bg-gray-300 rounded" />
                          <div className="h-4 w-24 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-8">
                  {/* Performance skeleton */}
                  <div className="flex flex-col gap-4">
                    <div className="h-6 w-40 bg-gray-300 rounded" />
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-white p-5 rounded-[8px] shadow animate-pulse"
                        >
                          <div className="h-3 w-24 bg-gray-300 rounded mb-3" />
                          <div className="h-7 w-20 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Media skeleton */}
                  <div className="flex flex-col gap-4">
                    <div className="h-6 w-36 bg-gray-300 rounded" />
                    <div className="bg-white rounded-[8px] shadow p-6 space-y-3 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full" />
                          <div className="h-4 w-32 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      emptyState={
        <div className="bg-[#f3f2f3] flex flex-col items-center justify-center min-h-screen w-full p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Creator Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              Unable to load creator profile. Please try again later.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      }
    >
      {profile && (
        <div className="bg-[#f3f2f3] flex flex-col items-center pb-[60px] pt-0 px-0 min-h-screen w-full">
          {/* Header - Hero Section */}
          <div
            className="flex flex-col min-h-[280px] md:min-h-[320px] lg:min-h-[380px] min-[1248px]:min-h-[450px] min-[1248px]:h-[450px] items-center justify-center mb-[-60px] overflow-hidden pb-[70px] pt-6 md:pt-8 lg:pt-10 min-[1248px]:pt-[28px] px-4 md:px-6 lg:px-8 min-[1248px]:px-0 relative w-full transition-colors duration-1000"
            style={{ backgroundColor }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0" />

            {/* Unified Hero Layout - Responsive */}
            <div className="flex flex-col min-[1248px]:flex-row items-center min-[1248px]:items-center max-w-[1200px] relative w-full min-[1248px]:w-[1200px] gap-3 md:gap-4 lg:gap-6 min-[1248px]:gap-12">
              {/* Edit Button - Desktop */}
              <a
                href={`/creator/${creatorId}/edit`}
                className="hidden min-[1248px]:flex absolute -top-10 right-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full items-center gap-2 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span className="font-medium text-sm">Edit</span>
              </a>
              {/* Edit Button - Mobile/Tablet */}
              <a
                href={`/creator/${creatorId}/edit`}
                className="min-[1248px]:hidden absolute top-2 right-4 md:top-3 md:right-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2 transition-colors z-10"
              >
                <Pencil className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="font-medium text-xs md:text-sm">Edit</span>
              </a>
              {/* Artist Image - Responsive */}
              <div className="relative shrink-0 pb-4 md:pb-5 lg:pb-6 min-[1248px]:pb-0">
                <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] min-[1248px]:w-[250px] min-[1248px]:h-[250px] rounded-[6px] min-[1248px]:rounded-sm overflow-hidden shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] min-[1248px]:shadow-none">
                  <Image
                    src="/610b3ca5eed1b6fdc6095c95d03192ac19d7d98d.jpg"
                    alt={profile.name}
                    width={250}
                    height={250}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Artist Info - Responsive */}
              <div className="flex flex-col items-center min-[1248px]:items-start relative space-y-2 md:space-y-2.5 lg:space-y-3 min-[1248px]:space-y-3">
                {/* Verified Badge */}
                {profile.isVerified && (
                  <div className="bg-[rgba(16,185,129,0.2)] min-[1248px]:bg-[#14532d] border border-[rgba(16,185,129,0.3)] min-[1248px]:border-0 flex gap-1 items-center px-[9px] md:px-[10px] lg:px-[11px] min-[1248px]:px-[12px] py-[5px] min-[1248px]:py-[4px] rounded-full">
                    <CheckCircle2
                      size={12}
                      className="text-[#34d399] min-[1248px]:text-white md:w-[14px] md:h-[14px]"
                    />
                    <span className="font-semibold min-[1248px]:font-medium text-[11px] md:text-[11px] lg:text-[12px] min-[1248px]:text-[12px] text-[#34d399] min-[1248px]:text-white">
                      Verified Creator
                    </span>
                  </div>
                )}

                {/* Artist Name with Verified Icon */}
                <div className="flex items-center gap-[6px] md:gap-2 min-[1248px]:gap-2">
                  <h1 className="font-bold min-[1248px]:font-extrabold text-[24px] md:text-[32px] lg:text-[40px] min-[1248px]:text-[54px] text-white text-center min-[1248px]:text-left min-[1248px]:tracking-[-1.92px] min-[1248px]:leading-none">
                    {profile.name}
                  </h1>
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px] min-[1248px]:w-[55px] min-[1248px]:h-[55px] flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.418 5.643C15.2801 5.42264 15.0769 5.25076 14.8367 5.15128C14.5966 5.0518 14.3313 5.02968 14.078 5.088L12.28 5.501C12.0957 5.54335 11.9043 5.54335 11.72 5.501L9.922 5.088C9.66866 5.02968 9.40345 5.0518 9.16327 5.15128C8.9231 5.25076 8.71991 5.42264 8.582 5.643L7.602 7.207C7.502 7.367 7.367 7.502 7.207 7.603L5.643 8.583C5.42302 8.72079 5.25139 8.92365 5.15193 9.16341C5.05248 9.40318 5.03013 9.66796 5.088 9.921L5.501 11.721C5.5432 11.9049 5.5432 12.0961 5.501 12.28L5.088 14.079C5.02991 14.3322 5.05214 14.5972 5.15161 14.8372C5.25107 15.0771 5.42283 15.2801 5.643 15.418L7.207 16.398C7.367 16.498 7.502 16.633 7.603 16.793L8.583 18.357C8.865 18.808 9.403 19.031 9.922 18.912L11.72 18.499C11.9043 18.4566 12.0957 18.4566 12.28 18.499L14.079 18.912C14.3322 18.9701 14.5972 18.9479 14.8372 18.8484C15.0771 18.7489 15.2801 18.5772 15.418 18.357L16.398 16.793C16.498 16.633 16.633 16.498 16.793 16.398L18.358 15.418C18.5782 15.2799 18.7499 15.0767 18.8492 14.8365C18.9484 14.5964 18.9704 14.3312 18.912 14.078L18.5 12.28C18.4576 12.0957 18.4576 11.9043 18.5 11.72L18.913 9.921C18.9712 9.66792 18.9491 9.40299 18.8498 9.16303C18.7505 8.92307 18.579 8.71999 18.359 8.582L16.794 7.602C16.6342 7.50182 16.4992 7.36678 16.399 7.207L15.418 5.643ZM14.915 9.77C14.9769 9.65627 14.9922 9.52298 14.9577 9.39817C14.9233 9.27337 14.8418 9.16678 14.7304 9.10084C14.619 9.0349 14.4864 9.01475 14.3604 9.04462C14.2344 9.07449 14.1249 9.15206 14.055 9.261L11.44 13.687L9.861 12.175C9.81416 12.1269 9.75811 12.0887 9.69619 12.0628C9.63428 12.0368 9.56777 12.0236 9.50063 12.0239C9.43349 12.0241 9.36709 12.038 9.30541 12.0645C9.24372 12.091 9.188 12.1296 9.14158 12.1781C9.09516 12.2266 9.05898 12.284 9.03521 12.3468C9.01143 12.4096 9.00054 12.4765 9.0032 12.5436C9.00585 12.6107 9.02198 12.6766 9.05064 12.7373C9.0793 12.798 9.11989 12.8523 9.17 12.897L11.204 14.846C11.2584 14.8981 11.3239 14.9371 11.3956 14.9603C11.4673 14.9835 11.5432 14.9902 11.6178 14.9799C11.6925 14.9696 11.7638 14.9426 11.8265 14.9009C11.8892 14.8592 11.9417 14.8038 11.98 14.739L14.915 9.77Z"
                      fill="#2078EC"
                    />
                  </svg>
                </div>

                {/* Followers */}
                <p className="text-[13px] md:text-[14px] lg:text-[15px] min-[1248px]:text-base text-white/80 min-[1248px]:text-white text-center min-[1248px]:text-left flex items-center gap-1">
                  <span className="min-[1248px]:hidden inline-flex items-center gap-1">
                    {profile.followerCount ?? 0} followers
                  </span>
                  <span className="hidden min-[1248px]:inline-flex items-center gap-1">
                    {profile.followerCount ?? 0} followers
                  </span>
                </p>

                {/* Genre Tag */}
                <div className="bg-[rgba(255,255,255,0.2)] flex items-center px-[12px] md:px-[14px] lg:px-[16px] py-[4px] md:py-[5px] lg:py-[6px] rounded-full mb-4 min-[1248px]:mb-6">
                  <span className="font-normal min-[1248px]:font-medium text-[12px] md:text-[13px] lg:text-[14px] text-white">
                    {profile.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full px-4 md:px-6 lg:px-8 min-[1248px]:px-0 max-w-[1200px] mb-[-60px] relative min-[1248px]:w-[1200px]">
            {/* Status Card - Mobile/Tablet */}
            <div className="min-[1248px]:hidden bg-white border border-[rgba(0,0,0,0.08)] flex items-center justify-between p-4 md:p-5 lg:p-6 rounded-[8px] md:rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-1">
                <span className="font-normal text-[11px] md:text-[12px] lg:text-[13px] text-[#8b898b] uppercase tracking-[0.5px]">
                  Profile Status
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[14px] md:text-[15px] lg:text-[16px] text-[#111214]">
                    {profile.isVerified ? "Verified" : "Unverified"}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
                    src={imgGroup}
                  />
                </div>
              </div>
              <button className="bg-black flex items-center justify-center px-5 md:px-6 lg:px-7 py-[10px] md:py-[11px] lg:py-[12px] rounded-full">
                <span className="font-bold text-[14px] md:text-[15px] text-white">
                  Follow Creator
                </span>
              </button>
            </div>

            {/* Management Toolbar - Desktop */}
            {!profile.isVerified && (
              <div className="hidden min-[1248px]:flex absolute bg-white border border-[rgba(0,0,0,0.08)] items-center justify-between left-[24px] px-[25px] py-[17px] right-[24px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] top-0">
                <div className="relative">
                  <div className="flex gap-[16px] items-center">
                    {/* Profile Status */}
                    <div className="flex flex-col items-start">
                      <div className="flex flex-col items-start w-full">
                        <span className="font-medium text-[14px] text-[#9b968f]">
                          Profile Status
                        </span>
                      </div>
                      <div className="flex items-center w-full">
                        <span className="font-bold text-[14px] text-[#222]">
                          Unverified
                        </span>
                        <div className="flex items-center justify-center ml-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt=""
                            className="w-[14px] h-[14px]"
                            src={imgGroup}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="bg-[rgba(0,0,0,0.08)] h-[32px] w-px" />

                    {/* Claim Account Button */}
                    <button className="flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[99px] hover:bg-gray-50 transition-colors">
                      <span className="font-bold text-[14px] text-[#222]">
                        Claim your profile to confirm ownership and unlock
                        exclusive features.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="relative">
                  <div className="flex items-center gap-1">
                    <button className="bg-white border border-[rgba(0,0,0,0.08)] flex gap-[8px] items-center justify-center px-[21px] py-[11px] rounded-[99px] hover:bg-gray-50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <span className="font-bold text-[14px] text-[#1a1a1a]">
                        Claim Account
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {profile.isVerified && (
              <div className="hidden min-[1248px]:flex absolute bg-white border border-[rgba(0,0,0,0.08)] items-center justify-between left-[24px] px-[25px] py-[17px] right-[24px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] top-0">
                <div className="relative">
                  <div className="flex gap-[16px] items-center">
                    {/* Profile Status */}
                    <div className="flex flex-col items-start">
                      <div className="flex flex-col items-start w-full">
                        <span className="font-medium text-[14px] text-[#9b968f]">
                          Profile Status
                        </span>
                      </div>
                      <div className="flex items-center w-full">
                        <span className="font-bold text-[14px] text-[#222]">
                          {profile.isVerified ? "Verified" : "Unverified"}
                        </span>
                        <div className="flex items-center justify-center ml-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt=""
                            className="w-[14px] h-[14px]"
                            src={imgGroup}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="relative">
                  <div className="flex items-center gap-1">
                    {!profile.isVerified && (
                      <button className="bg-white border border-[rgba(0,0,0,0.08)] flex gap-[8px] items-center justify-center px-[21px] py-[11px] rounded-[99px] hover:bg-gray-50 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <span className="font-bold text-[14px] text-[#1a1a1a]">
                          Get Verified
                        </span>
                      </button>
                    )}

                    <button className="bg-black border border-[rgba(0,0,0,0.08)] flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[99px] hover:bg-black/75 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <span className="font-bold text-[14px] text-white">
                        Follow Creator
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile/Tablet Content Layout */}
            <div className="min-[1248px]:hidden flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8">
              {/* This Week Charts - Mobile */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111214]">
                  This Week Charts
                </h2>
                <div className="bg-white flex flex-col rounded-[6px] md:rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] px-4 md:px-5 lg:px-6 pt-1 pb-4 md:pb-5">
                  {[
                    { chart_name: "Global Comedy Chart", rank: 3 },
                    { chart_name: "US Comedy Chart", rank: 1 },
                    { chart_name: "Rising Stars", rank: 5 },
                  ].map((chart, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-3 md:py-4 ${
                        index < 2 ? "border-b border-[#e9e7e8]" : ""
                      }`}
                    >
                      <span className="text-[14px] md:text-[15px] lg:text-[16px] text-[#111214]">
                        {chart.chart_name}
                      </span>
                      <span className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111214]">
                        #{chart.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance (30d) - Mobile */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111214]">
                  Performance (30d)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {/* Average Views */}
                  <div className="bg-white flex flex-col gap-2 p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b]">
                      Average Views
                    </span>
                    <span className="font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#111214]">
                      {formatNumber(
                        profile.performance_30d?.average_views ?? 0,
                      )}
                    </span>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#e5e7eb]">
                      {profile.performance_30d?.views_trend}
                    </span>
                  </div>
                  {/* Engagement Rate */}
                  <div className="bg-white flex flex-col gap-2 p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b]">
                      Engagement Rate
                    </span>
                    <span className="font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#111214]">
                      {profile.performance_30d?.engagement_rate}%
                    </span>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#3a323f]">
                      {profile.performance_30d?.engagement_trend}
                    </span>
                  </div>
                  {/* 30d Growth */}
                  <div className="bg-[#ecfdf5] flex flex-col gap-2 p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b]">
                      30d Growth
                    </span>
                    <span className="font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#111214]">
                      {Math.round(profile.performance_30d?.growth_30d ?? 0)}%
                    </span>
                    <div className="flex items-center gap-[2px]">
                      <TrendingUp className="w-3 h-3 text-[#10b981]" />
                      <span className="font-medium text-[11px] md:text-[12px] text-[#3a323f]">
                        {profile.performance_30d?.growth_trend}
                      </span>
                    </div>
                  </div>
                  {/* Posts (30d) */}
                  <div className="bg-white flex flex-col gap-2 p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b]">
                      Posts (30d)
                    </span>
                    <span className="font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#111214]">
                      {profile.performance_30d?.posts_30d}
                    </span>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#6b7280]">
                      {profile.performance_30d?.posts_per_day} / day
                    </span>
                  </div>
                </div>
              </div>

              {/* Artist Info - Mobile */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111214]">
                  Artist Info
                </h2>
                <div className="bg-white flex flex-col gap-4 md:gap-5 p-4 md:p-5 lg:p-6 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]">
                  {/* Nationality */}
                  <div className="flex flex-col gap-[6px] md:gap-2">
                    <span className="text-[10px] md:text-[11px] lg:text-[12px] text-[#8b898b] uppercase tracking-[0.5px]">
                      Nationality
                    </span>
                    <div className="flex gap-2 items-center">
                      <div className="h-[10.5px] md:h-[12px] relative rounded-[2px] w-[20px] md:w-[24px] overflow-hidden">
                        <Image
                          alt={profile.country}
                          src={imgUsa}
                          width={24}
                          height={14}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-[14px] md:text-[15px] lg:text-[16px] text-[#111214]">
                        {profile.country}
                      </span>
                    </div>
                  </div>
                  {/* Social Media */}
                  <div className="flex flex-col gap-[6px] md:gap-2">
                    <span className="text-[10px] md:text-[11px] lg:text-[12px] text-[#8b898b] uppercase tracking-[0.5px]">
                      Social Media
                    </span>
                    <div className="flex gap-3 md:gap-4">
                      {profile.socialHandles?.youtube && (
                        <a
                          href={profile.socialHandles?.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f3f4f6] flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="YouTube"
                            className="w-4 h-4 md:w-5 md:h-5"
                            src={imgYoutube}
                          />
                        </a>
                      )}
                      {profile.socialHandles?.instagram && (
                        <a
                          href={profile.socialHandles?.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f3f4f6] flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Instagram"
                            className="w-4 h-4 md:w-5 md:h-5"
                            src={imgInstagram}
                          />
                        </a>
                      )}
                      {profile.socialHandles?.twitter && (
                        <a
                          href={profile.socialHandles?.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f3f4f6] flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Twitter"
                            className="w-4 h-4 md:w-5 md:h-5"
                            src={imgTwitter}
                          />
                        </a>
                      )}
                      {profile.socialHandles?.tiktok && (
                        <a
                          href={profile.socialHandles?.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f3f4f6] flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="TikTok"
                            className="w-4 h-4 md:w-5 md:h-5"
                            src={imgTiktok}
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Performance - Mobile */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#111214]">
                  Chart Performance
                </h2>
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-4 min-[1248px]:hidden">
                  {/* Peak Rank */}
                  <div className="bg-[#1f2937] flex flex-col justify-between min-w-[140px] md:min-w-0 h-[120px] md:h-[130px] p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex-shrink-0 md:flex-shrink">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] md:text-[13px] text-[#9ca3af]">
                        Peak Rank
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-[20px] md:text-[22px] text-white">
                          #{profile.chart_performance?.peak_rank}
                        </span>
                        <span className="text-[12px] text-[#9ca3af]">
                          {profile.chart_performance?.peak_rank_scope}
                        </span>
                      </div>
                    </div>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#d1d5db] leading-tight">
                      Highest position reached
                    </span>
                  </div>
                  {/* Weeks on Chart */}
                  <div className="bg-white flex flex-col justify-between min-w-[140px] md:min-w-0 h-[120px] md:h-[130px] p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex-shrink-0 md:flex-shrink">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b]">
                      Weeks on Chart
                    </span>
                    <span className="font-bold text-[20px] md:text-[22px] text-[#111214]">
                      {profile.chart_performance?.weeks_on_chart}
                    </span>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#6b7280]">
                      Total weeks ranked
                    </span>
                  </div>
                  {/* Top 10 Appearances */}
                  <div className="bg-white flex flex-col justify-between min-w-[140px] md:min-w-0 h-[120px] md:h-[130px] p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex-shrink-0 md:flex-shrink">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b] leading-tight">
                      Top 10 Appearances
                    </span>
                    <span className="font-bold text-[20px] md:text-[22px] text-[#111214]">
                      {profile.chart_performance?.top_10_appearances}
                    </span>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#6b7280]">
                      Weeks inside Top 10
                    </span>
                  </div>
                  {/* Peak CPI Score */}
                  <div className="bg-white flex flex-col justify-between min-w-[140px] md:min-w-0 h-[120px] md:h-[130px] p-4 md:p-5 rounded-[6px] md:rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex-shrink-0 md:flex-shrink">
                    <span className="text-[12px] md:text-[13px] text-[#8b898b]">
                      Peak CPI Score
                    </span>
                    <div className="flex items-end gap-1">
                      <span className="font-bold text-[20px] md:text-[22px] text-[#111214]">
                        {Math.round(
                          profile.chart_performance?.peak_cpi_score ?? 0,
                        )}
                      </span>
                      <span className="bg-[#ecfdf5] text-[#10b981] font-bold text-[12px] px-1 py-0.5 rounded">
                        +
                        {Math.round(profile.chart_performance?.cpi_change ?? 0)}
                      </span>
                    </div>
                    <span className="font-medium text-[11px] md:text-[12px] text-[#6b7280]">
                      Composite Score
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artist Details Grid - Desktop Only */}
            <div className="hidden min-[1248px]:flex gap-[32px] items-start left-[24px] right-[24px] mt-[104px]">
              {/* Left: Profile Bio/Identity */}
              <div className="flex flex-col gap-[24px] items-start w-[300px]">
                <h2 className="font-bold text-[20px] text-[#222]">
                  This Week Charts
                </h2>

                <div className="bg-white flex flex-col gap-[16px] items-start p-[24px] rounded-[8px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full">
                  <div className="flex flex-col items-start w-full">
                    {[
                      { chart_name: "Global Comedy Chart", rank: 3 },
                      { chart_name: "US Comedy Chart", rank: 1 },
                      { chart_name: "Rising Stars", rank: 5 },
                    ].map((chart, index) => (
                      <div
                        key={index}
                        className="flex gap-[8px] items-center justify-between w-full"
                      >
                        <p className="font-normal text-[15px] text-black ">
                          {chart.chart_name}
                        </p>
                        <p className="font-bold text-[24px] text-black">
                          #{chart.rank}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <h2 className="font-bold text-[20px] text-[#222]">
                  Artist Info
                </h2>

                <div className="bg-white flex flex-col gap-[16px] items-start p-[24px] rounded-[8px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full">
                  {/* Nationality */}
                  <div className="flex flex-col items-start w-full">
                    <span className="font-medium text-[12px] text-[#9b968f] mb-2">
                      NATIONALITY
                    </span>
                    <div className="flex gap-[8px] items-center w-full">
                      <div className="h-[10.5px] relative rounded-[2px] w-[20px] overflow-hidden">
                        <Image
                          alt={profile.country}
                          src={imgUsa}
                          width={20}
                          height={11}
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-[16px] text-[#222]">
                        {profile.country}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#f3efed] h-px w-full" />

                  {/* Social Media */}
                  <div className="flex flex-col items-start w-full">
                    <span className="font-medium text-[12px] text-[#9b968f] mb-2">
                      SOCIAL MEDIA
                    </span>
                    <div className="flex gap-[8px] items-start w-full">
                      {profile.socialHandles?.youtube && (
                        <a
                          href={profile.socialHandles?.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="YouTube"
                            className="w-[18px] h-[18px]"
                            src={imgYoutube}
                          />
                        </a>
                      )}
                      {profile.socialHandles?.instagram && (
                        <a
                          href={profile.socialHandles?.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Instagram"
                            className="w-[18px] h-[18px]"
                            src={imgInstagram}
                          />
                        </a>
                      )}
                      {profile.socialHandles?.tiktok && (
                        <a
                          href={profile.socialHandles?.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="TikTok"
                            className="w-[18px] h-[18px]"
                            src={imgTiktok}
                          />
                        </a>
                      )}
                      {profile.socialHandles?.twitter && (
                        <a
                          href={profile.socialHandles?.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Twitter"
                            className="w-[18px] h-[18px]"
                            src={imgTwitter}
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Stats & Performance */}
              <div className="flex flex-col gap-[32px] items-start flex-1">
                {/* Performance Section */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex gap-[12px] items-center w-full">
                    <h3 className="font-bold text-[20px] text-[#222]">
                      Performance (30d)
                    </h3>
                    <div className="bg-[rgba(0,0,0,0.08)] flex-1 h-px" />
                  </div>

                  <div className="flex gap-[16px] items-start justify-center w-full">
                    {/* Average Views */}
                    <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        Average Views
                      </span>
                      <span className="font-bold text-[24px] text-[#222]">
                        {formatNumber(
                          profile.performance_30d?.average_views ?? 0,
                        )}
                      </span>
                      <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                        {profile.performance_30d?.views_trend}
                      </span>
                    </div>

                    {/* Engagement Rate */}
                    <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        Engagement Rate
                      </span>
                      <span className="font-bold text-[24px] text-[#222]">
                        {profile.performance_30d?.engagement_rate}%
                      </span>
                      <span className="font-semibold text-[12px] text-[#7cc24a] mt-1">
                        {profile.performance_30d?.engagement_trend}
                      </span>
                    </div>

                    {/* 30d Growth */}
                    <div className="bg-[#f0fdf4] border border-[#dcfce7] flex-1 flex flex-col gap-[4px] items-start p-[17px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        30d Growth
                      </span>
                      <span className="font-bold text-[24px] text-[#222]">
                        {Math.round(profile.performance_30d?.growth_30d ?? 0)}%
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-[#7cc24a]" />
                        <span className="font-semibold text-[12px] text-[#7cc24a]">
                          {profile.performance_30d?.growth_trend}
                        </span>
                      </div>
                    </div>

                    {/* Posts (30d) */}
                    <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        Posts (30d)
                      </span>
                      <span className="font-bold text-[24px] text-[#222]">
                        {profile.performance_30d?.posts_30d}
                      </span>
                      <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                        {profile.performance_30d?.posts_per_day} / day
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chart Performance Section */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex gap-[12px] items-center w-full">
                    <h3 className="font-bold text-[20px] text-[#222]">
                      Chart Performance
                    </h3>
                    <div className="bg-[rgba(0,0,0,0.08)] flex-1 h-px" />
                  </div>

                  <div className="flex gap-[16px] items-start justify-center w-full">
                    {/* Peak Rank */}
                    <div className="bg-[#1a1a1a] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#a1a1aa]">
                        Peak Rank
                      </span>
                      <div className="flex gap-[8px] items-start">
                        <span className="font-bold text-[24px] text-white">
                          #{profile.chart_performance?.peak_rank}
                        </span>
                        <span className="font-normal text-[12px] text-[#9b968f] mt-3">
                          {profile.chart_performance?.peak_rank_scope}
                        </span>
                      </div>
                      <span className="font-normal text-[12px] text-[#9b968f]">
                        Highest position reached
                      </span>
                    </div>

                    {/* Weeks on Chart */}
                    <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        Weeks on Chart
                      </span>
                      <span className="font-bold text-[24px] text-[#222]">
                        {profile.chart_performance?.weeks_on_chart}
                      </span>
                      <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                        Total weeks ranked
                      </span>
                    </div>

                    {/* Top 10 Appearances */}
                    <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        Top 10 Appearances
                      </span>
                      <span className="font-bold text-[24px] text-[#222]">
                        {profile.chart_performance?.top_10_appearances}
                      </span>
                      <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                        Weeks inside Top 10
                      </span>
                    </div>

                    {/* Peak CPI Score */}
                    <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                      <span className="font-medium text-[13px] text-[#9b968f]">
                        Peak CPI Score
                      </span>
                      <div className="flex gap-[8px] items-center">
                        <span className="font-bold text-[24px] text-[#222]">
                          {Math.round(
                            profile.chart_performance?.peak_cpi_score ?? 0,
                          )}
                        </span>
                        <div className="backdrop-blur-[2px] bg-[#dcfce7] flex items-center px-[12px] py-[4px] rounded-[99px]">
                          <span className="font-medium text-[12px] text-[#166534]">
                            +
                            {Math.round(
                              profile.chart_performance?.cpi_change ?? 0,
                            )}
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                        Composite Score
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* discovery section - Desktop Only */}
            <div className="block w-full">
              <div className="flex flex-col gap-[16px] mt-4">
                <div className="flex flex-col gap-3">
                  {/* Content Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-[24px] text-[#222]">
                      Career
                    </h2>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex gap-[12px] items-center overflow-x-auto w-full pb-2 scrollbar-hide">
                    <button
                      onClick={() => setActiveTab("charts")}
                      className={`${activeTab === "charts" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors whitespace-nowrap`}
                    >
                      Charts
                    </button>
                    <button
                      onClick={() => setActiveTab("videos")}
                      className={`${activeTab === "videos" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors whitespace-nowrap`}
                    >
                      Videos
                    </button>
                    <button
                      onClick={() => setActiveTab("milestone")}
                      className={`${activeTab === "milestone" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors whitespace-nowrap`}
                    >
                      Milestone
                    </button>
                    <button
                      onClick={() => setActiveTab("countries")}
                      className={`${activeTab === "countries" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors whitespace-nowrap`}
                    >
                      Countries
                    </button>
                    <button
                      onClick={() => setActiveTab("identity")}
                      className={`${activeTab === "identity" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors whitespace-nowrap`}
                    >
                      Identity Record
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  {activeTab === "charts" && (
                    <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                      <div className=" rounded-lg   flex-1">
                        <ChartsTable />
                      </div>
                    </div>
                  )}
                  {activeTab === "videos" && (
                    <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                      <div className="rounded-lg flex-1">
                        <VideosTable />
                      </div>
                    </div>
                  )}
                  {activeTab === "milestone" && (
                    <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                      <div className="rounded-lg flex-1">
                        <MilestonesTable />
                      </div>
                    </div>
                  )}
                  {activeTab === "countries" && (
                    <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                      <div className="rounded-lg flex-1">
                        <CountriesTable />
                      </div>
                    </div>
                  )}
                  {activeTab === "identity" && (
                    <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                      <div className="rounded-lg flex-1">
                        <IdentityRecordsTable />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FetchLoadingAndEmptyState>
  );
}
