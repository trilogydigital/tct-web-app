import SeriesLanding from "../../pages/SeriesLanding";
import { getPlaylistData } from "@/lib/services/api.service";

export default async function SeriesContent({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedParams = await searchParams;

  if (!resolvedParams.id) {
    throw new Error("Missing playlist ID");
  }

  const playlistData = await getPlaylistData(resolvedParams.id);

  return <SeriesLanding playlistData={playlistData} />;
}
