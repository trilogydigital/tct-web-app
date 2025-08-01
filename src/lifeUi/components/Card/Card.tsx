import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import type { CardProps } from "./Card.types";
import { CARD_DEFAULTS } from "./constants";
import {
  getAspectRatioValue,
  getBorderRadius,
  getImageForDisplay,
  getPositionStyles,
  getSecondaryImageUrl,
  processSecondaryImage,
} from "../../utils/Card.helpers";

const renderTag = (
  tag: NonNullable<CardProps["tags"]>[number],
  index: number,
  positionOffsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
) => {
  const positionStyles = getPositionStyles(tag.position, positionOffsets);
  const borderRadius = getBorderRadius(
    tag.border?.radius ?? CARD_DEFAULTS.tag.borderRadius
  );

  return (
    <Chip
      key={index}
      label={tag.label}
      size={tag.size && tag.size <= 16 ? "small" : "medium"}
      sx={{
        position: "absolute",
        zIndex: CARD_DEFAULTS.tag.zIndex,
        ...positionStyles,
        margin: tag.margin ?? CARD_DEFAULTS.tag.margin,
        color: tag.color ?? CARD_DEFAULTS.tag.color,
        backgroundColor:
          tag.backgroundColor ?? CARD_DEFAULTS.tag.backgroundColor,
        border: tag.border
          ? `${tag.border.width ?? CARD_DEFAULTS.tag.borderWidth}px ${
              tag.border.style ?? CARD_DEFAULTS.tag.borderStyle
            } ${tag.border.color ?? CARD_DEFAULTS.tag.borderColor}`
          : "none",
        borderRadius: borderRadius,
        fontSize: tag.size ? `${tag.size}px` : CARD_DEFAULTS.tag.fontSize,
        fontWeight: CARD_DEFAULTS.tag.fontWeight,
      }}
    />
  );
};

const renderIcon = (
  icon: NonNullable<CardProps["icons"]>[number],
  index: number,
  positionOffsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
) => {
  const positionStyles = getPositionStyles(icon.position, positionOffsets);

  return (
    <IconButton
      key={index}
      size="small"
      sx={{
        position: "absolute",
        zIndex: CARD_DEFAULTS.icon.zIndex,
        ...positionStyles,
        margin: icon.margin ?? CARD_DEFAULTS.icon.margin,
        color: icon.color ?? CARD_DEFAULTS.icon.color,
        backgroundColor:
          icon.backgroundColor ?? CARD_DEFAULTS.icon.backgroundColor,
        border: icon.border
          ? `${icon.border.width ?? CARD_DEFAULTS.icon.borderWidth}px ${
              icon.border.style ?? CARD_DEFAULTS.icon.borderStyle
            } ${icon.border.color ?? CARD_DEFAULTS.icon.borderColor}`
          : "none",
        borderRadius:
          typeof icon.border?.radius === "string" ||
          typeof icon.border?.radius === "number"
            ? icon.border.radius
            : CARD_DEFAULTS.icon.borderRadius,
        "&:hover": {
          backgroundColor:
            icon.hoverBackgroundColor ??
            CARD_DEFAULTS.icon.hoverBackgroundColor,
        },
      }}
    >
      <Box
        component="img"
        src={icon.iconUrl}
        alt="icon"
        sx={{
          width: icon.size ?? CARD_DEFAULTS.icon.size,
          height: icon.size ?? CARD_DEFAULTS.icon.size,
          objectFit: "contain",
        }}
      />
    </IconButton>
  );
};

const renderSecondaryImage = (
  secondaryImage: NonNullable<CardProps["secondaryImage"]>,
  mediaGroup: NonNullable<CardProps["entry"]["media_group"]> | undefined,
  positionOffsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
) => {
  const processedSecondaryImage = processSecondaryImage(
    secondaryImage,
    mediaGroup
  );

  if (!processedSecondaryImage) return null;

  const positionStyles = getPositionStyles(
    (processedSecondaryImage.position ??
      CARD_DEFAULTS.secondaryImage.position) as import("./Card.types").Position,
    positionOffsets
  );

  return (
    <Box
      component="img"
      src={processedSecondaryImage.resolvedSrc}
      alt="secondary image"
      sx={{
        position: "absolute",
        zIndex:
          processedSecondaryImage.zIndex ?? CARD_DEFAULTS.secondaryImage.zIndex,
        ...positionStyles,
        margin:
          processedSecondaryImage.margin ?? CARD_DEFAULTS.secondaryImage.margin,
        width:
          processedSecondaryImage.size?.width ??
          CARD_DEFAULTS.secondaryImage.size.width,
        height:
          processedSecondaryImage.size?.height ??
          CARD_DEFAULTS.secondaryImage.size.height,
        objectFit:
          processedSecondaryImage.objectFit ??
          CARD_DEFAULTS.secondaryImage.objectFit,
        opacity:
          processedSecondaryImage.opacity ??
          CARD_DEFAULTS.secondaryImage.opacity,
        mixBlendMode:
          processedSecondaryImage.blend ?? CARD_DEFAULTS.secondaryImage.blend,
        pointerEvents: "none", // Prevent interference with card interactions
      }}
    />
  );
};

