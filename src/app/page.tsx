import Loader from "@/components/Loader/Loader";
import { Suspense } from "react";
import HPC from "./content";
export default async function HomePage() {
  return (
    <Suspense fallback={<Loader />}>
      <HPC />
    </Suspense>
  );
}
