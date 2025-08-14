import MediaScreenRouter from "@/pages/MediaScreenRouter";

export default function MediaContent({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return <MediaScreenRouter mediaId={searchParams.id} />;
}
