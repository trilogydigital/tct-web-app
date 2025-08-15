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

// Helper: Get nested value from object using dot path like "extensions.seriesId"
function getValueByPath<T extends object, R>(
  obj: T,
  path: string
): R | undefined {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as R | undefined;
}

// Updated interfaces
interface FilterItem {
  id: string;
  title: string;
  seriesId?: string;
  [key: string]: unknown;
}

export interface CardStyle {
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
  feedUrl: string;
  datakey: string;
  cardStyle: CardStyle;
}

interface BorderRadius {
  id: number;
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

interface BorderStyleData {
  id: number;
  width: number;
  style: "solid" | "dashed" | "dotted";
  color: string;
  radius: BorderRadius;
}

interface FilterStyle {
  label: string;
  buttonType: string;
  textcolor?: string;
  backgroundcolor?: string;
  borderstyle?: BorderStyleData;
}

interface WatchData {
  filtersFeed: string;
  grid: GridData;
  filterstyle: FilterStyle;
}

interface ShelfForWatchProps {
  watchData: WatchData;
  filtersData: FilterItem[];
  initialEntries: CardEntry[];
}

export default function ShelfForWatch({
  watchData,
  filtersData = [],
  initialEntries = [],
}: ShelfForWatchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<CardEntry[]>(initialEntries);
  const [initializing, setInitializing] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filters = useMemo(() => filtersData || [], [filtersData]);
  const cardStyle = watchData?.grid?.cardStyle;
  const filterStyle = watchData?.filterstyle;
  const dataKey = watchData?.grid?.datakey || "seriesId";
  const feedUrl = watchData?.grid?.feedUrl;

  // Initialize first filter and data
  useEffect(() => {
    if (!filters.length || !feedUrl) {
      setInitializing(false);
      return;
    }

    const filterFromUrl = searchParams?.get("filter");
    const firstFilter = filters[0];
    const firstFilterId = getValueByPath<FilterItem, string>(
      firstFilter,
      dataKey
    );

    if (!firstFilterId) {
      console.error(
        `dataKey "${dataKey}" not found in first filter:`,
        firstFilter
      );
      setInitializing(false);
      return;
    }

    if (filterFromUrl) {
      setActiveFilter(filterFromUrl);
      const urlFilter = filters.find(
        (f) => getValueByPath(f, dataKey) === filterFromUrl
      );
      if (urlFilter && filterFromUrl !== firstFilterId) {
        fetchFilteredEntries(feedUrl, filterFromUrl)
          .then((data) => setEntries(data))
          .catch((err) =>
            console.error("Failed to fetch initial filter data:", err)
          )
          .finally(() => setInitializing(false));
        return;
      }
    } else {
      setActiveFilter(firstFilterId);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("filter", firstFilterId);
      router.push(newUrl.pathname + newUrl.search);
    }

    setInitializing(false);
  }, [filters, searchParams, router, dataKey, feedUrl]);

  const handleFilterClick = async (filter: FilterItem) => {
    const filterId = getValueByPath<FilterItem, string>(filter, dataKey);

    if (!filterId) {
      console.error(` dataKey "${dataKey}" not found in filter:`, filter);
      return;
    }

    if (filterLoading || activeFilter === filterId || !feedUrl) return;

    setFilterLoading(true);
    setActiveFilter(filterId);

    // Update URL without scrolling
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("filter", filterId);
    router.push(newUrl.pathname + newUrl.search, { scroll: false });

    try {
      const newEntries = await fetchFilteredEntries(feedUrl, filterId);
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
                label={filter.title}
                variant={
                  filterStyle?.buttonType as "contained" | "outlined" | "text"
                }
                size="medium"
                onClick={() => handleFilterClick(filter)}
                isActive={activeFilter === getValueByPath(filter, dataKey)}
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
          !filterLoading && (
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
          )
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
