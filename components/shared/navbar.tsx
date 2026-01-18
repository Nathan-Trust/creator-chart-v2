"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useThemeStore } from "@/lib/stores/theme-store";

export default function Navbar() {
  const [creatorsOpen, setCreatorsOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);
  const { backgroundColor } = useThemeStore();

  return (
    <nav
      className="w-full transition-colors duration-1000"
      style={{ backgroundColor }}
    >
      <div className="max-w-360 mx-auto px-4">
        <div className="flex items-center justify-between py-8">
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center gap-52">
            {/* Logo */}
            <Link href="/" className="w-72.5 h-[45.111px] relative block">
              <Image
                src="/c92443c27a28162617afdb8db0f8fd1536e11ea0.png"
                alt="CreatorCharts"
                fill
                className="object-contain"
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-8 text-white text-xl font-semibold">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                CHARTS
              </Link>

              {/* Creators Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCreatorsOpen(!creatorsOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity underline decoration-solid"
                >
                  CREATORS
                  <div
                    className={`transition-transform ${
                      creatorsOpen ? "" : "rotate-180"
                    }`}
                  >
                    <Image
                      src="/39ceca98e3571e9ec6420b534802915b19a242d6.svg"
                      alt="arrow"
                      width={16}
                      height={16}
                    />
                  </div>
                </button>
                {creatorsOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-[#1a1d1f] border border-white/20 rounded-lg py-2 min-w-50 shadow-xl z-50">
                    <Link
                      href="/creators/top"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors"
                      onClick={() => setCreatorsOpen(false)}
                    >
                      Top 100 Creators
                    </Link>
                    <Link
                      href="/creators/trending"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors"
                      onClick={() => setCreatorsOpen(false)}
                    >
                      Trending Creators
                    </Link>
                  </div>
                )}
              </div>

              {/* Videos Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setVideosOpen(!videosOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  VIDEOS
                  <div
                    className={`transition-transform ${
                      videosOpen ? "" : "rotate-180"
                    }`}
                  >
                    <Image
                      src="/39ceca98e3571e9ec6420b534802915b19a242d6.svg"
                      alt="arrow"
                      width={16}
                      height={16}
                    />
                  </div>
                </button>
                {videosOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-[#1a1d1f] border border-white/20 rounded-lg py-2 min-w-50 shadow-xl z-50">
                    <Link
                      href="/videos/top"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors"
                      onClick={() => setVideosOpen(false)}
                    >
                      Top 100 Videos
                    </Link>
                    <Link
                      href="/videos/trending"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors"
                      onClick={() => setVideosOpen(false)}
                    >
                      Trending Videos
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Global Dropdown and Login */}
          <div className="flex items-center gap-4">
            {/* Global Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGlobalOpen(!globalOpen)}
                className="border border-white rounded-lg px-5 py-3 min-w-61.5 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-medium text-white">
                    Global
                  </span>
                  <div
                    className={`transition-transform ${
                      globalOpen ? "" : "rotate-180"
                    }`}
                  >
                    <Image
                      src="/39ceca98e3571e9ec6420b534802915b19a242d6.svg"
                      alt="arrow"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </button>
              {globalOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#1a1d1f] border border-white/20 rounded-lg py-2 min-w-60 shadow-xl z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-white text-lg"
                    onClick={() => setGlobalOpen(false)}
                  >
                    Global
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-white text-lg"
                    onClick={() => setGlobalOpen(false)}
                  >
                    Nigeria
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-white text-lg"
                    onClick={() => setGlobalOpen(false)}
                  >
                    United States
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-white text-lg"
                    onClick={() => setGlobalOpen(false)}
                  >
                    United Kingdom
                  </button>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link href="/login">
              <button className="bg-[var(--primary-colour,#14532d)] border hover:bg-[#14532d]/90 rounded-lg px-8 py-[13px] text-white text-xl font-semibold transition-colors border border-transparent">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
