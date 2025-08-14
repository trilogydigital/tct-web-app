import { Suspense } from "react";
import WatchContent from "./content";
import Loader from "@/components/Loader/Loader";

export default function WatchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <WatchContent />
    </Suspense>
  );
}
