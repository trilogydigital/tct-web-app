import type { ReactNode } from "react";

export interface HorizontalListProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => React.Key;
  gap?: number;
  className?: string;
  containerClassName?: string;
  onItemClick?: (item: T, index: number) => void;
}

export interface TouchState {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
}
