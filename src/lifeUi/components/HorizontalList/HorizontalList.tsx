import React, {
  useRef,
  useState,
  useEffect,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { styled } from "@mui/material/styles";
import type { HorizontalListProps } from "./HorizontalList.types";
import { HORIZONTAL_LIST_DEFAULTS, HORIZONTAL_LIST_STYLES } from "./constants";

const ScrollContainer = styled("div")({
  ...HORIZONTAL_LIST_STYLES.scrollContainer,
});

const ScrollableContent = styled("div")<{ gap: number }>(({ gap }) => ({
  ...HORIZONTAL_LIST_STYLES.scrollableContent,
  // remove smooth scroll for drag to avoid jitter
  scrollBehavior: "auto",
  gap: `${gap * 8}px`,
  paddingBottom: HORIZONTAL_LIST_DEFAULTS.paddingBottom,
}));

export function HorizontalList<T>({
  items,
  renderItem,
  getKey,
  gap = HORIZONTAL_LIST_DEFAULTS.gap,
  className,
  containerClassName,
  onItemClick,
}: HorizontalListProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag state refs (no re-renders on move)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const moved = useRef(false); // track if user moved to block click

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    moved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk =
      (x - startX.current) * HORIZONTAL_LIST_DEFAULTS.scrollMultiplierMouse;
    if (Math.abs(walk) > 5) moved.current = true; // detect actual drag
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (!scrollRef.current || e.touches.length !== 1) return;
    isDragging.current = true;
    moved.current = false;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current || !scrollRef.current || e.touches.length !== 1)
      return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk =
      (x - startX.current) * HORIZONTAL_LIST_DEFAULTS.scrollMultiplierTouch;
    if (Math.abs(walk) > 5) moved.current = true;
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Click handler with drag prevention
  const handleItemClick = (item: T, index: number) => {
    if (!moved.current && onItemClick) {
      onItemClick(item, index);
    }
  };

  if (!isClient) {
    return (
      <ScrollContainer className={containerClassName}>
        <ScrollableContent gap={gap} className={className}>
          {items.map((item, index) => (
            <div key={getKey(item, index)} style={{ flexShrink: 0 }}>
              {renderItem(item, index)}
            </div>
          ))}
        </ScrollableContent>
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer className={containerClassName}>
      <ScrollableContent
        ref={scrollRef}
        gap={gap}
        className={className}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          userSelect: isDragging.current ? "none" : "auto",
        }}
      >
        {items.map((item, index) => (
          <div
            key={getKey(item, index)}
            onClick={() => handleItemClick(item, index)}
            style={{
              cursor: onItemClick ? "pointer" : "default",
              flexShrink: 0,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </ScrollableContent>
    </ScrollContainer>
  );
}

export default HorizontalList;
