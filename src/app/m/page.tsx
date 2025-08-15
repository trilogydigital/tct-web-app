import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import MediaContent from "./content";

export default function MediaPage() {
  return (
    <Suspense fallback={<Loader />}>
      <MediaContent />
    </Suspense>
  );
}
