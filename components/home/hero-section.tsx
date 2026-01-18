"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FastAverageColor } from "fast-average-color";
import { useThemeStore } from "@/lib/stores/theme-store";

interface HeroSlide {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Creator Charts reflect\nwhat the audience is watching.",
    description:
      "We rank creators and videos using publicly available performance metrics across platforms.",
    buttonText: "View Weekly Rankings",
    buttonLink: "/creators/top",
    image: "/37ea21a4ef9ea5acc3252d5e89320f1dd3110ecb.png",
  },
  {
    title: "Discover Trending Creators\nGaining Momentum Fast.",
    description:
      "Track the fastest growing creators across multiple platforms with real-time performance data.",
    buttonText: "View Trending Creators",
    buttonLink: "/creators/trending",
    image: "/71522be3d48a6a595eabb3aa12cb5cfc85ade5f9.png",
  },
  {
    title: "Top Performing Videos\nRanked Weekly.",
    description:
      "Explore the most watched and engaging videos from top creators worldwide every week.",
    buttonText: "View Top Videos",
    buttonLink: "/videos/top",
    image: "/326ee8c6a3752daeeb2baed405a4798a36da76de.png",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { backgroundColor, setBackgroundColor } = useThemeStore();

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
          
          // Convert RGB to darker, more saturated version for background
          const r = Math.floor(color.value[0] * 0.2);
          const g = Math.floor(color.value[1] * 0.2);
          const b = Math.floor(color.value[2] * 0.2);
          
          // Add slight tint based on dominant color
          const darkColor = `rgb(${r + 10}, ${g + 10}, ${b + 15})`;
          
          setExtractedColors((prev) => {
            const newColors = [...prev];
            newColors[index] = darkColor;
            return newColors;
          });
        } catch (err) {
          console.error("Error extracting color:", err);
        }
      };
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  // Extract colors from all images on mount
  useEffect(() => {
    heroSlides.forEach((slide, index) => {
      extractImageColor(slide.image, index);
    });
  }, []);

  // Update background color when slide changes
  useEffect(() => {
    if (extractedColors[currentSlide]) {
      setBackgroundColor(extractedColors[currentSlide]);
    }
  }, [currentSlide, extractedColors, setBackgroundColor]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentData = heroSlides[currentSlide];

  return (
    <section
      className="relative w-full h-[494px] overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] flex mx-auto relative h-full px-4">
        {/* Left side - Text content */}
        <div className="flex flex-col gap-8 items-start w-1/2 justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-semibold text-white text-[40px] leading-normal"
            >
              <p className="mb-0 whitespace-pre-line">{currentData.title}</p>
              <p className="font-normal text-[24px] text-white/70 mt-4 mb-0">
                {currentData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`button-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-12 items-start w-[269px]"
          >
            <Link href={currentData.buttonLink}>
              <button className="bg-[var(--primary-colour,#14532d)] hover:bg-[#14532d]/90 flex items-center justify-center px-6 py-2.5 rounded-lg w-full text-white font-semibold text-[20px] transition-colors">
                {currentData.buttonText}
              </button>
            </Link>

            {/* Progress Indicators */}
            <div className="flex gap-4 items-center">
              {heroSlides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    index === currentSlide
                      ? "bg-white w-[100px]"
                      : "bg-white w-2"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index === currentSlide && !isPaused && (
                    <motion.div
                      className="absolute inset-0 bg-[var(--primary-colour,#14532d)] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                  {index === currentSlide && isPaused && (
                    <div className="absolute inset-0 bg-[var(--primary-colour,#14532d)] rounded-full" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right side - Stacked Rotating Images */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div className="relative w-[550px] h-[400px]">
            {/* Show all images stacked with the current one on top */}
            {heroSlides.map((slide, index) => {
              const offset = (index - currentSlide + heroSlides.length) % heroSlides.length;
              const zIndex = heroSlides.length - offset;
              const isActive = index === currentSlide;
              
              // Dynamically generate rotation based on index
              const baseRotation = (index % 2 === 0) ? 2.5 : -3.5;
              
              // Calculate horizontal and vertical offset for stacking effect
              let xOffset = 0;
              let yOffset = 0;
              
              if (offset === 1) {
                xOffset = 80; // Second image clearly visible on right
                yOffset = 20;
              }
              if (offset === 2) {
                xOffset = -80; // Third image clearly visible on left
                yOffset = 20;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    zIndex,
                  }}
                  initial={false}
                  animate={{
                    rotate: isActive ? baseRotation : baseRotation + (offset * 3),
                    scale: isActive ? 1 : 0.88 - offset * 0.05,
                    opacity: isActive ? 1 : 0.6 - offset * 0.2,
                    x: `calc(-50% + ${xOffset}px)`,
                    y: `calc(-50% + ${yOffset}px)`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                >
                  <div className="border-2 border-solid border-white h-[348px] rounded-lg w-[452px] relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/20" />
                    <Image
                      ref={(el) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (el) imageRefs.current[index] = el as any;
                      }}
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover rounded-lg"
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
