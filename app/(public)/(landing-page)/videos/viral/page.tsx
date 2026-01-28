import React from "react";
import TrendingVideosClient from "./client";

export const metadata = {
  title: "Viral Videos - CreatorCharts",
  description:
    "Discover viral videos on CreatorCharts. See what's trending and gaining massive traction across platforms.",
};

const TrendingVideo = () => {
  return <TrendingVideosClient />;
};

export default TrendingVideo;
