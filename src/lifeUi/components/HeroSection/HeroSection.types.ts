export interface ApiEntryMediaItem {
  key: string;
  src: string | null;
}

export interface ApiEntryMediaGroup {
  type: string;
  media_item: ApiEntryMediaItem[];
}

export interface ApiEntry {
  id?: string;
  title: string;
  summary?: string;
  media_group?: ApiEntryMediaGroup[];
  type?: { value: string };
  content?: { type: string };
  extensions?: {
    [key: string]: unknown;
  };
  tags?: string[];
  link?: {
    rel: string;
    href: string;
  };
}

// New interface for playlist-level data
export interface PlaylistData {
  id?: string;
  title: string;
  summary?: string;
  extensions?: {
    [key: string]: unknown;
  };
  entry?: ApiEntry[];
}

export interface HeroSectionStyles {
  titleFontSize?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  titleColor?: string;
  descriptionFontSize?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  descriptionColor?: string;
  ctaButtonColor?: string;
  ctaButtonBg?: string;
  ctaButtonHoverBg?: string;
  overlayBackground?: string;
  paddingLeft?: number;
  spacingBetweenText?: number;
  responsivePaddingLeft?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  titleFontWeight?: string | number;
  titleFontFamily?: string;
  titleMarginBottom?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  titleMarginLeft?: number | string;
  descriptionFontFamily?: string;
  descriptionFontWeight?: string | number;
  descriptionMarginBottom?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  descriptionMarginLeft?: number | string;
  ctaButtonBorderRadius?: number | string;
  ctaButtonFontSize?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  ctaButtonFontWeight?: string | number;

  // NEW: CTA Button Padding Controls
  ctaButtonPadding?: string | number;
  ctaButtonPaddingX?: string | number;
  ctaButtonPaddingY?: string | number;
  ctaMarginBottom?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  secondaryImageMarginTop?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
  secondaryImageMarginBottom?:
    | string
    | number
    | {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };

  showTitle?: boolean;
  showDescription?: boolean;
  showButton?: boolean;

  // Key-based text controls
  titleKey?: string;
  descriptionKey?: string;
  ctaKey?: string;
}

// Secondary Image Props
export interface SecondaryImageProps {
  show?: boolean;
  keySelect?: string;
  keyText?: string;
  src?: string;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  width?: string;
  height?: string;
  offsetX?: number;
  offsetY?: number;
}

// Main Props - Updated to accept both entry and playlistData
export interface HeroSectionProps {
  id?: string;
  entry?: ApiEntry;
  playlistData?: PlaylistData;
  imageUrl?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryImageUrl?: string;
  styles?: HeroSectionStyles;

  // Background Image Controls
  imageKeySelect?: string;
  imageKeyText?: string;
  imageKeySrc?: string;

  aspectRatio?: "16:9" | "16:6" | "4:3" | "21:9" | "1:1";
  secondaryImage?: SecondaryImageProps;
}
