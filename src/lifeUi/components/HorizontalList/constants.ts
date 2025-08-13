export const HORIZONTAL_LIST_DEFAULTS = {
  gap: 2,
  scrollMultiplierMouse: 2,
  scrollMultiplierTouch: 1.5,
  paddingBottom: "4px",
};

export const HORIZONTAL_LIST_STYLES = {
  scrollContainer: {
    position: "relative" as const,
    width: "100%",
    overflow: "hidden" as const,
  },
  scrollableContent: {
    display: "flex",
    overflowX: "auto" as const,
    overflowY: "hidden" as const,
    scrollBehavior: "smooth" as const,
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
    cursor: "grab" as const,
    "&:active": { cursor: "grabbing" as const },
  },
};
