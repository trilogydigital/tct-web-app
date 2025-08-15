"use client";
import Card from "@/lifeUi/components/Card/Card";
import {
  CardAspectRatio,
  BorderStyle,
} from "@/lifeUi/components/Card/Card.types";
import HeroSection from "@/lifeUi/components/HeroSection/HeroSection";
import {
  HeroSectionProps,
  PlaylistData,
  HeroSectionStyles,
  SecondaryImageProps,
} from "@/lifeUi/components/HeroSection/HeroSection.types";
import HeroSliderSkeleton from "../components/Skeletons/HeroSliderSkeleton";
import VerticalList from "@/lifeUi/components/VerticalList/VerticalList";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

interface StylesData {
  heroSection: {
    label: string;
    title: {
      dataKey: string;
      show: boolean;
      color: string | null;
      fontWeight: number;
      fontSize: number;
      margin: { top: number; right: number; bottom: number; left: number };
      padding: { top: number; right: number; bottom: number; left: number };
    };
    description: {
      dataKey: string;
      show: boolean;
      color: string | null;
      fontWeight: number;
      fontSize: number;
      margin: { top: number; right: number; bottom: number; left: number };
      padding: { top: number; right: number; bottom: number; left: number };
    };
    padding: { top: number; right: number; bottom: number; left: number };
    margin: { top: number; right: number; bottom: number; left: number };
    backgroundImage: {
      label: string | null;
      dataKey: string;
      show: boolean;
      height: number;
      width: number;
      position: string;
      aspectRatio: string;
      margin: { top: number; right: number; bottom: number; left: number };
      padding: { top: number; right: number; bottom: number; left: number };
    };
    secondaryImage: {
      label: string | null;
      dataKey: string;
      show: boolean;
      height: number;
      width: number;
      position: string;
      aspectRatio: string;
      margin: { top: number; right: number; bottom: number; left: number };
      padding: { top: number; right: number; bottom: number; left: number };
    };
    watchButton: {
      label: string;
      textColor: string | null;
      backgroundColor: string | null;
      hoverBackgroundColor: string | null;
      textFontSize: number;
      textFontWeight: number;
      show: boolean;
      dataKey: string;
      borderRadius: number | null;
      padding: { top: number; right: number; bottom: number; left: number };
      margin: { top: number; right: number; bottom: number; left: number };
    };
  };
  episodesSection: {
    label: string;
    titleKey: string;
    showTitle: boolean;
    cardStyle: {
      presetName: string;
      isEnhanced: boolean;
      isEpisode: boolean;
      showTitle: boolean;
      imageKey: string;
      useSecondaryAsBackground: boolean;
      aspectRatio: string;
      objectFit: {
        objectFit: string;
      };
      styles: {
        hoverScale: number;
        border: {
          width: number | null;
          style: string;
          color: string | null;
          radius: number | null;
        };
        hoverBorder: {
          width: number | null;
          style: string;
          color: string | null;
          radius: number | null;
        };
      };
    };
  };
}

type HeroImagePosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

interface BorderInput {
  color?: string | null;
  width?: number | null;
  style?: "solid" | "dashed" | "dotted" | string | null;
  radius?: number | null;
}

interface SeriesLandingProps {
  playlistData: PlaylistData;
  stylesData: StylesData;
}

