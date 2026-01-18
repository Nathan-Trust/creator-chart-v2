"use client";

import React from "react";
import Navbar from "@/components/shared/navbar";
import HeroSection from "@/components/home/hero-section";
import CreatorsTable from "@/components/home/creators-table";
import VideosTable from "@/components/home/videos-table";
import TrendingCreators from "@/components/home/trending-creators";
import GlobalRankings from "@/components/home/global-rankings";
import RecentInsights from "@/components/home/recent-insights";
import Footer from "@/components/shared/footer";

// Mock data for viral videos (different from regular videos)
const viralVideosData = [
  {
    rank: 1,
    title: "Champion",
    creator: "Billie Ellish",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 100,
    trend: "up" as const,
    trendValue: 1,
  },
  {
    rank: 2,
    title: "Champion",
    creator: "Billie Ellish",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "new" as const,
  },
  {
    rank: 3,
    title: "Champion",
    creator: "Billie Ellish",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "reentry" as const,
  },
  {
    rank: 4,
    title: "Champion",
    creator: "Billie Ellish",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "down" as const,
    trendValue: 1,
  },
  {
    rank: 5,
    title: "Champion",
    creator: "Billie Ellish",
    verified: true,
    lastWeek: 2,
    peak: 1,
    woc: 7,
    streams: 87,
    trend: "none" as const,
  },
];

const HomeClient = () => {
  return (
    <>
      {/* Grid layout: 2x2 grid for all tables */}
      <section className="bg-[#f8fafc] w-full py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
            <CreatorsTable />
            <VideosTable
              headerColor="#78181b"
              title={`TOP\n100\nVIDEOS`}
              subtitle="The most viewed videos"
              buttonText="View Video Rankings"
            />
            <VideosTable
              headerColor="#841c6f"
              title={`TOP\n100\nVIRAL VIDEOS`}
              subtitle="The most watched videos"
              buttonText="View Creator Rankings"
              videos={viralVideosData}
            />
            <TrendingCreators />
          </div>
        </div>
      </section>
      {/* Third row: Global Rankings (left) | Recent Insights (right) */}
      <section className="bg-[#f8fafc] w-full pb-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
            <GlobalRankings />
            <RecentInsights />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeClient;
