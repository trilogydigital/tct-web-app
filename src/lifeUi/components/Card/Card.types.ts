export type CardAspectRatio = "20:9" | "16:9" | "16:6" | "2:3";

export type Position =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface PositionOffsets {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface BorderRadius {
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
}

export interface BorderStyle {
  color?: string;
  width?: number;
  style?: "solid" | "dashed" | "dotted";
  radius?: string | BorderRadius;
}

export interface CardTag {
  label: string;
  color?: string;
  backgroundColor?: string;
  position?: Position;
  size?: number;
  margin?: string;
  border?: BorderStyle;
}

export interface CardIcon {
  iconUrl: string;
  position?: Position;
  color?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  size?: number;
  margin?: string;
  border?: BorderStyle;
}

export interface SecondaryImage {
  src?: string;
  imageKey?: string;
  position?: Position;
  size?: {
    width?: number | string;
    height?: number | string;
  };
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  opacity?: number;
  blend?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion";
  margin?: string;
  zIndex?: number;
  backgroundSize?: "cover" | "contain" | "auto" | string;
  backgroundRepeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  backgroundPosition?: string;
  backgroundColor?: string;
  mainImageWidth?: string;
  mainImageHeight?: string;
  mainImageTop?: string;
  mainImageRight?: string;
  mainImageBottom?: string;
  mainImageLeft?: string;
  mainImageBorderRadius?: string;
  mainImageOpacity?: number;
}

export interface MediaItem {
  key: string;
  src: string | null;
}

export interface MediaGroup {
  type: string;
  media_item: MediaItem[];
}

export interface CardEntry {
  title: string;
  summary?: string;
  media_group?: MediaGroup[];
  type?: { value: string };
  content?: { type: string };
  id?: string;
  extensions?: {
    [key: string]: unknown;
  };
  tags?: string[];
  link?: { rel: string; href: string };
}

export interface CardProps {
  entry: CardEntry;
  tags?: CardTag[];
  icons?: CardIcon[];
  secondaryImage?: SecondaryImage;
  aspectRatio?: CardAspectRatio;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  isEnhanced?: boolean;
  isEpisode?: boolean;
  showTitle?: boolean;
  onClick?: () => void;
  className?: string;
  customStyle?: React.CSSProperties;
  styles?: {
    border?: BorderStyle;
    hoverBorder?: BorderStyle;
    hoverScale?: number;
  };
  ImageKey?: string;
  positionOffsets?: PositionOffsets;
  useSecondaryAsBackground?: boolean;
  maxWidth?: number | string;
  titleKey?: string;
  descriptionKey?: string;
}
