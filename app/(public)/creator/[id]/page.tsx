import CreatorProfileClient from "./client";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CreatorProfilePage({ params }: PageProps) {
  const { id } = await params;

  return <CreatorProfileClient creatorId={id} />;
}
