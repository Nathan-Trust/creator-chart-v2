import React from "react";
import TopVideosClient from "./client";

export const metadata = {
  title: "Top Videos - CreatorCharts",
  description:
    "Explore the top-performing videos on CreatorCharts. Discover the most successful content based on views, engagement, and impact.",
};

const TopVideos = () => {
  return <TopVideosClient />;
};

export default TopVideos;
