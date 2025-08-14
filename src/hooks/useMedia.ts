"use client";

import { useEffect, useState } from "react";
import { getMediaData } from "@/lib/services/api.service";

export function useMedia(mediaId?: string) {
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaId) return;

    setLoading(true);
    setError(null);

    getMediaData(mediaId)
      .then((data) => setMedia(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mediaId]);

  return { media, loading, error };
}
