"use client";

import React, { useEffect } from "react";
import CreatorsTable from "@/components/home/creators-table";
import VideosTable from "@/components/home/videos-table";
import TrendingCreators from "@/components/home/trending-creators";
import GlobalRankings from "@/components/home/global-rankings";
import RecentInsights from "@/components/home/recent-insights";
import Footer from "@/components/shared/footer";
import { CreatorChartsRoutes } from "@/routes";
import { useGetRankings } from "@/hooks/useGetRankings";
import {
  useGetTopVideos,
  useGetViralVideos,
} from "@/hooks/useGetVideoRankings";
import type { Video } from "@/components/home/videos-table";
import { useFilterStore, syncFiltersFromURL } from "@/lib/stores/filter-store";

const HomeClient = () => {
  const { country } = useFilterStore();

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Fetch creator rankings
  const { rankings: creatorRankings, isLoading: creatorsLoading } =
    useGetRankings({
      country,
    });

  // Fetch top videos
  const { videos: topVideos, isLoading: topVideosLoading } =
    useGetTopVideos(country);

  // Fetch viral videos
  const { videos: viralVideos, isLoading: viralVideosLoading } =
    useGetViralVideos(country);

  // Transform creator rankings data to match CreatorsTable interface
  const creatorsData =
    creatorRankings[0]?.entries.slice(0, 5).map((entry) => ({
      rank: entry.rank,
      name: entry.creator.display_name,
      verified: entry.creator.is_verified,
      creator_id: entry.creator.id,
      platforms: [], // Will be mapped from social handles
      lastWeek: entry.previous_rank || entry.rank,
      peak: entry.rank,
      woc: 1,
      avatar: entry.creator.avatar ?? "",
      cpiScore: Math.round(entry.cpi_score),
      trend: entry.movement.toLowerCase() as
        | "up"
        | "down"
        | "new"
        | "reentry"
        | "none",
      trendValue: entry.previous_rank
        ? Math.abs(entry.rank - entry.previous_rank)
        : undefined,
    })) || [];

  // Transform top videos data to match VideosTable interface
  const transformedTopVideos: Video[] = topVideos.slice(0, 5).map((entry) => ({
    rank: entry.rank,
    title: entry.video.title || "Untitled",
    creator: entry.video.creator.display_name,
    verified: entry.video.creator?.is_verified || false,
    lastWeek: entry.previous_rank || entry.rank,
    peak: entry.rank,
    woc: 1,
    streams: Math.round(entry.score),
    trend: entry.movement.toLowerCase() as
      | "up"
      | "down"
      | "new"
      | "reentry"
      | "none",
    trendValue: entry.previous_rank
      ? Math.abs(entry.rank - entry.previous_rank)
      : undefined,
    thumbnail: entry.video.thumbnail,
    videoUrl: entry.video.video_url,
  }));

  // Transform viral videos data to match VideosTable interface
  const transformedViralVideos: Video[] = viralVideos
    .slice(0, 5)
    .map((entry) => ({
      rank: entry.rank,
      title: entry.video.title || "Untitled",
      creator: entry.video.creator.display_name,
      verified: entry.video.creator.is_verified || false,
      lastWeek: entry.previous_rank || entry.rank,
      peak: entry.rank,
      woc: 1,
      streams: Math.round(entry.score),
      trend: entry.movement.toLowerCase() as
        | "up"
        | "down"
        | "new"
        | "reentry"
        | "none",
      trendValue: entry.previous_rank
        ? Math.abs(entry.rank - entry.previous_rank)
        : undefined,
      thumbnail: entry.video.thumbnail,
      videoUrl: entry.video.video_url,
    }));

  return (
    <>
      {/* Grid layout: 2x2 grid for desktop, stacked for mobile */}
      <section className="bg-[#f8fafc] w-full py-4 md:py-8 px-2 md:px-8 lg:px-16">
        <div className="max-w-360 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 auto-rows-fr">
            <CreatorsTable
              buttonLink={CreatorChartsRoutes.TOP_CREATORS}
              creators={creatorsData}
              isLoading={creatorsLoading}
            />

            <VideosTable
              headerColor="#78181b"
              title={`TOP\n100\nVIDEOS`}
              subtitle="The most viewed videos"
              buttonText="View Video Rankings"
              buttonLink={CreatorChartsRoutes.TOP_VIDEOS}
              videos={transformedTopVideos}
              isLoading={topVideosLoading}
            />

            <VideosTable
              headerColor="#841c6f"
              title={`TOP\n100\nVIRAL VIDEOS`}
              subtitle="The most watched videos"
              buttonText="View Creator Rankings"
              videos={transformedViralVideos}
              buttonLink={CreatorChartsRoutes.VIRAL_VIDEOS}
              isLoading={viralVideosLoading}
            />

            <TrendingCreators />
          </div>
        </div>
      </section>
      {/* Third row: Global Rankings (left) | Recent Insights (right) */}
      <section className="bg-[#f8fafc] w-full pb-4 md:pb-8 px-2 md:px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 auto-rows-fr">
            <GlobalRankings />
            <RecentInsights />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeClient;
