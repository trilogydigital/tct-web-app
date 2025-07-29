import { useEffect, useState, useRef } from "react";

import { Box, Typography, Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { HeroSliderProps } from "./HeroSlider.types";
import { HERO_SLIDER_DEFAULTS } from "./constants";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import type { Swiper as SwiperType } from "swiper";
import { getAspectRatioValue } from "../../utils/Card.helpers";
import {
  transformEntryToSlides,
  getSecondaryImagePosition,
  getPaginationPosition,
} from "../../utils/HeroSlider.helpers";

export default function HeroSlider(props: HeroSliderProps) {
  // Merge defaults
  const {
    slides,
    entry,
    autoPlay = HERO_SLIDER_DEFAULTS.autoPlay,
    interval = HERO_SLIDER_DEFAULTS.interval,
    styles: stylesProp,
    imageKeySelect = HERO_SLIDER_DEFAULTS.imageKeySelect,
    imageKeyText = HERO_SLIDER_DEFAULTS.imageKeyText,
    imageKeySrc = HERO_SLIDER_DEFAULTS.imageKeySrc,
    aspectRatio = HERO_SLIDER_DEFAULTS.aspectRatio,
    secondaryImage: secondaryImageProp,
    arrowStyle: arrowStyleProp,
    paginationStyle: paginationStyleProp,
  } = props;

  const styles = { ...HERO_SLIDER_DEFAULTS.styles, ...(stylesProp || {}) };
  const secondaryImage = {
    ...HERO_SLIDER_DEFAULTS.secondaryImage,
    ...(secondaryImageProp || {}),
  };
  const arrowStyle = {
    ...HERO_SLIDER_DEFAULTS.arrowStyle,
    ...(arrowStyleProp || {}),
  };
  const paginationStyle = {
    ...HERO_SLIDER_DEFAULTS.paginationStyle,
    ...(paginationStyleProp || {}),
  };

  // Secondary image props
  const {
    show: showSecondaryImage,
    keySelect: secondaryImageKeySelect,
    keyText: secondaryImageKeyText,
    src: secondaryImageSrc,
    position: secondaryImagePosition,
    width: secondaryImageWidth,
    height: secondaryImageHeight,
    offsetX: secondaryImageOffsetX,
    offsetY: secondaryImageOffsetY,
  } = secondaryImage;

  // Arrow style props
  const {
    leftArrowIcon,
    rightArrowIcon,
    backgroundColor,
    hoverBackgroundColor,
    color,
    hoverColor,
    size,
    borderRadius,
    padding,
    leftOffsetX,
    leftOffsetY,
    rightOffsetX,
    rightOffsetY,
    hoverScale,
  } = arrowStyle;

  // Pagination style props
  const {
    show: showPagination,
    position: paginationPosition,
    offsetX: paginationOffsetX,
    offsetY: paginationOffsetY,
    dotSize,
    dotSpacing,
    dotColor,
    activeDotColor,
    dotBorderRadius,
    dotOpacity,
    activeDotOpacity,
    hoverDotColor,
    dotBorder,
    activeDotBorder,
    backgroundColor: paginationBgColor,
    containerPadding,
    containerBorderRadius,
  } = paginationStyle;

  // State & refs
  const [mounted, setMounted] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Once swiperInstance and refs are ready, wire up navigation
  useEffect(() => {
    if (
      swiperInstance &&
      swiperInstance?.params?.navigation &&
      typeof swiperInstance.params.navigation !== "boolean" &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Prepare slides
  const slidesToRender = entry
    ? transformEntryToSlides(
        entry,
        imageKeySelect,
        imageKeyText,
        imageKeySrc,
        showSecondaryImage,
        secondaryImageKeySelect,
        secondaryImageKeyText,
        secondaryImageSrc,
        styles
      )
    : slides || [];

  if (!mounted || slidesToRender.length === 0) return null;

  // Compute aspect ratio & pagination position
  const aspectRatioValue = getAspectRatioValue(aspectRatio);
  const paginationPositionStyles = showPagination
    ? getPaginationPosition(
        paginationPosition,
        paginationOffsetX,
        paginationOffsetY
      )
    : {};

  // Arrow icons
  const LeftArrowIcon = leftArrowIcon ? (
    <Box
      component="img"
      src={leftArrowIcon}
      alt="Previous"
      sx={{ width: size, height: size, transition: "transform 0.2s ease" }}
    />
  ) : (
    <ArrowBackIos
      sx={{
        fontSize: size,
        color: "inherit",
        ml: "1px",
        transition: "transform 0.2s ease",
      }}
    />
  );

  const RightArrowIcon = rightArrowIcon ? (
    <Box
      component="img"
      src={rightArrowIcon}
      alt="Next"
      sx={{ width: size, height: size, transition: "transform 0.2s ease" }}
    />
  ) : (
    <ArrowForwardIos
      sx={{
        fontSize: size,
        color: "inherit",
        mr: "1px",
        transition: "transform 0.2s ease",
      }}
    />
  );

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Pagination Styles */}
      {showPagination && (
        <style>
          {`
            .hero-slider-pagination {
              position: absolute !important;
              ${Object.entries(paginationPositionStyles)
                .map(([k, v]) => `${k}: ${v} !important;`)
                .join(" ")}
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: ${dotSpacing} !important;
              background-color: ${paginationBgColor} !important;
              padding: ${containerPadding} !important;
              border-radius: ${containerBorderRadius} !important;
              z-index: 10 !important;
            }
            .hero-slider-pagination .swiper-pagination-bullet {
              width: ${dotSize} !important;
              height: ${dotSize} !important;
              background-color: ${dotColor} !important;
              opacity: ${dotOpacity} !important;
              border-radius: ${dotBorderRadius} !important;
              border: ${dotBorder} !important;
              margin: 0 !important;
              transition: all 0.3s ease !important;
            }
            .hero-slider-pagination .swiper-pagination-bullet:hover {
              background-color: ${hoverDotColor} !important;
            }
            .hero-slider-pagination .swiper-pagination-bullet-active {
              background-color: ${activeDotColor} !important;
              opacity: ${activeDotOpacity} !important;
              border: ${activeDotBorder} !important;
            }
          `}
        </style>
      )}

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={
          autoPlay ? { delay: interval, disableOnInteraction: false } : false
        }
        pagination={{
          clickable: true,
          enabled: showPagination,
          el: ".hero-slider-pagination",
        }}
        navigation // enable navigation module
        loop
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        style={{ width: "100%", height: "100%" }}
      >
        {slidesToRender.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                backgroundImage: slide.imageUrl
                  ? `url(${slide.imageUrl})`
                  : undefined,
                backgroundColor: slide.imageUrl ? undefined : "#f0f0f0",
                backgroundSize: "cover",
                backgroundPosition: "center",
                aspectRatio: aspectRatioValue,
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                pb: 8,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  maxWidth: "60%",
                  color: styles.titleColor || "#fff",
                  zIndex: 1,
                  ml: styles.responsivePaddingLeft || { xs: 6, sm: 8, md: 10 },
                  pl: styles.paddingLeft,
                }}
              >
                {styles.showTitle !== false && (
                  <Typography
                    variant="h5"
                    fontWeight={styles.titleFontWeight || "bold"}
                    gutterBottom
                    sx={{
                      fontSize: styles.titleFontSize,
                      color: styles.titleColor,
                      fontFamily: styles.titleFontFamily,
                      mb: styles.titleMarginBottom,
                      ml: styles.titleMarginLeft,
                    }}
                  >
                    {slide.title}
                  </Typography>
                )}

                {styles.showDescription !== false && (
                  <Typography
                    variant="body1"
                    mb={styles.spacingBetweenText || 3}
                    sx={{
                      fontSize: styles.descriptionFontSize,
                      color: styles.descriptionColor,
                      fontFamily: styles.descriptionFontFamily,
                      fontWeight: styles.descriptionFontWeight,
                      mb: styles.descriptionMarginBottom,
                      ml: styles.descriptionMarginLeft,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {slide.description}
                  </Typography>
                )}

                {styles.showButton !== false && slide.ctaLink && (
                  <Button
                    variant="contained"
                    href={slide.ctaLink}
                    sx={{
                      borderRadius: styles.ctaButtonBorderRadius || 1,
                      color: styles.ctaButtonColor,
                      backgroundColor: styles.ctaButtonBg,
                      fontSize: styles.ctaButtonFontSize,
                      fontWeight: styles.ctaButtonFontWeight,
                      padding:
                        typeof styles.ctaButtonPadding === "string" &&
                        styles.ctaButtonPadding.trim()
                          ? styles.ctaButtonPadding
                          : `${styles.ctaButtonPaddingY || 8}px ${
                              styles.ctaButtonPaddingX || 16
                            }px`,
                      "&:hover": {
                        backgroundColor: styles.ctaButtonHoverBg,
                      },
                    }}
                  >
                    {slide.ctaText}
                  </Button>
                )}
              </Box>

              {showSecondaryImage && slide.secondaryImageUrl && (
                <Box
                  component="img"
                  src={slide.secondaryImageUrl}
                  alt="Secondary"
                  sx={{
                    position: "absolute",
                    width: secondaryImageWidth,
                    height: secondaryImageHeight,
                    objectFit: "cover",
                    zIndex: 2,
                    ...getSecondaryImagePosition(
                      secondaryImagePosition,
                      secondaryImageOffsetX,
                      secondaryImageOffsetY
                    ),
                  }}
                />
              )}

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    styles.overlayBackground ||
                    "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
                  zIndex: 0,
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev Arrow */}
      <IconButton
        ref={prevRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: leftOffsetX,
          transform: `translate(0, calc(-50% + ${leftOffsetY}px))`,
          zIndex: 10,
          backgroundColor,
          color,
          width: 40,
          height: 40,
          padding,
          borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          visibility: mounted ? "visible" : "hidden",
          "&:hover": {
            backgroundColor: hoverBackgroundColor,
            color: hoverColor,
          },
          "&:hover .MuiSvgIcon-root, &:hover img": {
            transform: `scale(${hoverScale})`,
          },
        }}
      >
        {LeftArrowIcon}
      </IconButton>

      {/* Next Arrow */}
      <IconButton
        ref={nextRef}
        sx={{
          position: "absolute",
          top: "50%",
          right: rightOffsetX,
          transform: `translate(0, calc(-50% + ${rightOffsetY}px))`,
          zIndex: 10,
          backgroundColor,
          color,
          width: 40,
          height: 40,
          padding,
          borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          visibility: mounted ? "visible" : "hidden",
          "&:hover": {
            backgroundColor: hoverBackgroundColor,
            color: hoverColor,
          },
          "&:hover .MuiSvgIcon-root, &:hover img": {
            transform: `scale(${hoverScale})`,
          },
        }}
      >
        {RightArrowIcon}
      </IconButton>

      {/* Pagination container */}
      {showPagination && <div className="hero-slider-pagination" />}
    </Box>
  );
}
