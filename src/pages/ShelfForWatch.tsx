"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/lifeUi/components/Card/Card";
import {
  BorderStyle,
  CardAspectRatio,
  CardEntry,
  CardIcon,
  CardTag,
  PositionOffsets,
  SecondaryImage,
} from "@/lifeUi/components/Card/Card.types";
import Grid from "@/lifeUi/components/Grid/Grid";
import Button from "@/lifeUi/components/Button/Button";
import { fetchFilteredEntries } from "@/lib/services/api.service";
import HorizontalList from "@/lifeUi/components/HorizontalList/HorizontalList";
import SkeletonGrid from "@/components/Skeletons/SkeletonGrid";
import { Skeleton } from "@mui/material";

interface FilterItem {
  id: number;
  label: string;
  feedid: string;
}

interface FilterData {
  id: number;
  label: string;
  buttonType: string;
  filter: FilterItem[];
}

interface CardStyle {
  presetName: string;
  isEnhanced: boolean;
  isEpisode: boolean;
  showTitle: boolean;
  imageKey: string;
  useSecondaryAsBackground: boolean;
  aspectRatio: CardAspectRatio;
  objectFit: { objectFit: string };
  icons: CardIcon[];
  badges: CardTag[];
  secondaryImage: SecondaryImage;
  positionOffsets: PositionOffsets;
  styles: {
    hoverScale: number;
    border: BorderStyle;
    hoverBorder: BorderStyle;
  };
}

interface GridData {
  label: string;
  titleKey: string;
  cardStyle: CardStyle;
}

interface WatchData {
  filters: FilterData;
  grid: GridData;
}

interface ShelfForWatchProps {
  watchData: WatchData;
  initialEntries: CardEntry[];
}

export default function ShelfForWatch({
  watchData,
  initialEntries = [],
}: ShelfForWatchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [entries, setEntries] = useState<CardEntry[]>(initialEntries);
  const [initializing, setInitializing] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filters = useMemo(
    () => watchData?.filters?.filter || [],
    [watchData?.filters?.filter]
  );
  const cardStyle = watchData?.grid?.cardStyle;

  // Initialize first filter and data
  useEffect(() => {
    if (!filters.length) {
      setInitializing(false);
      return;
    }

    const filterFromUrl = searchParams?.get("filter");
    const firstFilter = filters[0];

    if (filterFromUrl) {
      setActiveFilter(filterFromUrl);
      const urlFilter = filters.find((f) => f.feedid === filterFromUrl);

      if (urlFilter && urlFilter.feedid !== firstFilter.feedid) {
        fetchFilteredEntries(urlFilter.feedid)
          .then((data) => setEntries(data))
          .catch((err) =>
            console.error("Failed to fetch initial filter data:", err)
          )
          .finally(() => setInitializing(false));
        return;
      }
    } else {
      setActiveFilter(firstFilter.feedid);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("filter", firstFilter.feedid);
      router.push(newUrl.pathname + newUrl.search);
    }

    setInitializing(false);
  }, [filters, searchParams, router]);

  const handleFilterClick = async (filter: FilterItem) => {
    if (filterLoading || activeFilter === filter.feedid) return;

    setFilterLoading(true);
    setActiveFilter(filter.feedid);

    // Update URL without scrolling
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("filter", filter.feedid);
    router.push(newUrl.pathname + newUrl.search, { scroll: false });

    try {
      const newEntries = await fetchFilteredEntries(filter.feedid);
      setEntries(newEntries);
    } catch (error) {
      console.error("Failed to fetch filtered entries:", error);
    } finally {
      setFilterLoading(false);
    }
  };

  const handleCardClick = (mediaId?: string) => {
    if (mediaId) {
      router.push(`/m?id=${mediaId}`);
    }
  };

  const mapCardStyleToProps = (entry: CardEntry, cardStyle: CardStyle) => ({
    entry,
    isEnhanced: cardStyle.isEnhanced,
    isEpisode: cardStyle.isEpisode,
    showTitle: cardStyle.showTitle,
    ImageKey: cardStyle.imageKey,
    useSecondaryAsBackground: cardStyle.useSecondaryAsBackground,
    tags: cardStyle.badges || [],
    secondaryImage: cardStyle.secondaryImage,
    aspectRatio: cardStyle.aspectRatio,
    positionOffsets: cardStyle.positionOffsets,
    styles: {
      hoverScale: cardStyle.styles?.hoverScale,
      border: cardStyle.styles?.border,
      hoverBorder: cardStyle.styles?.hoverBorder,
    },
  });

  // Initial load skeleton
  if (initializing) {
    return (
      <div style={{ padding: "50px", minHeight: "100vh" }}>
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                sx={{
                  width: { xs: 100, sm: 140 },
                  height: { xs: 30, sm: 36 },
                  bgcolor: "grey.800",
                  borderRadius: "18px",
                }}
              />
            ))}
        </div>
        <SkeletonGrid />
      </div>
    );
  }

  return (
    <div style={{ padding: "50px", minHeight: "100vh" }}>
      {/* Filter Buttons */}
      {filters.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <HorizontalList
            items={filters}
            gap={1.5}
            renderItem={(filter) => (
              <Button
                label={filter.label}
                variant={
                  watchData?.filters?.buttonType as
                    | "contained"
                    | "outlined"
                    | "text"
                }
                size="medium"
                onClick={() => handleFilterClick(filter)}
                isActive={activeFilter === filter.feedid}
              />
            )}
            getKey={(filter, index) => filter.id ?? index}
          />
        </div>
      )}

      {/* Grid Content */}
      <div style={{ position: "relative", marginBottom: "80px" }}>
        {!filterLoading && entries.length > 0 ? (
          <Grid container>
            {entries.map((item) => {
              const cardProps = cardStyle
                ? mapCardStyleToProps(item, cardStyle)
                : { entry: item, ImageKey: "720" };

              return (
                <Grid key={item.id} item>
                  <Card
                    {...cardProps}
                    onClick={() => handleCardClick(item.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              padding: "60px",
              fontSize: "16px",
            }}
          >
            No content available for this filter.
          </div>
        )}

        {/* Overlay Skeleton for filter changes */}
        {filterLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <SkeletonGrid />
          </div>
        )}
      </div>
    </div>
  );
}
