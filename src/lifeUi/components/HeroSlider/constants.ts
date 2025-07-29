// Default values for HeroSlider component
export const HERO_SLIDER_DEFAULTS = {
  autoPlay: true,
  interval: 5000,
  styles: {
    // NEW: CTA Button Padding Defaults
    ctaButtonPadding: "8px 16px", // Default padding
    ctaButtonPaddingX: 16, // Horizontal padding
    ctaButtonPaddingY: 8, // Vertical padding
  },
  imageKeySelect: "imgFeaturedCarousel16x6",
  imageKeyText: "",
  imageKeySrc: "",
  aspectRatio: "16:9" as const,
  secondaryImage: {
    show: false,
    keySelect: "",
    keyText: "",
    src: "",
    position: "bottom-right" as const,
    width: "40px",
    height: "40px",
    offsetX: 0,
    offsetY: 0,
  },
  arrowStyle: {
    leftArrowIcon: "",
    rightArrowIcon: "",
    backgroundColor: "rgba(255,255,255,0.8)",
    hoverBackgroundColor: "rgba(255,255,255,1)",
    color: "rgba(0,0,0,0.87)",
    hoverColor: "rgba(0,0,0,0.87)",
    size: "small",
    borderRadius: "50%",
    padding: 1,
    leftOffsetX: 16,
    leftOffsetY: 0,
    rightOffsetX: 16,
    rightOffsetY: 0,
    hoverScale: 1.1,
  },
  // NEW: Pagination Style Defaults
  paginationStyle: {
    show: true,
    position: "bottom-center" as const,
    offsetX: 0,
    offsetY: 20, // 20px from bottom
    dotSize: "12px",
    dotSpacing: "8px",
    dotColor: "rgba(255,255,255,0.5)",
    activeDotColor: "#ffffff",
    dotBorderRadius: "50%",
    dotOpacity: 0.5,
    activeDotOpacity: 1,
    hoverDotColor: "rgba(255,255,255,0.8)",
    dotBorder: "none",
    activeDotBorder: "none",
    backgroundColor: "transparent",
    containerPadding: "8px 16px",
    containerBorderRadius: "20px",
  },
};
