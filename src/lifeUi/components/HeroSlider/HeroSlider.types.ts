// API Related Types
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

// Slide Types
export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryImageUrl?: string;
}

// Style Options - UPDATED with key-based text controls and CTA padding
export interface HeroSliderStyles {
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
  ctaButtonPaddingX?: string | number; // Horizontal padding
  ctaButtonPaddingY?: string | number; // Vertical padding

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

// Arrow Style Props
export interface ArrowStyleProps {
  leftArrowIcon?: string;
  rightArrowIcon?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  color?: string;
  hoverColor?: string;
  size?: string | number;
  borderRadius?: string | number;
  padding?: string | number;
  leftOffsetX?: number;
  leftOffsetY?: number;
  rightOffsetX?: number;
  rightOffsetY?: number;
  hoverScale?: number;
}

// NEW: Pagination Style Props
export interface PaginationStyleProps {
  show?: boolean; // Show/hide pagination dots
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
  offsetX?: number; // Horizontal offset from anchor position
  offsetY?: number; // Vertical offset from anchor position
  dotSize?: string | number; // Size of individual dots
  dotSpacing?: string | number; // Space between dots
  dotColor?: string; // Color of inactive dots
  activeDotColor?: string; // Color of active dot
  dotBorderRadius?: string | number; // Border radius of dots
  dotOpacity?: number; // Opacity of inactive dots
  activeDotOpacity?: number; // Opacity of active dot
  hoverDotColor?: string; // Color on hover
  dotBorder?: string; // Border for dots (e.g., "1px solid #fff")
  activeDotBorder?: string; // Border for active dot
  backgroundColor?: string; // Background color for pagination container
  containerPadding?: string | number; // Padding around the dots container
  containerBorderRadius?: string | number; // Border radius for dots container
}

// Main Props
export interface HeroSliderProps {
  slides?: HeroSlide[];
  entry?: ApiEntry[];
  autoPlay?: boolean;
  interval?: number;
  styles?: HeroSliderStyles;

  // Background Image Controls
  imageKeySelect?: string;
  imageKeyText?: string;
  imageKeySrc?: string;

  // Aspect Ratio
  aspectRatio?: "16:9" | "16:6" | "4:3" | "21:9" | "1:1";

  // Secondary Image Controls
  secondaryImage?: SecondaryImageProps;

  // Arrow Style Controls
  arrowStyle?: ArrowStyleProps;

  // NEW: Pagination Style Controls
  paginationStyle?: PaginationStyleProps;
  // Callback for slide click
  onSlideClick?: (slideIndex: number) => void;
}
