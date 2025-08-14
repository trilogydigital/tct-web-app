import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import MediaContent from "./content";

export default function MediaPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <MediaContent searchParams={searchParams} />
    </Suspense>
  );
}
