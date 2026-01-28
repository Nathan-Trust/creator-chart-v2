import CreatorProfileEditClient from "./client";
import { Metadata } from "next";

interface CreatorProfileEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Edit Creator Profile - CreatorCharts",
  description:
    "Update your creator profile information, links, and verification details on CreatorCharts.",
};

export default async function CreatorProfileEditPage({
  params,
}: CreatorProfileEditPageProps) {
  const { id } = await params;
  return <CreatorProfileEditClient creatorId={id} />;
}