export default function SeriesLanding({
  playlistData,
  stylesData,
}: SeriesLandingProps) {
  const items = playlistData?.entry ?? [];
  const [heroVisible, setHeroVisible] = useState(false);

  // Simulate loading skeleton for HeroSection
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!stylesData || !stylesData.heroSection) return null;

  // Helper function to convert position string to valid position type
  const convertPosition = (position: string): HeroImagePosition => {
    const validPositions: HeroImagePosition[] = [
      "top-left",
      "top-right",
      "top-center",
      "bottom-left",
      "bottom-right",
      "bottom-center",
    ];
    return validPositions.includes(position as HeroImagePosition)
      ? (position as HeroImagePosition)
      : "top-left";
  };

  // Convert styles to HeroSection props format
  const heroSectionProps: HeroSectionProps = {
    // imageKeySelect: stylesData.heroSection.backgroundImage.dataKey,

    styles: {
      showTitle: stylesData.heroSection.title.show,
      showDescription: stylesData.heroSection.description.show,
      showButton: stylesData.heroSection.watchButton.show,

      titleKey: stylesData.heroSection.title.dataKey,
      descriptionKey: stylesData.heroSection.description.dataKey,
      ctaKey: stylesData.heroSection.watchButton.dataKey,

      // titleFontSize: stylesData.heroSection.title.fontSize,
      titleFontWeight: stylesData.heroSection.title.fontWeight,
      titleColor: stylesData.heroSection.title.color || undefined,
      titleMarginBottom: stylesData.heroSection.title.margin.bottom,
      titleMarginLeft: stylesData.heroSection.title.margin.left,

      // descriptionFontSize: stylesData.heroSection.description.fontSize,
      descriptionFontWeight: stylesData.heroSection.description.fontWeight,
      descriptionColor: stylesData.heroSection.description.color || undefined,
      descriptionMarginBottom: stylesData.heroSection.description.margin.bottom,
      descriptionMarginLeft: stylesData.heroSection.description.margin.left,

      ctaButtonColor: stylesData.heroSection.watchButton.textColor || undefined,
      ctaButtonBg:
        stylesData.heroSection.watchButton.backgroundColor || undefined,
      ctaButtonHoverBg:
        stylesData.heroSection.watchButton.hoverBackgroundColor || undefined,
      // ctaButtonFontSize: stylesData.heroSection.watchButton.textFontSize,
      ctaButtonFontWeight: stylesData.heroSection.watchButton.textFontWeight,
      ctaButtonBorderRadius:
        stylesData.heroSection.watchButton.borderRadius || undefined,
      ctaButtonPaddingX: stylesData.heroSection.watchButton.padding.left,
      ctaButtonPaddingY: stylesData.heroSection.watchButton.padding.top,
    } as HeroSectionStyles,

    secondaryImage: {
      show: stylesData.heroSection.secondaryImage.show,
      // keySelect: stylesData.heroSection.secondaryImage.dataKey,
      position: convertPosition(stylesData.heroSection.secondaryImage.position),
      offsetX: stylesData.heroSection.secondaryImage.margin.left,
      offsetY: stylesData.heroSection.secondaryImage.margin.top,
    } as SecondaryImageProps,

    ctaText: stylesData.heroSection.watchButton.label,
  };

  // Convert border style from API to Card component format
  const convertBorderStyle = (border: BorderInput): BorderStyle => ({
    color: border.color || undefined,
    width: border.width || undefined,
    style:
      border.style === "solid" ||
      border.style === "dashed" ||
      border.style === "dotted"
        ? border.style
        : "solid",
    radius: border.radius?.toString() || undefined,
  });

  // Convert episodes section styles to card props
  const cardProps = {
    isEnhanced: stylesData.episodesSection.cardStyle.isEnhanced,
    isEpisode: stylesData.episodesSection.cardStyle.isEpisode,
    ImageKey: stylesData.episodesSection.cardStyle.imageKey,
    showTitle: stylesData.episodesSection.cardStyle.showTitle,
    aspectRatio: stylesData.episodesSection.cardStyle
      .aspectRatio as CardAspectRatio,
    useSecondaryAsBackground:
      stylesData.episodesSection.cardStyle.useSecondaryAsBackground,
    objectFit: stylesData.episodesSection.cardStyle.objectFit.objectFit as
      | "contain"
      | "cover"
      | "fill"
      | "none"
      | "scale-down",
    maxWidth: 320,
    styles: {
      hoverScale: stylesData.episodesSection.cardStyle.styles.hoverScale,
      border: convertBorderStyle(
        stylesData.episodesSection.cardStyle.styles.border
      ),
      hoverBorder: convertBorderStyle(
        stylesData.episodesSection.cardStyle.styles.hoverBorder
      ),
    },
  };

  return (
    <>
      <Box mb={6}>
        {heroVisible && playlistData ? (
          <HeroSection
            aspectRatio="16:6"
            playlistData={playlistData}
            {...heroSectionProps}
          />
        ) : (
          <HeroSliderSkeleton />
        )}
      </Box>

      <Box mx={{ xs: 6, sm: 8, md: 10, xl: 12 }}>
        {stylesData.episodesSection.showTitle && (
          <Typography variant="h5" color="common.white" gutterBottom>
            Playlist Episodes
          </Typography>
        )}

        <VerticalList
          items={items}
          getKey={(item, index) => item.id ?? index.toString()}
          renderItem={(item) => (
            <Card key={item.id} entry={item} {...cardProps} />
          )}
        />
      </Box>
    </>
  );
}
