"use client";

import React from "react";
import CreatorsTable from "@/components/home/creators-table";
import VideosTable from "@/components/home/videos-table";
import TrendingCreators from "@/components/home/trending-creators";
import GlobalRankings from "@/components/home/global-rankings";
import RecentInsights from "@/components/home/recent-insights";
import Footer from "@/components/shared/footer";
import { CreatorChartsRoutes } from "@/routes";

const HomeClient = () => {
  return (
    <>
      {/* Grid layout: 2x2 grid for desktop, stacked for mobile */}
      <section className="bg-[#f8fafc] w-full py-4 md:py-8 section-px ">
        <div className="max-w-360 mx-auto d">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 auto-rows-fr ">
            <CreatorsTable buttonLink={CreatorChartsRoutes.TOP_CREATORS} />

            <VideosTable
              headerColor="#78181b"
              title={`TOP\n100\nVIDEOS`}
              subtitle="The most viewed videos"
              buttonText="View Video Rankings"
              buttonLink={CreatorChartsRoutes.TOP_VIDEOS}
              type="top"
            />

            <VideosTable
              headerColor="#841c6f"
              title={`TOP\n100\nVIRAL VIDEOS`}
              subtitle="The most watched videos"
              buttonText="View Creator Rankings"
              buttonLink={CreatorChartsRoutes.VIRAL_VIDEOS}
              type="viral"
            />

            <TrendingCreators />
          </div>
        </div>
      </section>
      {/* Third row: Global Rankings (left) | Recent Insights (right) */}
      <section className="bg-[#f8fafc] w-full pb-4 md:pb-8 section-px">
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
