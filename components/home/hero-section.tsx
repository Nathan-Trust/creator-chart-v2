"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FastAverageColor } from "fast-average-color";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useFilterStore, getApiCountryCode } from "@/lib/stores/filter-store";
import { useGetHighlights } from "@/hooks";
import type { HighlightsSectionDto } from "@/services/highlights.service";
import { format, parseISO } from "date-fns";

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

// Placeholder images cycled across slides
const placeholderImages = [
  "/37ea21a4ef9ea5acc3252d5e89320f1dd3110ecb.png",
  "/71522be3d48a6a595eabb3aa12cb5cfc85ade5f9.png",
  "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
];

// Fallback static slides if all API calls fail or return empty
const fallbackSlides: HeroSlide[] = [
  {
    title:
      'Sarah Jenkins has the highest engagement in Tech Reviews. "AI Tools" is trending at #1.',
    subtitle: "Top Creator Global  · January 20 - 26, 2025",
    image: placeholderImages[0],
  },
  {
    title:
      'Marcus Cole dominates Comedy Charts. "Stand-Up Shorts" hits 50M views this week.',
    subtitle: "Top 100 Creators · January 20 - 26, 2025",
    image: placeholderImages[1],
  },
  {
    title:
      'Elena Voss breaks Gaming records. "Speedrun Challenge" trends globally at #2.',
    subtitle: "Top 100 Videos · January 20 - 26, 2025",
    image: placeholderImages[2],
  },
];

/**
 * Format a weekStartDate string (e.g. "2025-01-20") into a readable range
 * like "January 20 - 26, 2025" (7-day window).
 */
