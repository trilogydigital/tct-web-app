import type {
  CardProps,
  Position,
  PositionOffsets,
} from "../components/Card/Card.types";

export const getPositionStyles = (
  position: Position = "top-right",
  offsets?: PositionOffsets
) => {
  const defaultOffsets = {
    top: offsets?.top ?? 8,
    right: offsets?.right ?? 8,
    bottom: offsets?.bottom ?? 8,
    left: offsets?.left ?? 8,
  };

  const positions = {
    "top-left": { top: defaultOffsets.top, left: defaultOffsets.left },
    "top-right": { top: defaultOffsets.top, right: defaultOffsets.right },
    "top-center": {
      top: defaultOffsets.top,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-left": { bottom: defaultOffsets.bottom, left: defaultOffsets.left },
    "bottom-right": {
      bottom: defaultOffsets.bottom,
      right: defaultOffsets.right,
    },
    "bottom-center": {
      bottom: defaultOffsets.bottom,
      left: "50%",
      transform: "translateX(-50%)",
    },
  };
  return positions[position];
};

export const getAspectRatioValue = (aspectRatio: string) => {
  const ratios = {
    "20:9": 20 / 9,
    "16:9": 16 / 9,
    "16:6": 16 / 6,
    "16:3": 16 / 3,
  };
  return ratios[aspectRatio as keyof typeof ratios] || 16 / 9;
};

// export const getAspectRatioValue = (aspectRatio: string) => {
//   const [width, height] = aspectRatio.split(":").map(Number);
//   if (!isNaN(width) && !isNaN(height) && height !== 0) {
//     return width / height;
//   }
//   return 16 / 9; // fallback default
// };

/**
 * Enhanced image selection function that handles both aspect ratio and manual image key selection
 * @param mediaGroup - The media group containing image items
 * @param aspectRatio - The desired aspect ratio
 * @param ImageKey - Optional manual image key override
 * @returns The image URL or empty string if not found
 */
export const getImageForDisplay = (
  mediaGroup: NonNullable<CardProps["entry"]["media_group"]> | undefined,
  _aspectRatio: CardProps["aspectRatio"],
  ImageKey?: string
) => {
  // Add null safety for SSR
  if (!mediaGroup || !Array.isArray(mediaGroup)) return "";

  const imageMediaGroup = mediaGroup.find((group) => group?.type === "image");
  if (!imageMediaGroup?.media_item) return "";

  // Only return an image if ImageKey is provided
  if (ImageKey) {
    const manualImage = imageMediaGroup.media_item.find(
      (item) => item?.key === ImageKey
    );
    if (manualImage?.src) {
      return manualImage.src;
    }
    // Fallback to key '640' if ImageKey is provided but not found
    const fallbackImage = imageMediaGroup.media_item.find(
      (item) => item?.key === "640"
    );
    return fallbackImage?.src || "";
  }
  // If no ImageKey is provided, do not pre-select any image, return empty string
  return "";
};

/**
 * Get secondary image URL from media group based on imageKey or fallback to src
 * @param mediaGroup - The media group containing image items
 * @param secondaryImage - The secondary image configuration
 * @returns The secondary image URL or empty string if not found
 */
export const getSecondaryImageUrl = (
  mediaGroup: NonNullable<CardProps["entry"]["media_group"]> | undefined,
  secondaryImage: CardProps["secondaryImage"]
): string => {
  if (!secondaryImage) return "";

  // Priority 1: Use src if provided and non-empty
  if (secondaryImage.src && secondaryImage.src.trim() !== "") {
    return secondaryImage.src;
  }

  // Priority 2: Use imageKey (from text) if provided and non-empty
  if (
    secondaryImage.imageKey &&
    secondaryImage.imageKey.trim() !== "" &&
    mediaGroup &&
    Array.isArray(mediaGroup)
  ) {
    const imageMediaGroup = mediaGroup.find((group) => group?.type === "image");
    if (imageMediaGroup?.media_item) {
      const keyImage = imageMediaGroup.media_item.find(
        (item) =>
          item?.key === secondaryImage.imageKey &&
          !!item?.src && // filter out null or empty string
          item.src.trim() !== ""
      );
      if (keyImage?.src) {
        return keyImage.src;
      }
    }
  }

  // Priority 3: Use imageKey (from select) if provided and non-empty
  if (secondaryImage.imageKey && mediaGroup && Array.isArray(mediaGroup)) {
    const imageMediaGroup = mediaGroup.find((group) => group?.type === "image");
    if (imageMediaGroup?.media_item) {
      const keyImage = imageMediaGroup.media_item.find(
        (item) =>
          item?.key === secondaryImage.imageKey &&
          !!item?.src &&
          item.src.trim() !== ""
      );
      if (keyImage?.src) {
        return keyImage.src;
      }
    }
  }

  return "";
};

/**
 * Get all available image keys from the media group
 * @param mediaGroup - The media group containing image items
 * @returns Array of available image keys
 */
export const getAvailableImageKeys = (
  mediaGroup: NonNullable<CardProps["entry"]["media_group"]> | undefined
): string[] => {
  if (!mediaGroup || !Array.isArray(mediaGroup)) return [];

  const imageMediaGroup = mediaGroup.find((group) => group?.type === "image");
  if (!imageMediaGroup?.media_item) return [];

  return imageMediaGroup.media_item
    .map((item) => item?.key)
    .filter(Boolean) as string[];
};

export const getBorderRadius = (
  radius?:
    | string
    | {
        topLeft?: string;
        topRight?: string;
        bottomLeft?: string;
        bottomRight?: string;
      }
) => {
  if (!radius) return "16px";

  if (typeof radius === "string") {
    return radius;
  }

  // Handle individual corner radius
  const {
    topLeft = "0",
    topRight = "0",
    bottomLeft = "0",
    bottomRight = "0",
  } = radius;
  return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
};

/**
 * Helper function to validate and process secondary image properties
 * @param secondaryImage - The secondary image configuration
 * @param mediaGroup - The media group for resolving image keys
 * @returns Processed secondary image configuration or null if invalid
 */
export const processSecondaryImage = (
  secondaryImage: CardProps["secondaryImage"],
  mediaGroup?: NonNullable<CardProps["entry"]["media_group"]>
): (CardProps["secondaryImage"] & { resolvedSrc: string }) | null => {
  if (!secondaryImage) return null;

  const resolvedSrc = getSecondaryImageUrl(mediaGroup, secondaryImage);
  if (!resolvedSrc || resolvedSrc.trim() === "") return null;

  return {
    ...secondaryImage,
    resolvedSrc,
    position: secondaryImage.position || "top-right",
    size: {
      width: secondaryImage.size?.width || "auto",
      height: secondaryImage.size?.height || "auto",
    },
    opacity: Math.max(0, Math.min(1, secondaryImage.opacity ?? 1)),
    zIndex: secondaryImage.zIndex ?? 1,
    margin: secondaryImage.margin ?? "0",
    objectFit: secondaryImage.objectFit ?? "contain",
    blend: secondaryImage.blend ?? "normal",
  };
};
