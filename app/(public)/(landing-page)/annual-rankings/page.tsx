import React from "react";
import AnnualRankingsClient from "./client";

export const metadata = {
  title: "Annual Rankings - CreatorCharts",
  description:
    "CreatorCharts Annual Rankings — The official year-end performance index. Discover the top 10 highest-ranked creators based on verified annual performance data.",
};

export default function AnnualRankingsPage() {
  return <AnnualRankingsClient />;
}
