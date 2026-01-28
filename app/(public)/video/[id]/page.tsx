import React from "react";
import { Metadata } from "next";
import SingleVideoClient from "./client";

export const metadata: Metadata = {
  title: "Video Details | CreatorCharts",
  description:
    "View detailed performance metrics, rankings, and analytics for this video on CreatorCharts.",
};

export default function SingleVideoPage() {
  return <SingleVideoClient />;
}