function formatWeekRange(weekStartDate?: string): string {
  if (!weekStartDate) return "";
  try {
    const start = parseISO(weekStartDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    // Same month: "January 20 - 26, 2025"
    // Cross month: "January 27 - February 2, 2025"
    if (start.getMonth() === end.getMonth()) {
      return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`;
    }
    return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
  } catch {
    return weekStartDate;
  }
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { backgroundColor, setBackgroundColor } = useThemeStore();
  const { country: selectedCountry } = useFilterStore();
  const apiCountry = getApiCountryCode(selectedCountry) ?? "NG";

  // Fetch all highlights from the unified endpoint
  const { highlights } = useGetHighlights({
    country: apiCountry,
    weekStartDate: "2026-02-23",
  });

  // Build slides from unified API data, falling back to static slides
  const heroSlides: HeroSlide[] = useMemo(() => {
    if (!highlights) return fallbackSlides;

    const slides: HeroSlide[] = [];

    const buildSlide = (
      section: HighlightsSectionDto | undefined,
      label: string,
      image: string,
    ) => {
      if (!section) return;
      const pick =
        section.highestNewEntry ||
        section.biggestGainer ||
        section.longestOnChart ||
        section.mostChartingVideos;
      if (!pick?.title) return;

      const weekRange =
        pick.weekstart && pick.weekend
          ? formatWeekRange(
              typeof pick.weekstart === "string"
                ? pick.weekstart.split("T")[0]
                : undefined,
            )
          : "";

      slides.push({
        title: pick.title,
        subtitle: `${label}${weekRange ? `  · ${weekRange}` : ""}`,
        image: pick.image || image,
      });
    };

    buildSlide(highlights.topCreators, "Top Creators", placeholderImages[0]);
    buildSlide(highlights.topVideos, "Top 100 Videos", placeholderImages[1]);
    buildSlide(highlights.viralVideos, "Viral Videos", placeholderImages[2]);

    return slides.length > 0 ? slides : fallbackSlides;
  }, [highlights]);

  // Extract color from image and generate complementary dark background
  const extractImageColor = async (imageSrc: string, index: number) => {
    try {
      const fac = new FastAverageColor();
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;

      img.onload = async () => {
        try {
          const color = await fac.getColor(img);

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

          setExtractedColors((prev) => {
            const newColors = [...prev];
            newColors[index] = darkColor;
            return newColors;
          });
        } catch (err) {
          console.error("Error extracting color:", err);
        }
      };
      img.onerror = (error) => {
        console.error("Error loading image for color extraction:", error);
      };
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  // Extract colors from all images when heroSlides changes
  useEffect(() => {
    heroSlides.forEach((slide, index) => {
      extractImageColor(slide.image, index);
    });
  }, [heroSlides]);

  // Keep currentSlide in bounds when slide count changes
  const safeSlide = currentSlide >= heroSlides.length ? 0 : currentSlide;

  // Update background color when slide changes
  useEffect(() => {
    if (extractedColors[safeSlide]) {
      setBackgroundColor(extractedColors[safeSlide]);
    }
  }, [safeSlide, extractedColors, setBackgroundColor]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const currentData = heroSlides[safeSlide];

  return (
    <section
      className="w-full  lg:min-h-[500px] overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto relative h-full">
        {/* Mobile Layout (stacked) */}
        <div className="lg:hidden flex flex-col h-full px-5 md:px-6 desktop:px-14 py-16">
          {/* Top: Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={safeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3 mb-4"
            >
              <h1 className="font-extrabold text-white text-3xl md:text-[72px] leading-[1.1] tracking-[-1px]">
                {currentData?.title?.split(".")[0]}.
              </h1>
              <p className="font-medium text-xl md:text-3xl text-white/70">
                {currentData?.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Middle: Image with overlay */}
          <div className="flex-1 relative min-h-[300px] md:min-h-[400px] mt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={currentData?.image}
                  alt="Creator Portrait"
                  fill
                  className="object-cover grayscale"
                  priority
                />
                <div className="absolute inset-0 bg-white mix-blend-saturation" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: Button and Pagination */}
          <div className="mt-20 flex flex-col gap-4">
            {/* Pagination Dots */}
            <div className="flex gap-3 items-center justify-start">
              {heroSlides.map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-[4px] cursor-pointer overflow-hidden  transition-all duration-300"
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: index === safeSlide ? 48 : 8,
                    height: 8,
                  }}
                >
                  {index === safeSlide && (
                    <div
                      key={`progress-mobile-${safeSlide}`}
                      className="absolute top-0 left-0 h-full bg-white rounded-[4px]"
                      style={{
                        animation: isPaused
                          ? "none"
                          : "progressFill 5s linear forwards",
                        width: isPaused ? "100%" : undefined,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout (side by side) */}
        <div className="hidden lg:flex flex-row gap-[50px] relative h-full px-[60px] py-[60px] items-center justify-center">
          {/* Left side - Big Bold Text */}
          <div className="flex flex-col gap-4 items-start w-auto flex-1 justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <h1 className="font-extrabold text-white text-[44px] leading-[1.15] tracking-[-1px] max-w-[550px]">
                  {currentData?.title}
                </h1>
                <p className="font-medium text-[16px] text-white/80 mt-1">
                  {currentData?.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Square Visual with grayscale effect */}
          <div className="w-auto flex items-center justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square w-[340px] shadow-[0px_16px_40px_0px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                <Image
                  ref={(el) => {
                    if (el)
                      imageRefs.current[safeSlide] =
                        el as unknown as HTMLImageElement;
                  }}
                  src={currentData?.image}
                  alt="Creator Portrait"
                  fill
                  className="object-cover grayscale"
                  priority
                />
                <div className="absolute inset-0 bg-white mix-blend-saturation" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop: Bottom Pagination Dots */}
        <div className="hidden lg:flex absolute bottom-8 left-[60px] gap-3 items-center">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className="relative rounded-[4px] cursor-pointer overflow-hidden bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === safeSlide ? 48 : 8,
                height: 8,
              }}
            >
              {index === safeSlide && (
                <div
                  key={`progress-${safeSlide}`}
                  className="absolute top-0 left-0 h-full bg-white rounded-[4px]"
                  style={{
                    animation: isPaused
                      ? "none"
                      : "progressFill 5s linear forwards",
                    width: isPaused ? "100%" : undefined,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation for progress bar */}
      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
