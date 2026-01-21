import CreatorProfileEditClient from "./client";

interface CreatorProfileEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CreatorProfileEditPage({
  params,
}: CreatorProfileEditPageProps) {
  const { id } = await params;
  return <CreatorProfileEditClient creatorId={id} />;
}
