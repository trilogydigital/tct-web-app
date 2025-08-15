import type {
  ApiEntry,
  PlaylistData,
} from "../components/HeroSection/HeroSection.types";

/**
 * Get image URL from ApiEntry or PlaylistData based on various key strategies
 * Specifically designed for HeroSection component
 */
export const getHeroImageUrl = (
  item: ApiEntry | PlaylistData,
  keySelect: string,
  keyText: string,
  srcUrl: string,
  fallbackKey?: string
): string => {
  if (srcUrl && srcUrl.trim() !== "") {
    return srcUrl;
  }

  if (keyText && keyText.trim() !== "") {
    // For PlaylistData, check extensions directly first
    if (
      item.extensions?.[keyText.trim()] &&
      typeof item.extensions[keyText.trim()] === "string"
    ) {
      return item.extensions[keyText.trim()] as string;
    }

    // Check media_group if it exists (for ApiEntry)
    if ("media_group" in item) {
      const imageGroup = item.media_group?.find(
        (group) => group.type === "image"
      );
      const customKeyMedia = imageGroup?.media_item?.find(
        (media) => media.key === keyText.trim()
      );
      if (customKeyMedia?.src) {
        return customKeyMedia.src;
      }
    }
  }

  if (keySelect) {
    // For PlaylistData, check extensions directly first
    if (
      item.extensions?.[keySelect] &&
      typeof item.extensions[keySelect] === "string"
    ) {
      return item.extensions[keySelect] as string;
    }

    // Check media_group if it exists (for ApiEntry)
    if ("media_group" in item) {
      const imageGroup = item.media_group?.find(
        (group) => group.type === "image"
      );
      const selectedMedia = imageGroup?.media_item?.find(
        (media) => media.key === keySelect
      );
      if (selectedMedia?.src) {
        return selectedMedia.src;
      }

      if (fallbackKey && imageGroup?.media_item) {
        const fallbackMedia = imageGroup.media_item.find(
          (media) => media.key === fallbackKey
        );
        if (fallbackMedia?.src) {
          return fallbackMedia.src;
        }
      }
    }
  }

  return "";
};

/**
 * Get text value by key from ApiEntry or PlaylistData with dot notation support
 * Specifically designed for HeroSection component
 */
export const getHeroTextValueByKey = (
  item: ApiEntry | PlaylistData,
  key: string,
  fallbackValue: string
): string => {
  if (!key || key.trim() === "") {
    return fallbackValue;
  }

  const trimmedKey = key.trim();

  // First, check in extensions
  if (item.extensions?.[trimmedKey]) {
    const value = item.extensions[trimmedKey];
    if (typeof value === "string") {
      return value;
    }
  }

  // Fallback to dot notation for nested properties
  try {
    const keys = trimmedKey.split(".");
    let current: unknown = item;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        // TypeScript: current is object, so we can safely index
        current = (current as Record<string, unknown>)[k];
      } else {
        return fallbackValue; // Key path doesn't exist
      }
    }

    return typeof current === "string" ? current : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

/**
 * Get secondary image position styles with offset support
 * Specifically for HeroSection secondary image positioning
 */
export const getHeroSecondaryImagePosition = (
  position: string,
  offsetX: number = 0,
  offsetY: number = 0
) => {
  const anchors: {
    [key: string]: {
      top?: number | string;
      left?: number | string;
      right?: number | string;
      bottom?: number | string;
      transform?: string;
    };
  } = {
    "top-left": { top: 16, left: 16 },
    "top-right": { top: 16, right: 16 },
    "bottom-left": { bottom: 16, left: 16 },
    "bottom-right": { bottom: 16, right: 16 },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  };

  const base = { ...(anchors[position] || anchors["bottom-right"]) };

  if (position !== "center") {
    if (base.left !== undefined)
      base.left = `calc(${base.left}px + ${offsetX}px)`;
    if (base.right !== undefined)
      base.right = `calc(${base.right}px + ${offsetX}px)`;
    if (base.top !== undefined) base.top = `calc(${base.top}px + ${offsetY}px)`;
    if (base.bottom !== undefined)
      base.bottom = `calc(${base.bottom}px + ${offsetY}px)`;
  } else {
    base.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  }

  return base;
};
