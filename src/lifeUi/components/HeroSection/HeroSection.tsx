import { Box, Typography, Button } from "@mui/material";
import type {
  HeroSectionProps,
  ApiEntry,
  PlaylistData,
} from "./HeroSection.types";
import { HERO_Section_DEFAULTS } from "./constants";
import { getAspectRatioValue } from "../../utils/Card.helpers";
import {
  getHeroImageUrl,
  getHeroTextValueByKey,
} from "../../utils/HeroSection.helpers";

export default function HeroSection(props: HeroSectionProps) {
  const {
    entry,
    playlistData,
    styles: stylesProp,
    imageKeySelect = HERO_Section_DEFAULTS.imageKeySelect,
    imageKeyText = HERO_Section_DEFAULTS.imageKeyText,
    imageKeySrc = HERO_Section_DEFAULTS.imageKeySrc,
    aspectRatio = HERO_Section_DEFAULTS.aspectRatio,
    secondaryImage: secondaryImageProp,
  } = props;

  // Determine which data source to use - prioritize playlistData
  const dataSource: ApiEntry | PlaylistData | null =
    playlistData || entry || null;

  if (!dataSource) return null;

  // Merge defaults with incoming props
  const styles = { ...HERO_Section_DEFAULTS.styles, ...(stylesProp || {}) };
  const secondaryImage = {
    ...HERO_Section_DEFAULTS.secondaryImage,
    ...(secondaryImageProp || {}),
  };

  // Main background image
  const backgroundImage = getHeroImageUrl(
    dataSource,
    imageKeySelect,
    imageKeyText,
    imageKeySrc,
    HERO_Section_DEFAULTS.imageSize
  );

  // Secondary image
  let secondaryImageUrl = "";
  if (secondaryImage.show) {
    secondaryImageUrl = getHeroImageUrl(
      dataSource,
      secondaryImage.keySelect,
      secondaryImage.keyText,
      secondaryImage.src
    );
  }

  // Text values - get from appropriate source
  const baseTitle = dataSource.title || "";
  const baseDescription =
    dataSource.summary || HERO_Section_DEFAULTS.description || "";

  // For CTA, check extensions first, then fallback
  let baseCta = HERO_Section_DEFAULTS.fallbackCtaText;
  if (
    dataSource.extensions?.watchButtonLabel &&
    typeof dataSource.extensions.watchButtonLabel === "string"
  ) {
    baseCta = dataSource.extensions.watchButtonLabel;
  }

  const finalTitle = styles.titleKey
    ? getHeroTextValueByKey(dataSource, styles.titleKey, baseTitle)
    : baseTitle;

  const finalDescription = styles.descriptionKey
    ? getHeroTextValueByKey(dataSource, styles.descriptionKey, baseDescription)
    : baseDescription;

  const finalCtaText = styles.ctaKey
    ? getHeroTextValueByKey(dataSource, styles.ctaKey, baseCta)
    : baseCta;

  // Get link - for playlist data, we might need to construct or get from extensions
  let ctaLink = "#";
  if ("link" in dataSource && dataSource.link?.href) {
    ctaLink = dataSource.link.href;
  } else if (
    dataSource.extensions?.link &&
    typeof dataSource.extensions.link === "string"
  ) {
    ctaLink = dataSource.extensions.link;
  }

  const aspectRatioValue = getAspectRatioValue(aspectRatio);

  return (
    <Box position="relative" overflow="hidden">
      <Box
        sx={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundColor: backgroundImage
            ? undefined
            : HERO_Section_DEFAULTS.backgroundFallbackColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: aspectRatioValue,
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          pb: 8,
          position: "relative",
          cursor: "default",
        }}
      >
        <Box
          sx={{
            maxWidth: HERO_Section_DEFAULTS.maxWidth,
            color: styles.titleColor,
            zIndex: 1,
            ml: styles.responsivePaddingLeft,
            pl: styles.paddingLeft,
          }}
        >
          {/* Title */}
          {styles.showTitle !== false && (
            <Typography
              variant="h5"
              fontWeight={styles.titleFontWeight}
              gutterBottom
              sx={{
                fontSize: styles.titleFontSize,
                color: styles.titleColor,
                fontFamily: styles.titleFontFamily,
                mb: styles.titleMarginBottom,
                ml: styles.titleMarginLeft,
              }}
            >
              {finalTitle}
            </Typography>
          )}

          {/* Secondary Image below Title */}
          {secondaryImage.show && secondaryImageUrl && (
            <Box
              component="img"
              src={secondaryImageUrl}
              alt="Secondary"
              sx={{
                width: secondaryImage.width,
                height: secondaryImage.height,
                objectFit: "cover",
                display: "block",
                mt: styles.secondaryImageMarginTop,
                mb: styles.secondaryImageMarginBottom,
              }}
            />
          )}

          {/* CTA Button */}
          {styles.showButton !== false && (
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                // window.open(ctaLink, "_blank");
              }}
              sx={{
                borderRadius: styles.ctaButtonBorderRadius,
                color: styles.ctaButtonColor,
                backgroundColor: styles.ctaButtonBg,
                fontSize: styles.ctaButtonFontSize,
                fontWeight: styles.ctaButtonFontWeight,
                mb: styles.ctaMarginBottom,
                padding:
                  typeof styles.ctaButtonPadding === "string" &&
                  styles.ctaButtonPadding.trim()
                    ? styles.ctaButtonPadding
                    : `${styles.ctaButtonPaddingY}px ${styles.ctaButtonPaddingX}px`,
                "&:hover": {
                  backgroundColor: styles.ctaButtonHoverBg,
                },
              }}
            >
              {finalCtaText}
            </Button>
          )}

          {/* Description */}
          {styles.showDescription !== false && (
            <Typography
              variant="body1"
              sx={{
                fontSize: styles.descriptionFontSize,
                color: styles.descriptionColor,
                fontFamily: styles.descriptionFontFamily,
                fontWeight: styles.descriptionFontWeight,
                mb: styles.descriptionMarginBottom,
                ml: styles.descriptionMarginLeft,
                display: "-webkit-box",
                WebkitLineClamp: HERO_Section_DEFAULTS.descriptionLineClamp,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {finalDescription}
            </Typography>
          )}
        </Box>

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: styles.overlayBackground,
            zIndex: 0,
          }}
        />
      </Box>
    </Box>
  );
}
