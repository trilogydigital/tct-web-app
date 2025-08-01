import type { Breakpoint, GridSize } from "./Grid.types";

export const SPACING_UNIT = 8;

export const DEFAULT_COLUMNS: Record<Breakpoint, GridSize> = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 5,
};
