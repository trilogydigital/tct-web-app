import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type GridSize = boolean | number;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  rowSpacing?: number;
  columnSpacing?: number;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  style?: CSSProperties;
  className?: string;
  breakpoints?: Partial<Record<Breakpoint, number>>;
}
