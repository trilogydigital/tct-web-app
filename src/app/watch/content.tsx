import {
  getWatchData,
  getFiltersData,
  getWatchFilterData,
} from "@/lib/services/api.service";
import ShelfForWatch from "@/pages/ShelfForWatch";

export default async function WatchContent() {
  const watchData = await getWatchData();
  const data = watchData.data;

  // Fetch filters from the filtersFeed URL
  let filtersData = [];
  let initialEntries = [];

  if (data?.filtersFeed) {
    try {
      const filtersResponse = await getFiltersData(data.filtersFeed);
      filtersData = filtersResponse.entry || [];

      // Get initial data using the first filter and grid's feedUrl
      if (filtersData.length > 0 && data?.grid?.feedUrl) {
        const firstFilter = filtersData[0];
        const playlistId = firstFilter[data.grid.datakey || "seriesId"];

        if (playlistId) {
          const initialFilterData = await getWatchFilterData(
            data.grid.feedUrl,
            playlistId
          );
          initialEntries = initialFilterData.entry || [];
        }
      }
    } catch (error) {
      console.error("Error fetching filters data:", error);
    }
  }

  return (
    <ShelfForWatch
      watchData={data}
      filtersData={filtersData}
      initialEntries={initialEntries}
    />
  );
}
