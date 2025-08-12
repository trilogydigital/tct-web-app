import { getWatchData, getWatchFilterData } from "@/lib/services/api.service";
import ShelfForWatch from "@/pages/ShelfForWatch";

export default async function WatchContent() {
  const watchData = await getWatchData();

  // Get the first filter's feedId for initial data
  const firstFilter = watchData.data?.filters?.filter?.[0];
  let initialEntries = [];
  console.log("First Filter:", firstFilter);
  if (firstFilter?.feedid) {
    const initialFilterData = await getWatchFilterData(firstFilter.feedid);
    initialEntries = initialFilterData.entry || [];
  }

  return (
    <ShelfForWatch watchData={watchData.data} initialEntries={initialEntries} />
  );
}
