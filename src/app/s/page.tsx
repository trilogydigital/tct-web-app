import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import SeriesContent from "./content";

export default function SeriesLandingPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <SeriesContent searchParams={searchParams} />
    </Suspense>
  );
}
