import SeriesLanding from "../../pages/SeriesLanding";
import { getSeriesLandingData } from "@/lib/services/api.service";

export default async function SeriesContent({
  SeriesId,
}: {
  SeriesId?: string;
}) {
  if (!SeriesId) {
    throw new Error("Missing playlist ID");
  }

  const { playlistData, stylesData } = await getSeriesLandingData(SeriesId);

  return <SeriesLanding playlistData={playlistData} stylesData={stylesData} />;
}