export default function Card({
  entry,
  tags = [],
  icons = [],
  secondaryImage,
  aspectRatio = "16:9",
  objectFit = "cover",
  isEnhanced = true,
  isEpisode = false,
  showTitle = true,
  onClick,
  className,
  customStyle,
  styles = {},
  ImageKey,
  positionOffsets,
  useSecondaryAsBackground = false,
  titleKey,
  descriptionKey,
  maxWidth,
}: CardProps) {
  // Helper to get value by key from entry, fallback to default
  const getEntryValue = (
    key: string | undefined,
    fallback: unknown
  ): string | undefined => {
    if (!entry) return fallback as string | undefined;
    if (
      key &&
      typeof entry === "object" &&
      key in (entry as unknown as Record<string, unknown>)
    ) {
      const val = (entry as unknown as Record<string, unknown>)[key];
      if (typeof val === "string" && val.trim() !== "") return val;
    }
    if (typeof fallback === "string" && fallback.trim() !== "") return fallback;
    return undefined;
  };

  // Add safety checks for SSR
  const displayTitle = getEntryValue(titleKey, entry?.title);
  const displaySummary = getEntryValue(descriptionKey, entry?.summary);
  if (!entry || !displayTitle) {
    return null; // or return a skeleton/placeholder
  }

  const aspectRatioValue = getAspectRatioValue(aspectRatio);
  const imageUrl = getImageForDisplay(entry.media_group, aspectRatio, ImageKey);
  const secondaryImageUrl = getSecondaryImageUrl(
    entry.media_group,
    secondaryImage
  );
  const { border, hoverBorder, hoverScale = 1 } = styles ?? {};

  // Build hover border styles - only show on hover and only if not enhanced
  const hoverBorderStyles =
    hoverBorder && !isEnhanced
      ? {
          "&:hover": {
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: `${hoverBorder.width}px ${hoverBorder.style} ${hoverBorder.color}`,
              borderRadius: getBorderRadius(hoverBorder.radius),
              pointerEvents: "none",
              zIndex: 1,
            },
          },
        }
      : {};

  // Special handling for cards using secondary as background
  if (useSecondaryAsBackground) {
    return (
      <Box sx={{ display: "inline-block" }}>
        <MuiCard
          className={className}
          style={customStyle}
          sx={{
            maxWidth: maxWidth ?? CARD_DEFAULTS.card.maxWidth,
            cursor: onClick ? "pointer" : "default",
            position: "relative",
            border: "none",
            overflow: "hidden",
            backgroundColor: "transparent",
            borderRadius: getBorderRadius(
              border?.radius ?? CARD_DEFAULTS.borderRadius
            ),
            transition: CARD_DEFAULTS.card.transition,
            transformOrigin: CARD_DEFAULTS.card.transformOrigin,
            "&:hover": {
              ...(onClick && { boxShadow: 3 }),
              ...(hoverScale &&
                hoverScale !== 1 && {
                  transform: `scale(${hoverScale})`,
                  overflow: "hidden",
                }),
            },
            ...hoverBorderStyles,
          }}
          onClick={onClick}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: aspectRatioValue,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              // Background image setup
              ...(secondaryImageUrl && {
                backgroundImage: `url(${secondaryImageUrl})`,
                backgroundSize: secondaryImage?.backgroundSize || "cover",
                backgroundRepeat:
                  secondaryImage?.backgroundRepeat || "no-repeat",
                backgroundPosition:
                  secondaryImage?.backgroundPosition || "left center",
              }),
              // Fallback background color
              backgroundColor:
                secondaryImage?.backgroundColor || "rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Main thumbnail image */}
            <Box
              sx={{
                ...(secondaryImageUrl && {
                  // When secondary is background, you can adjust main image positioning
                  width: secondaryImage?.mainImageWidth || "100%",
                  height: secondaryImage?.mainImageHeight || "100%",
                  top: secondaryImage?.mainImageTop || "auto",
                  right: secondaryImage?.mainImageRight || "auto",
                  bottom: secondaryImage?.mainImageBottom || "auto",
                  left: secondaryImage?.mainImageLeft || "auto",
                }),
                overflow: "hidden",
                borderRadius: secondaryImage?.mainImageBorderRadius || "0",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: objectFit,
                  opacity: secondaryImage?.mainImageOpacity || 1,
                }}
                image={imageUrl}
                alt={displayTitle}
              />
            </Box>

            {/* Tags positioned relative to the entire card */}
            {tags.map((tag, index) => renderTag(tag, index, positionOffsets))}

            {/* Icons positioned relative to the entire card */}
            {!isEnhanced &&
              icons.map((icon, index) =>
                renderIcon(icon, index, positionOffsets)
              )}
          </Box>

          {isEnhanced && (
            <CardContent
              sx={{
                ...CARD_DEFAULTS.cardContent,
                ".MuiCard-root:hover &": {
                  opacity: CARD_DEFAULTS.cardContent.hoverOpacity,
                },
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                noWrap
                sx={{
                  fontWeight: CARD_DEFAULTS.titleTypography.fontWeight,
                  fontSize: CARD_DEFAULTS.titleTypography.fontSize,
                  mb: CARD_DEFAULTS.titleTypography.mb,
                  lineHeight: CARD_DEFAULTS.titleTypography.lineHeight,
                  overflow: CARD_DEFAULTS.titleTypography.overflow,
                  textOverflow: CARD_DEFAULTS.titleTypography.textOverflow,
                  whiteSpace: CARD_DEFAULTS.titleTypography.whiteSpace,
                  display: CARD_DEFAULTS.titleTypography.display,
                }}
              >
                {displayTitle}
              </Typography>
              {displaySummary && (
                <Typography
                  component="p"
                  sx={{
                    fontSize: CARD_DEFAULTS.summaryTypography.fontSize,
                    lineHeight: CARD_DEFAULTS.summaryTypography.lineHeight,
                    opacity: CARD_DEFAULTS.summaryTypography.opacity,
                    display: CARD_DEFAULTS.summaryTypography.display,
                    WebkitLineClamp:
                      CARD_DEFAULTS.summaryTypography.WebkitLineClamp,
                    WebkitBoxOrient:
                      CARD_DEFAULTS.summaryTypography.WebkitBoxOrient,
                    overflow: CARD_DEFAULTS.summaryTypography.overflow,
                    textOverflow: CARD_DEFAULTS.summaryTypography.textOverflow,
                  }}
                >
                  {displaySummary}
                </Typography>
              )}
            </CardContent>
          )}
        </MuiCard>

        {/* Title outside the card for non-enhanced, non-episode mode */}
        {!isEnhanced && !isEpisode && showTitle && (
          <Box sx={{ maxWidth: CARD_DEFAULTS.card.maxWidth }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              noWrap
              sx={{
                pt: CARD_DEFAULTS.titleTypography.pt,
                overflow: CARD_DEFAULTS.titleTypography.overflow,
                textOverflow: CARD_DEFAULTS.titleTypography.textOverflow,
                whiteSpace: CARD_DEFAULTS.titleTypography.whiteSpace,
              }}
            >
              {displayTitle}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  // Original card layout for regular cards
  const cardContent = (
    <Box sx={{ display: "inline-block" }}>
      <MuiCard
        className={className}
        style={customStyle}
        sx={{
          maxWidth: maxWidth ?? CARD_DEFAULTS.card.maxWidth,
          cursor: onClick ? "pointer" : "default",
          position: "relative",
          border: "none",
          overflow: "hidden",
          backgroundColor: "transparent",
          borderRadius: getBorderRadius(border?.radius),
          transition: CARD_DEFAULTS.card.transition,
          transformOrigin: CARD_DEFAULTS.card.transformOrigin,
          "&:hover": {
            ...(onClick && { boxShadow: 3 }),
            ...(hoverScale &&
              hoverScale !== 1 && {
                transform: `scale(${hoverScale})`,
                overflow: "hidden",
              }),
          },
          ...hoverBorderStyles,
        }}
        onClick={onClick}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: aspectRatioValue,
              objectFit: objectFit,
            }}
            image={imageUrl}
            alt={displayTitle}
          />

          {/* Render secondary image if provided */}
          {secondaryImage &&
            renderSecondaryImage(
              secondaryImage,
              entry.media_group,
              positionOffsets
            )}

          {tags.map((tag, index) => renderTag(tag, index, positionOffsets))}

          {icons &&
            icons.map((icon, index) =>
              renderIcon(icon, index, positionOffsets)
            )}
        </Box>

        {isEnhanced && (
          <CardContent
            sx={{
              ...CARD_DEFAULTS.cardContent,
              ".MuiCard-root:hover &": {
                opacity: CARD_DEFAULTS.cardContent.hoverOpacity,
              },
            }}
          >
            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                fontWeight: CARD_DEFAULTS.titleTypography.fontWeight,
                fontSize: CARD_DEFAULTS.titleTypography.fontSize,
                mb: CARD_DEFAULTS.titleTypography.mb,
                lineHeight: CARD_DEFAULTS.titleTypography.lineHeight,
                display: CARD_DEFAULTS.titleTypography.display,
                WebkitLineClamp: CARD_DEFAULTS.titleTypography.WebkitLineClamp,
                WebkitBoxOrient: CARD_DEFAULTS.titleTypography.WebkitBoxOrient,
                overflow: CARD_DEFAULTS.titleTypography.overflow,
              }}
            >
              {displayTitle}
            </Typography>
            {displaySummary && (
              <Typography
                component="p"
                sx={{
                  fontSize: CARD_DEFAULTS.summaryTypography.fontSize,
                  lineHeight: CARD_DEFAULTS.summaryTypography.lineHeight,
                  opacity: CARD_DEFAULTS.summaryTypography.opacity,
                  display: CARD_DEFAULTS.summaryTypography.display,
                  WebkitLineClamp:
                    CARD_DEFAULTS.summaryTypography.WebkitLineClamp,
                  WebkitBoxOrient:
                    CARD_DEFAULTS.summaryTypography.WebkitBoxOrient,
                  overflow: CARD_DEFAULTS.summaryTypography.overflow,
                }}
              >
                {displaySummary}
              </Typography>
            )}
          </CardContent>
        )}
      </MuiCard>

      {/* Title outside the card for non-enhanced, non-episode mode */}
      {!isEnhanced && !isEpisode && showTitle && (
        <Typography
          gutterBottom={CARD_DEFAULTS.titleTypography.gutterBottom}
          variant="h6"
          component="div"
          noWrap={CARD_DEFAULTS.titleTypography.noWrap}
          sx={{
            pt: CARD_DEFAULTS.titleTypography.pt,
            overflow: CARD_DEFAULTS.titleTypography.overflow,
            textOverflow: CARD_DEFAULTS.titleTypography.textOverflow,
            whiteSpace: CARD_DEFAULTS.titleTypography.whiteSpace,
          }}
        >
          {displayTitle}
        </Typography>
      )}
    </Box>
  );

  // Episode layout - show title and description beside card
  if (isEpisode) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          alignItems: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        {cardContent}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: {
              xs: 320,
              sm: "none",
            },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: {
                xs: CARD_DEFAULTS.episodeTitle.fontSize,
                xl: `calc(${CARD_DEFAULTS.episodeTitle.fontSize} * 1.4)`,
              },
              fontWeight: CARD_DEFAULTS.episodeTitle.fontWeight,
              mt: CARD_DEFAULTS.episodeTitle.mt,
              mb: {
                xs: 1,
                sm: CARD_DEFAULTS.episodeTitle.mb,
              },
              color: CARD_DEFAULTS.episodeTitle.color,
            }}
          >
            {displayTitle}
          </Typography>
          {displaySummary && (
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: CARD_DEFAULTS.episodeSummary.fontSize,
                  xl: `calc(${CARD_DEFAULTS.episodeSummary.fontSize} * 1.2)`,
                },
                fontWeight: CARD_DEFAULTS.episodeSummary.fontWeight,
                color: CARD_DEFAULTS.episodeSummary.color,
                lineHeight: CARD_DEFAULTS.episodeSummary.lineHeight,
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {displaySummary}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return cardContent;
}
