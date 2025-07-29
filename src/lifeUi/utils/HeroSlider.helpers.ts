import type {
  ApiEntry,
  HeroSlide,
  HeroSliderStyles,
} from "../components/HeroSlider/HeroSlider.types";

/**
 * Get image URL from ApiEntry based on various key strategies
 */
export const getImageUrl = (
  item: ApiEntry,
  keySelect: string,
  keyText: string,
  srcUrl: string,
  fallbackKey?: string
): string => {
  if (srcUrl && srcUrl.trim() !== "") {
    return srcUrl;
  }

  if (keyText && keyText.trim() !== "") {
    const imageGroup = item.media_group?.find(
      (group) => group.type === "image"
    );
    const customKeyMedia = imageGroup?.media_item?.find(
      (media) => media.key === keyText.trim()
    );
    if (customKeyMedia?.src) {
      return customKeyMedia.src;
    }
    if (
      item.extensions?.[keyText.trim()] &&
      typeof item.extensions[keyText.trim()] === "string"
    ) {
      return item.extensions[keyText.trim()] as string;
    }
  }

  if (keySelect) {
    const imageGroup = item.media_group?.find(
      (group) => group.type === "image"
    );
    const selectedMedia = imageGroup?.media_item?.find(
      (media) => media.key === keySelect
    );
    if (selectedMedia?.src) {
      return selectedMedia.src;
    }
    if (
      item.extensions?.[keySelect] &&
      typeof item.extensions[keySelect] === "string"
    ) {
      return item.extensions[keySelect] as string;
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

  return "";
};

/**
 * Get text value by key from ApiEntry with dot notation support
 */
export const getTextValueByKey = (
  item: ApiEntry,
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
 * Transform ApiEntry array to HeroSlide array
 */
export const transformEntryToSlides = (
  entryData: ApiEntry[],
  imageKeySelect: string,
  imageKeyText: string,
  imageKeySrc: string,
  showSecondaryImage: boolean,
  secondaryImageKeySelect: string,
  secondaryImageKeyText: string,
  secondaryImageSrc: string,
  styles: HeroSliderStyles
): HeroSlide[] => {
  return entryData.map((item) => {
    const backgroundImage = getImageUrl(
      item,
      imageKeySelect,
      imageKeyText,
      imageKeySrc,
      "640"
    );

    let secondaryImageUrl = "";
    if (showSecondaryImage) {
      const userProvided =
        (secondaryImageKeySelect && secondaryImageKeySelect.trim() !== "") ||
        (secondaryImageKeyText && secondaryImageKeyText.trim() !== "") ||
        (secondaryImageSrc && secondaryImageSrc.trim() !== "");
      if (userProvided) {
        secondaryImageUrl = getImageUrl(
          item,
          secondaryImageKeySelect,
          secondaryImageKeyText,
          secondaryImageSrc
        );
        if (!secondaryImageUrl) {
          secondaryImageUrl = getImageUrl(item, "320", "", "");
        }
      }
    }

    // Use key-based text extraction
    const baseTitle = item.title || "";
    const baseDescription = item.summary || "";
    const baseCta =
      typeof item.extensions?.watchButtonLabel === "string"
        ? item.extensions.watchButtonLabel
        : "Watch Now";

    const finalTitle = styles.titleKey
      ? getTextValueByKey(item, styles.titleKey, baseTitle)
      : baseTitle;

    const finalDescription = styles.descriptionKey
      ? getTextValueByKey(item, styles.descriptionKey, baseDescription)
      : baseDescription;

    const finalCtaText = styles.ctaKey
      ? getTextValueByKey(item, styles.ctaKey, baseCta)
      : baseCta;

    return {
      id: item.id || "unknown",
      imageUrl: backgroundImage,
      title: finalTitle,
      description: finalDescription,
      ctaText: finalCtaText,
      ctaLink: item.link?.href || "#",
      secondaryImageUrl,
    };
  });
};

/**
 * Get secondary image position styles with offset support
 */
export const getSecondaryImagePosition = (
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

/**
 * NEW: Get pagination position styles with offset support
 */
export const getPaginationPosition = (
  position: string,
  offsetX: number = 0,
  offsetY: number = 0
) => {
  const anchors: {
    [key: string]: {
      top?: string;
      left?: string;
      right?: string;
      bottom?: string;
      transform?: string;
    };
  } = {
    "bottom-center": {
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-left": {
      bottom: "20px",
      left: "20px",
    },
    "bottom-right": {
      bottom: "20px",
      right: "20px",
    },
    "top-center": {
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "top-left": {
      top: "20px",
      left: "20px",
    },
    "top-right": {
      top: "20px",
      right: "20px",
    },
  };

  const base = { ...(anchors[position] || anchors["bottom-center"]) };

  // Apply offsets
  if (position.includes("center")) {
    // For center positions, adjust the transform
    if (position.includes("bottom")) {
      base.bottom = `calc(20px + ${offsetY}px)`;
      base.transform = `translateX(calc(-50% + ${offsetX}px))`;
    } else if (position.includes("top")) {
      base.top = `calc(20px + ${offsetY}px)`;
      base.transform = `translateX(calc(-50% + ${offsetX}px))`;
    }
  } else {
    // For corner positions
    if (base.left !== undefined) {
      base.left = `calc(20px + ${offsetX}px)`;
    }
    if (base.right !== undefined) {
      base.right = `calc(20px + ${offsetX}px)`;
    }
    if (base.top !== undefined) {
      base.top = `calc(20px + ${offsetY}px)`;
    }
    if (base.bottom !== undefined) {
      base.bottom = `calc(20px + ${offsetY}px)`;
    }
  }

  return base;
};
