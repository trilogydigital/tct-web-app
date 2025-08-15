import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import SeriesContent from "./content";

export default async function SeriesLandingPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <Suspense fallback={<Loader />}>
      <SeriesContent SeriesId={id} />
    </Suspense>
  );
}
