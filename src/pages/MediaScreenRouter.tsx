"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMedia } from "@/hooks/useMedia";
import Loader from "@/components/Loader/Loader";

export default function MediaScreen({ mediaId }: { mediaId?: string }) {
  const { media, loading, error } = useMedia(mediaId);
  const router = useRouter();

  useEffect(() => {
    if (!loading && media?.entry?.[0]?.type?.value) {
      const type = media.entry[0].type.value.toLowerCase();

      if (type === "video") {
        router.push(`/player?id=${mediaId}`);
      } else if (type === "series") {
        const seriesId = media.entry[0]?.extensions?.seriesId;
        if (seriesId) {
          router.push(`/s?id=${seriesId}`);
        }
      }
    }
  }, [media, loading, mediaId, router]);

  if (loading || (!loading && media?.entry?.[0]?.type?.value)) {
    return <Loader />;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return null;
}
