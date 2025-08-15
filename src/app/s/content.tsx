import SeriesLanding from "../../pages/SeriesLanding";
import { getPlaylistData } from "@/lib/services/api.service";

export default async function SeriesContent({
  SeriesId,
}: {
  SeriesId?: string;
}) {
  if (!SeriesId) {
    throw new Error("Missing playlist ID");
  }

  const playlistData = await getPlaylistData(SeriesId);

  return <SeriesLanding playlistData={playlistData} />;
}
