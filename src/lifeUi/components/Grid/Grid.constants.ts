import type { Breakpoint, GridSize } from "./Grid.types";

export const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const SPACING_UNIT = 8;

export const DEFAULT_COLUMNS: Record<Breakpoint, GridSize> = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 5,
};
