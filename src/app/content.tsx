import { getCardProps } from "@/lib/services/api.service";
import ShelfForHome from "@/pages/ShelfForHome";

export default async function HPC() {
  const sections = await getCardProps();
  console.log("Card sections:", sections);

  return <ShelfForHome sections={sections} />;
}
