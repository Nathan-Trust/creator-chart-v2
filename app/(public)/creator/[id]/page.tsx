import CreatorProfileClient from "./client";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Creator Profile - CreatorCharts",
  description:
    "View detailed creator profile, performance metrics, rankings, and video analytics on CreatorCharts.",
};

export default async function CreatorProfilePage({ params }: PageProps) {
  const { id } = await params;

  return <CreatorProfileClient creatorId={id} />;
}
