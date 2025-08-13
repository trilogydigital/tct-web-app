export interface VerticalListProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T, index: number) => React.Key;
  gap?: number | string;
}
