import { useRef, useMemo, useEffect, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { HorizontalSliderProps } from "./HorizontalSlider.types";
import {
  DEFAULT_VISIBLE_SLIDES,
  DEFAULT_SPACING,
  DEFAULT_SLIDE_BY,
  DEFAULT_TITLE_STYLE,
  DEFAULT_CONTAINER_STYLE,
  DEFAULT_SHADOW_OVERLAY,
  DEFAULT_BUTTON_STYLE,
  DEFAULT_SCROLL_CONTAINER_STYLE,
  DEFAULT_VISIBLE_SLIDES_BREAKPOINTS,
  DEFAULT_TITLE_FONT_SIZE_BREAKPOINT,
  DEFAULT_SPACING_BREAKPOINT,
  DEFAULT_SLIDE_BY_BREAKPOINT,
  DEFAULT_SHADOW_WIDTH_BREAKPOINT,
  DEFAULT_PEEK_BREAKPOINT,
  DEFAULT_TITLE_MARGIN_LEFT_BREAKPOINT,
} from "./constants";

function HorizontalSlider<T>({
  items,
  renderItem,
  visibleSlides = DEFAULT_VISIBLE_SLIDES,
  spacing = DEFAULT_SPACING,
  slideBy = DEFAULT_SLIDE_BY,
  className,
  customStyle,
  title,
  styles = {},
  hideArrowsBreakpoint = {},
  presetName,
}: HorizontalSliderProps<T>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"), {
    noSsr: true,
  });
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"), {
    noSsr: true,
  });
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"), {
    noSsr: true,
  });
  const isXl = useMediaQuery(theme.breakpoints.up("xl"), { noSsr: true });

  // Extract visibleSlidesBreakpoints, titleFontSizeBreakpoint, spacingBreakpoint, slideByBreakpoint from styles
  const visibleSlidesBreakpoints =
    styles?.visibleSlidesBreakpoints || DEFAULT_VISIBLE_SLIDES_BREAKPOINTS;

  const titleFontSizeBreakpoint =
    styles?.titleFontSizeBreakpoint || DEFAULT_TITLE_FONT_SIZE_BREAKPOINT;

  const spacingBreakpoint =
    styles?.spacingBreakpoint || DEFAULT_SPACING_BREAKPOINT;

  const slideByBreakpoint =
    styles?.slideByBreakpoint || DEFAULT_SLIDE_BY_BREAKPOINT;

  const shadowWidthBreakpoint =
    styles?.shadowWidthBreakpoint || DEFAULT_SHADOW_WIDTH_BREAKPOINT;
  const peekBreakpoint = styles?.peekBreakpoint || DEFAULT_PEEK_BREAKPOINT;
  const shadowOverlay = styles.shadowOverlay || {};
  // Responsive peek value (pixels)
  const effectivePeek = useMemo(() => {
    if (!mounted || !peekBreakpoint) return 0;
    if (isXs) return peekBreakpoint.xs ?? 0;
    if (isSm) return peekBreakpoint.sm ?? 0;
    if (isMd) return peekBreakpoint.md ?? 0;
    if (isLg) return peekBreakpoint.lg ?? 0;
    if (isXl) return peekBreakpoint.xl ?? 0;
    return 0;
  }, [mounted, peekBreakpoint, isXs, isSm, isMd, isLg, isXl]);
  const extractedShadowOverlay = {
    show: shadowOverlay.show ?? DEFAULT_SHADOW_OVERLAY.show,
    width: shadowOverlay.width || DEFAULT_SHADOW_OVERLAY.width,
    backgroundColor:
      shadowOverlay.backgroundColor || DEFAULT_SHADOW_OVERLAY.backgroundColor,
    opacity: shadowOverlay.opacity ?? DEFAULT_SHADOW_OVERLAY.opacity,
  };

  // Responsive shadow width
  const effectiveShadowWidth = useMemo(() => {
    if (!mounted || !shadowWidthBreakpoint) return extractedShadowOverlay.width;
    if (isXs) return shadowWidthBreakpoint.xs ?? extractedShadowOverlay.width;
    if (isSm) return shadowWidthBreakpoint.sm ?? extractedShadowOverlay.width;
    if (isMd) return shadowWidthBreakpoint.md ?? extractedShadowOverlay.width;
    if (isLg) return shadowWidthBreakpoint.lg ?? extractedShadowOverlay.width;
    if (isXl) return shadowWidthBreakpoint.xl ?? extractedShadowOverlay.width;
    return extractedShadowOverlay.width;
  }, [
    mounted,
    shadowWidthBreakpoint,
    extractedShadowOverlay.width,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  ]);
  // Responsive arrow visibility
  const hideArrows = useMemo(() => {
    if (presetName === "InlineFeature") return true;
    if (!mounted || !hideArrowsBreakpoint) return false;
    if (isXs) return hideArrowsBreakpoint.xs ?? false;
    if (isSm) return hideArrowsBreakpoint.sm ?? false;
    if (isMd) return hideArrowsBreakpoint.md ?? false;
    if (isLg) return hideArrowsBreakpoint.lg ?? false;
    if (isXl) return hideArrowsBreakpoint.xl ?? false;
    return false;
  }, [mounted, hideArrowsBreakpoint, isXs, isSm, isMd, isLg, isXl, presetName]);

  const effectiveVisibleSlides = useMemo(() => {
    if (!mounted) return visibleSlides;

    const getValue = (val?: number, key?: string) => {
      if (presetName === "16x9TopTen" && key !== "xs") {
        return (val ?? DEFAULT_VISIBLE_SLIDES) - 1;
      }
      return val ?? visibleSlides;
    };

    if (isXs) return getValue(visibleSlidesBreakpoints.xs, "xs");
    if (isSm) return getValue(visibleSlidesBreakpoints.sm, "sm");
    if (isMd) return getValue(visibleSlidesBreakpoints.md, "md");
    if (isLg) return getValue(visibleSlidesBreakpoints.lg, "lg");
    if (isXl) return getValue(visibleSlidesBreakpoints.xl, "xl");

    return visibleSlides;
  }, [
    mounted,
    presetName,
    visibleSlidesBreakpoints,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    visibleSlides,
  ]);

  const effectiveSlideBy = useMemo(() => {
    if (!mounted) return slideBy;

    const getValue = (val?: number, key?: string) => {
      if (presetName === "16x9TopTen" && key !== "xs") {
        return (
          (val ??
            DEFAULT_SLIDE_BY_BREAKPOINT[
              key as keyof typeof DEFAULT_SLIDE_BY_BREAKPOINT
            ]) - 1
        );
      }
      return val ?? slideBy;
    };

    if (isXs) return getValue(slideByBreakpoint?.xs, "xs");
    if (isSm) return getValue(slideByBreakpoint?.sm, "sm");
    if (isMd) return getValue(slideByBreakpoint?.md, "md");
    if (isLg) return getValue(slideByBreakpoint?.lg, "lg");
    if (isXl) return getValue(slideByBreakpoint?.xl, "xl");

    return slideBy;
  }, [
    mounted,
    presetName,
    slideByBreakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    slideBy,
  ]);

  // Responsive spacing
  const effectiveSpacing = useMemo(() => {
    if (!mounted || !spacingBreakpoint) return spacing;
    if (isXs) return spacingBreakpoint?.xs ?? spacing;
    if (isSm) return spacingBreakpoint?.sm ?? spacing;
    if (isMd) return spacingBreakpoint?.md ?? spacing;
    if (isLg) return spacingBreakpoint?.lg ?? spacing;
    if (isXl) return spacingBreakpoint?.xl ?? spacing;
    return spacing;
  }, [mounted, spacingBreakpoint, isXs, isSm, isMd, isLg, isXl, spacing]);

  // Responsive slideBy

  // scroll function
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    // Calculate item width in px
    const itemWidth =
      (container.offsetWidth -
        (effectiveVisibleSlides - 1) * effectiveSpacing -
        2 * effectivePeek) /
      effectiveVisibleSlides;
    const scrollAmount = (itemWidth + effectiveSpacing) * effectiveSlideBy;

    const isAtStart = container.scrollLeft === 0;
    const isAtEnd =
      container.scrollLeft + container.offsetWidth >= container.scrollWidth - 5;

    if (direction === "right") {
      container.scrollTo({
        left: isAtEnd ? 0 : container.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        left: isAtStart
          ? container.scrollWidth
          : container.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const {
    titleStyle = {},
    containerStyle = {},
    buttonStyle = {},
    scrollContainerStyle = {},
  } = styles;

  const extractedTitleStyle = {
    fontFamily: titleStyle.fontFamily || DEFAULT_TITLE_STYLE.fontFamily,
    fontSize: (() => {
      if (!mounted || !titleFontSizeBreakpoint)
        return titleStyle.fontSize || DEFAULT_TITLE_STYLE.fontSize;
      if (isXs)
        return (
          titleFontSizeBreakpoint.xs ??
          titleStyle.fontSize ??
          DEFAULT_TITLE_STYLE.fontSize
        );
      if (isSm)
        return (
          titleFontSizeBreakpoint.sm ??
          titleStyle.fontSize ??
          DEFAULT_TITLE_STYLE.fontSize
        );
      if (isMd)
        return (
          titleFontSizeBreakpoint.md ??
          titleStyle.fontSize ??
          DEFAULT_TITLE_STYLE.fontSize
        );
      if (isLg)
        return (
          titleFontSizeBreakpoint.lg ??
          titleStyle.fontSize ??
          DEFAULT_TITLE_STYLE.fontSize
        );
      if (isXl)
        return (
          titleFontSizeBreakpoint.xl ??
          titleStyle.fontSize ??
          DEFAULT_TITLE_STYLE.fontSize
        );
      return titleStyle.fontSize || DEFAULT_TITLE_STYLE.fontSize;
    })(),
    fontWeight: titleStyle.fontWeight || DEFAULT_TITLE_STYLE.fontWeight,
    color: titleStyle.color || DEFAULT_TITLE_STYLE.color,
    marginBottom: titleStyle.marginBottom || DEFAULT_TITLE_STYLE.marginBottom,
    marginLeft: (() => {
      const defaultMargin =
        titleStyle.marginLeft ?? DEFAULT_TITLE_STYLE.marginLeft;
      if (!mounted) return defaultMargin;
      if (isXs) return DEFAULT_TITLE_MARGIN_LEFT_BREAKPOINT.xs ?? defaultMargin;
      if (isSm) return DEFAULT_TITLE_MARGIN_LEFT_BREAKPOINT.sm ?? defaultMargin;
      if (isMd) return DEFAULT_TITLE_MARGIN_LEFT_BREAKPOINT.md ?? defaultMargin;
      if (isLg) return DEFAULT_TITLE_MARGIN_LEFT_BREAKPOINT.lg ?? defaultMargin;
      if (isXl) return DEFAULT_TITLE_MARGIN_LEFT_BREAKPOINT.xl ?? defaultMargin;
      return defaultMargin;
    })(),
  };

  const extractedContainerStyle = {
    paddingX: containerStyle.paddingX || DEFAULT_CONTAINER_STYLE.paddingX,
    backgroundColor:
      containerStyle.backgroundColor || DEFAULT_CONTAINER_STYLE.backgroundColor,
    borderRadius:
      containerStyle.borderRadius || DEFAULT_CONTAINER_STYLE.borderRadius,
  };

  const extractedButtonStyle = {
    color: buttonStyle.color || DEFAULT_BUTTON_STYLE.color,
    backgroundColor:
      buttonStyle.backgroundColor || DEFAULT_BUTTON_STYLE.backgroundColor,
    hoverColor: buttonStyle.hoverColor || DEFAULT_BUTTON_STYLE.hoverColor,
    hoverScale: buttonStyle.hoverScale || DEFAULT_BUTTON_STYLE.hoverScale,
    size: buttonStyle.size || DEFAULT_BUTTON_STYLE.size,
    borderRadius: buttonStyle.borderRadius || DEFAULT_BUTTON_STYLE.borderRadius,
    padding: buttonStyle.padding || DEFAULT_BUTTON_STYLE.padding,
    leftArrowIcon:
      buttonStyle.leftArrowIcon || DEFAULT_BUTTON_STYLE.leftArrowIcon,
    rightArrowIcon:
      buttonStyle.rightArrowIcon || DEFAULT_BUTTON_STYLE.rightArrowIcon,
    leftIconOffsetX:
      buttonStyle.leftIconOffsetX || DEFAULT_BUTTON_STYLE.leftIconOffsetX,
    leftIconOffsetY:
      buttonStyle.leftIconOffsetY || DEFAULT_BUTTON_STYLE.leftIconOffsetY,
    rightIconOffsetX:
      buttonStyle.rightIconOffsetX || DEFAULT_BUTTON_STYLE.rightIconOffsetX,
    rightIconOffsetY:
      buttonStyle.rightIconOffsetY || DEFAULT_BUTTON_STYLE.rightIconOffsetY,
  };

  const extractedScrollContainerStyle = {
    paddingX: (() => {
      const px =
        scrollContainerStyle.paddingX ||
        DEFAULT_SCROLL_CONTAINER_STYLE.paddingX;
      if (!mounted || typeof px !== "object") return px;

      if (isXs) return px.xs ?? 0;
      if (isSm) return px.sm ?? 0;
      if (isMd) return px.md ?? 0;
      if (isLg) return px.lg ?? 0;
      if (isXl) return px.xl ?? 0;
      return 0;
    })(),
    backgroundColor:
      scrollContainerStyle.backgroundColor ||
      DEFAULT_SCROLL_CONTAINER_STYLE.backgroundColor,
    borderRadius:
      scrollContainerStyle.borderRadius ||
      DEFAULT_SCROLL_CONTAINER_STYLE.borderRadius,
    scrollbarHidden:
      scrollContainerStyle.scrollbarHidden ??
      DEFAULT_SCROLL_CONTAINER_STYLE.scrollbarHidden,
  };

  const LeftArrowIcon = extractedButtonStyle.leftArrowIcon ? (
    <Box
      component="img"
      src={extractedButtonStyle.leftArrowIcon}
      alt="Left Arrow"
      sx={{
        width: extractedButtonStyle.size,
        height: extractedButtonStyle.size,
        transition: "transform 0.2s ease",
      }}
    />
  ) : (
    <ChevronLeftIcon
      sx={{
        fontSize: extractedButtonStyle.size,
        transition: "transform 0.2s ease",
      }}
    />
  );

  const RightArrowIcon = extractedButtonStyle.rightArrowIcon ? (
    <Box
      component="img"
      src={extractedButtonStyle.rightArrowIcon}
      alt="Right Arrow"
      sx={{
        width: extractedButtonStyle.size,
        height: extractedButtonStyle.size,
        transition: "transform 0.2s ease",
      }}
    />
  ) : (
    <ChevronRightIcon
      sx={{
        fontSize: extractedButtonStyle.size,
        transition: "transform 0.2s ease",
      }}
    />
  );

  return (
    <Box
      className={className}
      style={customStyle}
      sx={{
        px: extractedContainerStyle.paddingX,
        backgroundColor: extractedContainerStyle.backgroundColor,
        borderRadius: extractedContainerStyle.borderRadius,
      }}
    >
      {presetName !== "InlineFeature" ? (
        title && (
          <Box
            sx={{
              fontFamily: extractedTitleStyle.fontFamily,
              fontSize: extractedTitleStyle.fontSize,
              fontWeight: extractedTitleStyle.fontWeight,
              color: extractedTitleStyle.color,
              mb: extractedTitleStyle.marginBottom,
              ml: extractedTitleStyle.marginLeft,
            }}
          >
            {title}
          </Box>
        )
      ) : (
        <Box
          sx={{
            height: extractedTitleStyle.fontSize,
            mb: extractedTitleStyle.marginBottom,
          }}
        />
      )}

      <Box
        position="relative"
        sx={{
          "&:hover .slider-arrow": {
            opacity: 1,
            pointerEvents: "auto",
          },
        }}
      >
        {extractedShadowOverlay.show && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: effectiveShadowWidth,
                backgroundColor: extractedShadowOverlay.backgroundColor,
                opacity: extractedShadowOverlay.opacity,
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: effectiveShadowWidth,
                backgroundColor: extractedShadowOverlay.backgroundColor,
                opacity: extractedShadowOverlay.opacity,
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {!hideArrows && (
          <IconButton
            className="slider-arrow"
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: extractedButtonStyle.leftIconOffsetX,
              zIndex: 4,
              transform: `translate(0, calc(-50% + ${extractedButtonStyle.leftIconOffsetY}px))`,
              color: extractedButtonStyle.color,
              backgroundColor: extractedButtonStyle.backgroundColor,
              borderRadius: extractedButtonStyle.borderRadius,
              padding: extractedButtonStyle.padding,
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.3s ease",
              "&:hover": {
                color:
                  extractedButtonStyle.hoverColor || extractedButtonStyle.color,
                backgroundColor: extractedButtonStyle.backgroundColor,
              },
              "&:hover .MuiSvgIcon-root, &:hover img": {
                transform: `scale(${extractedButtonStyle.hoverScale})`,
              },
            }}
          >
            {LeftArrowIcon}
          </IconButton>
        )}

        <Box
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            gap: `${effectiveSpacing}px`,
            px: extractedScrollContainerStyle.paddingX,
            backgroundColor: extractedScrollContainerStyle.backgroundColor,
            borderRadius: extractedScrollContainerStyle.borderRadius,
            "&::-webkit-scrollbar": {
              display: extractedScrollContainerStyle.scrollbarHidden
                ? "none"
                : "block",
              width: extractedScrollContainerStyle.scrollbarHidden
                ? undefined
                : "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: extractedScrollContainerStyle.scrollbarHidden
                ? undefined
                : "#888",
              borderRadius: extractedScrollContainerStyle.scrollbarHidden
                ? undefined
                : "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: extractedScrollContainerStyle.scrollbarHidden
                ? undefined
                : "#555",
            },
            userSelect: "none",
            cursor: "grab",
            WebkitUserSelect: "none",
            "&:active": {
              cursor: "grabbing",
            },
          }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex:
                  presetName === "InlineFeature"
                    ? "0 0 100%"
                    : `0 0 calc(${
                        100 / effectiveVisibleSlides
                      }% - ${effectiveSpacing}px)`,
                scrollSnapAlign: "center",
              }}
            >
              {renderItem(item, index)}
            </Box>
          ))}
        </Box>
        {!hideArrows && (
          <IconButton
            className="slider-arrow"
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: extractedButtonStyle.rightIconOffsetX,
              zIndex: 4,
              transform: `translate(0, calc(-50% + ${extractedButtonStyle.rightIconOffsetY}px))`,
              color: extractedButtonStyle.color,
              backgroundColor: extractedButtonStyle.backgroundColor,
              borderRadius: extractedButtonStyle.borderRadius,
              padding: extractedButtonStyle.padding,
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.3s ease",
              "&:hover": {
                color:
                  extractedButtonStyle.hoverColor || extractedButtonStyle.color,
                backgroundColor: extractedButtonStyle.backgroundColor,
              },
              "&:hover .MuiSvgIcon-root, &:hover img": {
                transform: `scale(${extractedButtonStyle.hoverScale})`,
              },
            }}
          >
            {RightArrowIcon}
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default HorizontalSlider;
