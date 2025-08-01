import { getWatchData } from "@/lib/services/api.service";
import ShelfForWatch from "@/pages/ShelfForWatch";

export default async function WatchContent() {
  const data = await getWatchData();
  return <ShelfForWatch items={data.entry} />;
}
