import React from "react";
import clsx from "clsx";
import type { GridProps, Breakpoint, GridSize } from "./Grid.types";
import { SPACING_UNIT, DEFAULT_COLUMNS } from "./Grid.constants";
import { useGridCSS } from "../../hooks/useGridCSS";

function Grid({
  container,
  item,
  spacing = 0,
  rowSpacing = 2,
  columnSpacing = 2,
  children,
  xs = DEFAULT_COLUMNS.xs,
  sm = DEFAULT_COLUMNS.sm,
  md = DEFAULT_COLUMNS.md,
  lg = DEFAULT_COLUMNS.lg,
  xl = DEFAULT_COLUMNS.xl,
  style,
  className,
  breakpoints,
  ...rest
}: GridProps) {
  useGridCSS(breakpoints);

  const actualRowSpacing = rowSpacing !== undefined ? rowSpacing : spacing;
  const actualColumnSpacing =
    columnSpacing !== undefined ? columnSpacing : spacing;

  // Calculate flex-basis considering column gaps only
  const getFlexBasis = (columns: number, columnSpacing: number): string => {
    if (columns === 1) return "100%";
    const gapWidth = columnSpacing * SPACING_UNIT;
    const totalGapWidth = (columns - 1) * gapWidth;
    const itemWidthPercentage = 100 / columns;
    const gapReductionPerItem = totalGapWidth / columns;
    return `calc(${itemWidthPercentage}% - ${gapReductionPerItem}px)`;
  };

  const sizes: Partial<Record<Breakpoint, GridSize>> = { xs, sm, md, lg, xl };

  // Build CSS custom properties for each breakpoint
  const itemStyles: Record<string, string> = {};
  const breakpointClasses: string[] = [];

  Object.entries(sizes).forEach(([key, value]) => {
    if (typeof value === "number") {
      // value represents number of columns, convert to flex-basis with gap consideration
      itemStyles[`--grid-${key}`] = getFlexBasis(value, actualColumnSpacing);
      breakpointClasses.push(`custom-grid-item-${key}`);
    } else if (value === true) {
      itemStyles[`--grid-${key}`] = "100%";
      breakpointClasses.push(`custom-grid-item-${key}`);
    }
  });

  const containerStyles: React.CSSProperties = container
    ? {
        display: "flex",
        flexWrap: "wrap",
        columnGap: actualColumnSpacing * SPACING_UNIT,
        rowGap: actualRowSpacing * SPACING_UNIT,
        boxSizing: "border-box",
        width: "100%",
      }
    : {};

  const itemBaseStyles: React.CSSProperties = item
    ? {
        flexGrow: 0,
        flexShrink: 0,
        minWidth: 0,
        boxSizing: "border-box",
        maxWidth: "100%",
      }
    : {};

  const finalStyle = {
    ...containerStyles,
    ...itemBaseStyles,
    ...itemStyles,
    ...style,
  };

  const finalClassName = clsx(
    container && "custom-grid-container",
    item && "custom-grid-item",
    item && breakpointClasses,
    className
  );

  return (
    <div className={finalClassName} style={finalStyle} {...rest}>
      {children}
    </div>
  );
}

export default Grid;
