import type { ReactNode, CSSProperties } from "react";

export interface HorizontalSliderSpacingByBreakpoint {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface HorizontalSliderSlideByByBreakpoint {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface HorizontalSliderTitleStyle {
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  marginBottom?: number;
  marginLeft?: number;
}

export interface HorizontalSliderContainerStyle {
  paddingX?: number;
  backgroundColor?: string;
  borderRadius?: string;
}

export interface HorizontalSliderShadowOverlay {
  show?: boolean;
  width?: string;
  backgroundColor?: string;
  opacity?: number;
  widthBreakpoint?: ShadowWidthByBreakpoint;
}

export interface ShadowWidthByBreakpoint {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface HorizontalSliderButtonStyle {
  color?: string;
  backgroundColor?: string;
  hoverColor?: string;
  hoverScale?: number;
  size?: number;
  borderRadius?: string;
  padding?: number;
  leftArrowIcon?: string;
  rightArrowIcon?: string;
  leftIconOffsetX?: number;
  leftIconOffsetY?: number;
  rightIconOffsetX?: number;
  rightIconOffsetY?: number;
}

export interface HorizontalSliderScrollContainerStyle {
  paddingX?: number;
  backgroundColor?: string;
  borderRadius?: string;
  scrollbarHidden?: boolean;
}

export interface HorizontalSliderResponsiveBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface TitleFontSizeByBreakpoint {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
}

export interface HorizontalSliderStyles {
  titleStyle?: HorizontalSliderTitleStyle;
  containerStyle?: HorizontalSliderContainerStyle;
  shadowOverlay?: HorizontalSliderShadowOverlay;
  buttonStyle?: HorizontalSliderButtonStyle;
  scrollContainerStyle?: HorizontalSliderScrollContainerStyle;
  visibleSlidesBreakpoints?: HorizontalSliderResponsiveBreakpoints;
  titleFontSizeBreakpoint?: TitleFontSizeByBreakpoint;
  spacingBreakpoint?: HorizontalSliderSpacingByBreakpoint;
  slideByBreakpoint?: HorizontalSliderSlideByByBreakpoint;
  shadowWidthBreakpoint?: ShadowWidthByBreakpoint;
  peekBreakpoint?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface HorizontalSliderProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  visibleSlides?: number;
  spacing?: number;
  slideBy?: number;
  className?: string;
  customStyle?: CSSProperties;
  title?: string;
  styles?: HorizontalSliderStyles;
  hideArrowsBreakpoint?: {
    xs?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
  };
  presetName?: string;
}
